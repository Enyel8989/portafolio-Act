import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "../../../components/ThemeToggle";
import { projects } from "../../../data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: project?.title, description: project?.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  const sections = [
    ["Problema", project.problem], ["Objetivo", project.goal],
    ["Solución", project.method], ["Resultados", project.result],
  ];

  return (
    <main className="shell detail">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="back" href="/#proyectos">← Volver a proyectos</Link>
        <ThemeToggle />
      </div>
      <header className="py-12">
        <p className="eyebrow">{project.area}</p>
        <h1>{project.title}</h1>
        <p className="intro">{project.summary}</p>
        <ul className="tags flex flex-wrap gap-2" aria-label="Tecnologías y temas">
          {project.tools.map(tool => <li key={tool}>{tool}</li>)}
        </ul>
      </header>
      {sections.map(([heading, description]) => <section className="section split" key={heading}><h2>{heading}</h2><p>{description}</p></section>)}
      <section className="section split">
        <h2>Evidencias</h2>
        <div className="grid gap-4">
          {project.video && (
            <figure className="grid gap-2">
              <video className="evidence-image" src={project.video.src} poster={project.video.poster}
                controls playsInline preload="none" aria-label={project.video.caption} />
              <figcaption className="text-sm">{project.video.caption}</figcaption>
            </figure>
          )}
          {project.figures?.map(({ src, caption, alt, width, height }) => (
            <figure key={src} className="grid gap-2">
              <a href={src} aria-label={`Ver imagen completa. ${alt}`}>
                <Image className="evidence-image" src={src} alt={alt} width={width} height={height} />
              </a>
              <figcaption className="text-sm">{caption}</figcaption>
            </figure>
          ))}
          {project.evidence?.map(({ href, label, download }) => (
            <a className="back" key={href} href={href} download={download}>{label} ↗</a>
          ))}
          {project.pending && <p>Por adjuntar: {project.pending}</p>}
        </div>
      </section>
    </main>
  );
}
