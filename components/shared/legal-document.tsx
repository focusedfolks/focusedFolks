import type { LegalDocument as LegalDocumentType } from "@/types/legal";

type LegalDocumentProps = {
  document: LegalDocumentType;
};

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="legal-document mt-8">
      <div className="legal-document-meta mb-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
        <p>
          <span className="font-semibold text-white">Legal entity:</span> {document.entityName}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-white">Effective date:</span> {document.effectiveDate}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-white">Last updated:</span> {document.lastUpdated}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-white">Sections:</span> {document.sections.length}
        </p>
      </div>

      <nav
        aria-label="Table of contents"
        className="mb-10 rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-4"
      >
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300/90">Table of contents</h2>
        <ol className="mt-3 columns-1 gap-x-8 text-sm text-slate-300 md:columns-2 lg:columns-3">
          {document.sections.map((section) => (
            <li key={section.id} className="mb-2 break-inside-avoid">
              <a href={`#${section.id}`} className="hover:text-white hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-10">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{section.title}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                {paragraph}
              </p>
            ))}

            {section.list && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 md:text-base">
                {section.list.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ul>
            )}

            {section.subsections?.map((subsection) => (
              <div key={subsection.title} className="mt-6">
                <h3 className="text-base font-semibold text-slate-100 md:text-lg">{subsection.title}</h3>
                {subsection.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                {subsection.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 md:text-base">
                    {subsection.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
