interface FooterProps {
  footerText: string;
  footerCopyright: string;
}

export default function Footer({ footerText, footerCopyright }: FooterProps) {
  return (
    <footer className="mt-20">
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="rounded-3xl border border-ink/10 bg-paper/90 shadow-xl backdrop-blur-xl px-6 py-8 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-serif text-lg text-ink/90 leading-relaxed">{footerText}</p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
              <span className="h-px w-10 bg-gradient-to-r from-burnt/40 to-pine/40" aria-hidden />
              <span>{footerCopyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
