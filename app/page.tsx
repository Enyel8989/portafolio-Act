import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import { profile, projects } from "../data/portfolio";

const navigation = [
  ["Sobre mí", "#sobre-mi"], ["Experiencia", "#experiencia"], ["Proyectos", "#proyectos"],
  ["Habilidades", "#habilidades"], ["Formación", "#formacion"], ["Contacto", "#contacto"],
];

const skills = [
  ["Programación", "Python · Arduino"],
  ["Desarrollo web", "React · Next.js · TypeScript · Tailwind CSS"],
  ["Bases de datos", "Listas de SharePoint"],
  ["Herramientas", "Excel · Power Apps · Kodular"],
  ["Machine Learning", "Regresión lineal · Árboles de decisión · K-Means · KNN"],
  ["Habilidades personales", "Resolución de problemas · Aprendizaje de herramientas nuevas · Trabajo en equipo"],
];

export default function Home() {
  return (
    <>
      <header className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5">
        <a className="wordmark" href="#inicio" aria-label="Ángel, inicio">AL<span>.</span></a>
        <nav aria-label="Secciones del portafolio" className="flex flex-wrap gap-x-5 gap-y-2">
          {navigation.map(([name, href]) => <a key={href} href={href}>{name}</a>)}
        </nav>
      </header>
      <main id="inicio">
        <section className="shell hero grid items-center gap-10 md:grid-cols-[1.35fr_1fr]" aria-labelledby="nombre">
          <div>
            <p className="eyebrow">Portafolio académico · El Salvador</p>
            <h1 id="nombre">Ángel Lemuel <span>López Ortíz</span></h1>
            <p className="specialty">Bachiller general · Interés en Ingeniería Industrial</p>
            <p className="intro">Me gusta entender cómo funcionan las cosas y encontrar qué puedo mejorar con datos, código y pruebas.</p>
            <div className="flex flex-wrap gap-3">
              <a className="button" href="#proyectos">Explorar proyectos <span aria-hidden="true">↗</span></a>
              <a className="button secondary" href="#contacto">Contacto</a>
              {profile.github && <a className="button secondary" href={profile.github}>GitHub</a>}
            </div>
          </div>
          <div className="portrait">
            <Image src="/angel-lopez.jpeg" alt={`Retrato de ${profile.name}`} fill sizes="(max-width: 400px) 90vw, 350px" preload />
          </div>
        </section>
        <div className="shell">
          <section id="sobre-mi" className="section split">
            <h2>Sobre mí</h2>
            <p>Me gradué de bachillerato general y quiero estudiar Ingeniería Industrial. Me interesan las máquinas, la automatización y el uso de Excel para organizar y analizar información. Disfruto probar cómo responde un sistema, buscar la causa de una falla y aprender herramientas nuevas para resolverla. Quiero ganar experiencia en proyectos que combinen análisis y trabajo práctico.</p>
          </section>
          <section id="experiencia" className="section split">
            <h2>Experiencia</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <article><h3>Aplicación con Power Apps</h3><p>Diseñé la interfaz e integré la información en listas de SharePoint para el proyecto del equipo.</p></article>
              <article><h3>Compuerta automatizada para un huerto</h3><p>Me encargué principalmente del código de Arduino para controlar dos servomotores. La compuerta se abría o cerraba desde una aplicación en Kodular para regular la exposición de la planta al sol.</p></article>
            </div>
          </section>
          <section id="proyectos" className="section">
            <h2>Proyectos del curso</h2>
            <div className="project-list">
              {projects.filter(({ slug }) => slug !== "portafolio").map(project => (
                <Link className="project-row" href={`/proyectos/${project.slug}`} key={project.slug}>
                  <div><p className="eyebrow">{project.area}</p><h3>{project.title}</h3></div>
                  <p>{project.summary}</p>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
          <section id="habilidades" className="section split">
            <h2>Habilidades</h2>
            <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {skills.map(([area, items]) => <div key={area}><dt>{area}</dt><dd>{items}</dd></div>)}
            </dl>
          </section>
          <section id="formacion" className="section split">
            <h2>Formación académica</h2>
            <div>
              <h3>Instituto Nacional General Manuel José Arce</h3>
              <p>Bachillerato general · 2025–2026</p>
              <ul className="credentials">
                <li>MOS Excel Expert · 2026</li>
                <li>TOEIC Speaking and Writing · 2026</li>
                <li>TOEIC Listening and Reading · 2026</li>
                <li>Diplomado de graduación ¡Supérate! · 2026</li>
              </ul>
            </div>
          </section>
          <section id="contacto" className="section split">
            <div>
              <h2>Contacto</h2>
              {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
              {profile.github && <p><a href={profile.github}>GitHub · Enyel8989 ↗</a></p>}
            </div>
            <ContactForm />
          </section>
        </div>
      </main>
      <footer className="shell flex flex-wrap justify-between gap-4 py-6">
        <span>{profile.name}</span><a href="#inicio">Volver arriba ↑</a>
      </footer>
    </>
  );
}
