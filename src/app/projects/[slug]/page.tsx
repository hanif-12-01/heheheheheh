import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FEATURED_PROJECTS } from "@/data/projects";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study | M. Hanif Al Faiz`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Engineering Case Study`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-8">
      <ProjectCaseStudy project={project} />
    </main>
  );
}
