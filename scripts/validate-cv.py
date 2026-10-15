"""Parse, extract and independently render every CV page; reject blank/corrupt PDFs."""
import argparse
import json
import os
from pathlib import Path
import re
import subprocess
from pypdf import PdfReader
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
HEADINGS = {
    "en": ["Professional Summary", "Education", "Technical Capabilities", "Key Engineering Projects", "Honors & Competition Outcomes", "Academic Research & Presentations", "Leadership & Organizational Experience"],
    "id": ["Ringkasan Profil", "Pendidikan", "Keahlian Teknis", "Proyek Rekayasa Pilihan", "Prestasi & Hasil Kompetisi", "Riset Akademik & Presentasi", "Pengalaman Kepemimpinan & Organisasi"],
}

def validate(pdf_path, locale, output):
    output.mkdir(parents=True, exist_ok=True)
    raw = pdf_path.read_bytes()
    assert raw.startswith(b"%PDF-"), "Missing PDF header"
    assert raw.count(bytes([239, 191, 189])) < 100, "Binary contains excessive UTF-8 replacement bytes"
    reader = PdfReader(pdf_path, strict=True)
    assert len(reader.pages) == 2, f"Expected approved two-page CV, got {len(reader.pages)}"
    assert not reader.is_encrypted, "PDF should allow extraction and printing"
    text_pages = []
    pages = []
    for index, page in enumerate(reader.pages, 1):
        text = page.extract_text() or ""
        assert len(text.strip()) > 500, f"Page {index} lacks substantial selectable text"
        contents = page.get_contents()
        assert contents is not None and len(contents.get_data()) > 500, f"Page {index} lacks content streams"
        assert "\ufffd" not in text and "\u25a0" not in text, f"Page {index} has damaged glyphs"
        text_pages.append(text)
        (output / f"page-{index}.txt").write_text(text, encoding="utf-8")
    normalized = re.sub(r"\s+", " ", " ".join(text_pages))
    for forbidden in json.loads(os.environ.get("CV_FORBIDDEN_TERMS", "[]")):
        assert not re.search(r"\b" + re.escape(forbidden) + r"\b", normalized, re.IGNORECASE), f"Unverified claim in extracted PDF text: {forbidden}"
    for removed in ["SIMOBS", "simobs-bengkel", "github.com/hanif-12-01/bengkel"]:
        assert removed.lower() not in normalized.lower(), f"Friend-developed project remains in CV: {removed}"
    for expected in ["M. Hanif Al Faiz", "Telkom University Purwokerto", "3.66 / 4.00", "2027", "WattWise AI", "CIVICTWIN Semarang", "Purwokerto Intelligence Layer", "Fuzzy Rain Risk Index", "Badan Eksekutif Mahasiswa (BEM KEMA)", *HEADINGS[locale]]:
        assert expected.lower() in normalized.lower(), f"Missing expected text: {expected}"
    civictwin = normalized.split("CIVICTWIN Semarang", 1)[1].split("Purwokerto Intelligence Layer", 1)[0]
    pil = normalized.split("Purwokerto Intelligence Layer", 1)[1].split("Fuzzy Rain Risk Index", 1)[0]
    correct_award = "3rd Place" if locale == "en" else "Juara 3"
    experiment = "Experimental Material (Simulated Data)" if locale == "en" else "Bahan Eksperimen (Data Simulasi)"
    assert correct_award in civictwin and "UNITY UNY 2026" in civictwin, "CIVICTWIN award missing or misattributed"
    assert "React 18" in civictwin and "localStorage" in civictwin, "CIVICTWIN verified stack/demo disclosure missing"
    assert experiment in pil, "PIL experiment disclosure missing"
    assert not re.search(r"3rd Place|Juara 3|UNITY|Awarded|Meraih", pil), "PIL incorrectly claims the CIVICTWIN award"
    academic = "Semester 5 (In Progress)" if locale == "en" else "Semester 5 (Sedang Berjalan)"
    assert academic.lower() in normalized.lower(), "Academic status missing or incorrectly completed"
    for outcome in (["Top 10 Finalist", "Top 5 Finalist", "3rd Place", "Grant Recipient"] if locale == "en" else ["Finalis 10 Besar", "Finalis 5 Besar", "Juara 3", "Penerima Hibah"]):
        assert outcome.lower() in normalized.lower(), f"Outcome not preserved: {outcome}"
    assert "simulated data" in normalized.lower() if locale == "en" else "data simulasi" in normalized.lower(), "Prototype disclosure missing"
    executable = os.environ.get("CV_PDFTOPPM", "pdftoppm")
    render = subprocess.run([executable, "-scale-to", "1600", "-png", str(pdf_path), str(output / "page")], capture_output=True, text=True)
    assert render.returncode == 0 and not render.stderr.strip(), f"Independent rendering errors: {render.stderr}"
    for index, image_path in enumerate(sorted(output.glob("page-*.png")), 1):
        with Image.open(image_path) as image:
            gray = image.convert("L")
            hist = gray.histogram()
            dark_pixels = sum(hist[:210])
            fraction = dark_pixels / (gray.width * gray.height)
            assert fraction > 0.008, f"Page {index} renders blank or near blank ({fraction:.4%} ink)"
            assert fraction < 0.35, f"Page {index} has suspicious solid fill ({fraction:.4%} ink)"
            pages.append({"page": index, "textCharacters": len(text_pages[index-1]), "inkPixelFraction": round(fraction, 5), "renderedImage": str(image_path.relative_to(ROOT)) if image_path.is_relative_to(ROOT) else str(image_path)})
    assert len(pages) == len(reader.pages), "Rendered page count differs"
    result = {"locale": locale, "pdf": str(pdf_path.relative_to(ROOT)) if pdf_path.is_relative_to(ROOT) else str(pdf_path), "bytes": len(raw), "pages": pages, "headings": HEADINGS[locale], "parse": "PASS (strict)", "text": "PASS", "independentRender": "PASS"}
    (output / "result.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", type=Path)
    parser.add_argument("--locale", choices=["en", "id"])
    parser.add_argument("--out-dir", type=Path)
    args = parser.parse_args()
    if args.pdf:
        assert args.locale and args.out_dir, "Single-file audit needs locale and output directory"
        results = [validate(args.pdf.resolve(), args.locale, args.out_dir.resolve())]
    else:
        results = [validate(ROOT / "public" / "cv" / f"M-Hanif-Al-Faiz-CV-{locale.upper()}.pdf", locale, ROOT / "docs" / "cv-validation" / locale) for locale in ["en", "id"]]
        (ROOT / "docs" / "cv-validation" / "pdf-audit.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(json.dumps(results, indent=2))
