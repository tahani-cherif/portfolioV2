"use client";

import { useEffect, useRef } from "react";
import type { Lang, Project, UI } from "@/data/profile";
import { CloseIcon, ExternalIcon } from "@/components/Icons";

/** Project details in a native <dialog>: Escape, focus and the backdrop work out of the box. */
export default function ProjectModal({
  project,
  lang,
  t,
  onClose,
}: {
  project: Project | null;
  lang: Lang;
  t: UI;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-title"
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        // A click on the dark backdrop (outside the panel) closes the dialog.
        if (e.target === ref.current) ref.current?.close();
      }}
      className="modal m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-0 text-slate-300 shadow-2xl shadow-black/60 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-sky-400">
                {project.context[lang]}
                {project.period ? ` · ${project.period}` : ""}
              </p>
              <h3 id="project-title" className="mt-1 text-2xl font-bold text-white">
                {project.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={t.close}
              className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              <CloseIcon />
            </button>
          </div>

          <p className="mt-4 text-lg leading-relaxed text-slate-200">{project.summary[lang]}</p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">{t.whatIDid}</h4>
          <ul className="mt-3 space-y-3">
            {project.points[lang].map((point, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">{t.stack}</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                {s}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              {t.visit}
              <ExternalIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}
