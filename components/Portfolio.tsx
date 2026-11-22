"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  education,
  jobs,
  profile,
  projects,
  projectsUsing,
  skills,
  techKey,
  ui,
  type Category,
  type Job,
  type Lang,
  type Project,
  type UI,
} from "@/data/profile";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import CountUp from "@/components/CountUp";
import SpotlightCard from "@/components/SpotlightCard";
import ProjectModal from "@/components/ProjectModal";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  AwardIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  ExternalIcon,
  GithubIcon,
  GraduationIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
  PinIcon,
} from "@/components/Icons";

const SECTIONS = ["about", "skills", "experience", "projects", "education", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];
type Filter = "all" | Category;
const FILTERS: Filter[] = ["all", "web", "devops", "mobile-ai"];

const projectById = new Map(projects.map((p) => [p.id, p]));

// ------------------------------------------------------------ small pieces
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
      {children}
    </span>
  );
}

function Section({ id, title, children }: { id: SectionId; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20">
      <Reveal>
        <h2 className="mb-10 flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
          <span className="text-sky-400">#</span>
          {title}
          <span className="ml-2 h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

// ------------------------------------------------------------------ header
function Header({
  t,
  lang,
  active,
  onToggleLang,
  progressRef,
}: {
  t: UI;
  lang: Lang;
  active: SectionId | null;
  onToggleLang: () => void;
  progressRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const langButton = (
    <button
      type="button"
      onClick={onToggleLang}
      aria-label={t.langSwitch}
      title={t.langSwitch}
      className="flex items-center rounded-full border border-white/15 p-0.5 text-xs font-semibold transition hover:border-sky-400/60"
    >
      {(["en", "fr"] as Lang[]).map((l) => (
        <span
          key={l}
          className={
            "rounded-full px-2.5 py-1 transition " + (lang === l ? "bg-sky-500 text-white" : "text-slate-400")
          }
        >
          {l.toUpperCase()}
        </span>
      ))}
    </button>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-indigo-500"
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="text-lg font-bold text-white">
          {profile.initials}
          <span className="text-sky-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 text-sm lg:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={
                  "rounded-full px-3 py-1.5 transition " +
                  (active === id ? "bg-sky-400/15 text-sky-300" : "hover:text-sky-300")
                }
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {langButton}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.menu}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="menu-in border-t border-white/5 px-6 pb-4 lg:hidden">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={
                  "block rounded-lg px-3 py-3 transition " +
                  (active === id ? "bg-sky-400/15 text-sky-300" : "hover:bg-white/5")
                }
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

// -------------------------------------------------------------------- hero
function Hero({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <section id="top" className="relative flex min-h-[88vh] items-center py-16">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="blob absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div
          className="blob absolute bottom-10 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="relative z-10 grid w-full items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="order-2 md:order-1">
          <p className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.status}
          </p>
          <p className="fade-up text-lg text-sky-400" style={{ animationDelay: "100ms" }}>
            {t.hello}
          </p>
          <h1 className="fade-up mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl" style={{ animationDelay: "200ms" }}>
            {profile.name}
          </h1>
          <p
            className="fade-up mt-4 min-h-[2.5em] text-2xl font-semibold text-slate-400 sm:min-h-[1.5em] sm:text-3xl"
            style={{ animationDelay: "300ms" }}
          >
            <Typewriter key={lang} words={profile.roles[lang]} />
          </p>
          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed" style={{ animationDelay: "400ms" }}>
            {profile.tagline[lang]}
          </p>

          <div className="fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "500ms" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              {t.viewWork}
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cv[lang]}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-sky-400/50 px-6 py-3 font-medium text-sky-300 transition hover:-translate-y-0.5 hover:bg-sky-400/10"
            >
              <DownloadIcon className="h-4 w-4" />
              {t.downloadCv}
            </a>
          </div>

          <div className="fade-up mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-400" style={{ animationDelay: "600ms" }}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:-translate-y-0.5 hover:text-white">
              <GithubIcon className="h-6 w-6" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:-translate-y-0.5 hover:text-white">
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="E-mail" className="transition hover:-translate-y-0.5 hover:text-white">
              <MailIcon className="h-6 w-6" />
            </a>
            <span className="inline-flex items-center gap-1.5">
              <PinIcon className="h-4 w-4" />
              {profile.location[lang]}
            </span>
          </div>
        </div>

        <div className="fade-up order-1 mx-auto md:order-2" style={{ animationDelay: "250ms" }}>
          <div className="float relative h-56 w-56 sm:h-72 sm:w-72">
            <div className="spin-slow absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#38bdf8,#6366f1,#0ea5e9,#38bdf8)] opacity-80 blur-[2px]" />
            <div className="absolute inset-0 rounded-full bg-slate-950 p-1.5">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={320}
                height={320}
                priority
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------- stats
function Stats({ t }: { t: UI }) {
  const workProjects = projects.filter((p) => p.kind === "work").length;
  const liveSites = projects.filter((p) => p.url).length;
  const items = [
    { value: profile.yearsOfExperience, suffix: "+", label: t.stats.years },
    { value: workProjects, suffix: "", label: t.stats.projects },
    { value: liveSites, suffix: "", label: t.stats.live },
    { value: 3, suffix: "", label: t.stats.languages },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 100}>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 text-center">
            <p className="text-4xl font-bold text-white sm:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-slate-400">{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ------------------------------------------------------------------ skills
function Skills({ t, lang, onPick }: { t: UI; lang: Lang; onPick: (skill: string) => void }) {
  return (
    <>
      <Reveal>
        <p className="-mt-4 mb-8 text-slate-400">{t.skillsHint}</p>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title.en} delay={(i % 3) * 100}>
            <SpotlightCard className="h-full p-6">
              <h3 className="mb-4 font-semibold text-white">{group.title[lang]}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => {
                  const n = projectsUsing(s).length;
                  if (n === 0) return <Tag key={s}>{s}</Tag>;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onPick(s)}
                      title={t.usedIn(n)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200 transition hover:-translate-y-0.5 hover:border-sky-400/80 hover:bg-sky-400/25 focus-visible:outline-2 focus-visible:outline-sky-400"
                    >
                      {s}
                      <span className="rounded-full bg-sky-400/25 px-1.5 text-[10px] font-semibold text-sky-100">{n}</span>
                    </button>
                  );
                })}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </>
  );
}

// -------------------------------------------------------------- experience
function Experience({ t, lang, onOpen }: { t: UI; lang: Lang; onOpen: (p: Project) => void }) {
  const [tab, setTab] = useState<Job["kind"]>("work");
  const list = jobs.filter((j) => j.kind === tab);

  return (
    <>
      <Reveal>
        <div role="tablist" className="mb-10 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          {(["work", "internship"] as const).map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={
                "rounded-full px-5 py-2 text-sm font-medium transition " +
                (tab === k ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" : "text-slate-400 hover:text-white")
              }
            >
              {t.tabs[k]}
            </button>
          ))}
        </div>
      </Reveal>

      <ol key={tab} className="relative space-y-12 border-l border-white/10 pl-8">
        {list.map((job, i) => (
          <li key={job.id} className="pop-in relative" style={{ animationDelay: `${i * 90}ms` }}>
            <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
            <p className="text-sm text-sky-400">
              {job.period[lang]} · {job.location[lang]}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white">
              {job.role[lang]} <span className="text-slate-500">@ {job.company}</span>
            </h3>
            {job.context && <p className="mt-2 text-slate-400">{job.context[lang]}</p>}
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.projectsOf(job.projectIds.length)}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {job.projectIds.map((id) => {
                const p = projectById.get(id);
                if (!p) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onOpen(p)}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-sky-400/50 hover:bg-sky-400/[0.06] focus-visible:outline-2 focus-visible:outline-sky-400"
                  >
                    <span>
                      <span className="flex items-center gap-2 font-medium text-white">
                        {p.name}
                        {p.url && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title={t.live} />}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-slate-400">{p.summary[lang]}</span>
                    </span>
                    <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-400" />
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

// ---------------------------------------------------------------- projects
function ProjectCard({ p, t, lang, onOpen }: { p: Project; t: UI; lang: Lang; onOpen: (p: Project) => void }) {
  const shown = p.stack.slice(0, p.featured ? 8 : 5);
  const more = p.stack.length - shown.length;
  return (
    <SpotlightCard className="flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {p.featured && (
          <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 font-semibold text-amber-300">★ {t.featured}</span>
        )}
        {p.url && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-0.5 font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t.live}
          </span>
        )}
        {p.kind === "academic" && (
          <span className="rounded-full bg-indigo-400/15 px-2.5 py-0.5 font-semibold text-indigo-300">{t.academic}</span>
        )}
      </div>
      <h3 className={"mt-3 font-semibold text-white " + (p.featured ? "text-2xl" : "text-lg")}>{p.name}</h3>
      <p className="mt-1 text-sm text-sky-400">
        {p.context[lang]}
        {p.period ? ` · ${p.period}` : ""}
      </p>
      <p className="mt-3 flex-1 leading-relaxed">{p.summary[lang]}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {shown.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        {more > 0 && <span className="px-1 py-1 text-xs text-slate-500">+{more}</span>}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
        <button
          type="button"
          onClick={() => onOpen(p)}
          className="group/btn inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2 text-white transition hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          {t.details}
          <ArrowRightIcon className="h-4 w-4 transition group-hover/btn:translate-x-1" />
        </button>
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sky-400 transition hover:text-sky-300"
          >
            {t.visit}
            <ExternalIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}

function Projects({
  t,
  lang,
  filter,
  setFilter,
  tech,
  setTech,
  onOpen,
}: {
  t: UI;
  lang: Lang;
  filter: Filter;
  setFilter: (f: Filter) => void;
  tech: string | null;
  setTech: (s: string | null) => void;
  onOpen: (p: Project) => void;
}) {
  const list = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === "all" || p.category === filter) &&
          (!tech || p.stack.some((s) => techKey(s) === techKey(tech)))
      ),
    [filter, tech]
  );

  return (
    <>
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const count = projects.filter((p) => f === "all" || p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition " +
                  (filter === f
                    ? "border-sky-400 bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-sky-400/50 hover:text-white")
                }
              >
                {t.filters[f]} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {tech && (
        <div className="pop-in mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm">
          <span>
            {t.filteredBy} <strong className="text-white">{tech}</strong> ({list.length})
          </span>
          <button
            type="button"
            onClick={() => setTech(null)}
            className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white transition hover:bg-white/20"
          >
            <CloseIcon className="h-3.5 w-3.5" />
            {t.clearFilter}
          </button>
        </div>
      )}

      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 p-8 text-center text-slate-400">{t.noProjects}</p>
      ) : (
        <div key={`${filter}-${tech ?? ""}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <div
              key={p.id}
              className={"pop-in " + (p.featured ? "sm:col-span-2" : "")}
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <ProjectCard p={p} t={t} lang={lang} onOpen={onOpen} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// --------------------------------------------------------------- education
function Education({ t, lang }: { t: UI; lang: Lang }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {education.map((e, i) => (
        <Reveal key={e.title.en} delay={i * 100}>
          <SpotlightCard className="h-full p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-sky-400/10 p-2.5 text-sky-300">
                {e.kind === "degree" ? <GraduationIcon className="h-6 w-6" /> : <AwardIcon className="h-6 w-6" />}
              </span>
              <span className="text-sm text-slate-400">{e.period}</span>
            </div>
            {e.kind === "certificate" && (
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-amber-300">{t.certificate}</p>
            )}
            <h3 className="mt-3 font-semibold leading-snug text-white">{e.title[lang]}</h3>
            <p className="mt-2 text-sm text-slate-400">{e.school[lang]}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------- contact
function Contact({ t, lang }: { t: UI; lang: Lang }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Older browsers: select-and-copy fallback.
      const input = document.createElement("textarea");
      input.value = profile.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-white/[0.03] to-indigo-500/10 p-8 text-center sm:p-12">
        <p className="mx-auto max-w-xl text-xl leading-relaxed text-slate-200">{t.contactText}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400"
          >
            <MailIcon className="h-5 w-5" />
            {t.sendEmail}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-sky-400/60"
          >
            {copied ? <CheckIcon className="h-5 w-5 text-emerald-400" /> : <CopyIcon className="h-5 w-5" />}
            {copied ? t.copied : t.copyEmail}
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">{profile.email}</p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-sky-400/60 hover:text-white"
          >
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-sky-400/60 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-400">
          <PinIcon className="h-4 w-4" />
          {profile.location[lang]}
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? t.copied : ""}
      </p>
    </Reveal>
  );
}

// -------------------------------------------------------------------- page
export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [active, setActive] = useState<SectionId | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [tech, setTech] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const t = ui[lang] as UI;

  // Language: saved choice, else the browser's language. Stored for the next visit.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("lang");
    } catch {
      /* storage blocked: ignore */
    }
    const initial: Lang = saved === "fr" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    if (initial !== "en") setLang(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("lang", lang);
    } catch {
      /* storage blocked: ignore */
    }
  }, [lang]);

  // Highlight the section in view.
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reading progress bar and "back to top" button.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
      setShowTop(window.scrollY > 700);
      if (window.scrollY < 200) setActive(null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const pickSkill = useCallback((skill: string) => {
    setTech(skill);
    setFilter("all");
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const closeProject = useCallback(() => setOpenProject(null), []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-white"
      >
        {t.nav.about}
      </a>
      <Header t={t} lang={lang} active={active} onToggleLang={() => setLang((l) => (l === "en" ? "fr" : "en"))} progressRef={progressRef} />

      <main className="mx-auto max-w-6xl px-6">
        <Hero t={t} lang={lang} />
        <Stats t={t} />

        <Section id="about" title={t.aboutTitle}>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4 text-lg leading-relaxed">
              {profile.about[lang].map((p, i) => (
                <Reveal key={`${lang}-${i}`} delay={i * 120}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t.speaks}</p>
                <ul className="mt-4 space-y-3">
                  {profile.spokenLanguages[lang].map((l) => (
                    <li key={l} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section id="skills" title={t.skillsTitle}>
          <Skills t={t} lang={lang} onPick={pickSkill} />
        </Section>

        <Section id="experience" title={t.experienceTitle}>
          <Experience t={t} lang={lang} onOpen={setOpenProject} />
        </Section>

        <Section id="projects" title={t.projectsTitle}>
          <Projects
            t={t}
            lang={lang}
            filter={filter}
            setFilter={setFilter}
            tech={tech}
            setTech={setTech}
            onOpen={setOpenProject}
          />
        </Section>

        <Section id="education" title={t.educationTitle}>
          <Education t={t} lang={lang} />
        </Section>

        <Section id="contact" title={t.contactTitle}>
          <Contact t={t} lang={lang} />
        </Section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
        © {profile.name} · {t.footer}
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t.backToTop}
        title={t.backToTop}
        className={
          "fixed bottom-6 right-6 z-30 rounded-full bg-sky-500 p-3 text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-1 hover:bg-sky-400 " +
          (showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")
        }
      >
        <ArrowUpIcon />
      </button>

      <ProjectModal project={openProject} lang={lang} t={t} onClose={closeProject} />
    </>
  );
}
