'use client';

import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  enabled?: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  siteName: string;
  logoText: string;
  nav: NavItem[];
  footerText: string;
  footerCopyright: string;
}

export default function Layout({
  children,
  siteName,
  logoText,
  nav,
  footerText,
  footerCopyright,
}: LayoutProps) {
  const enabledNav = nav.filter((item) => item.enabled !== false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/90 border-b border-pine/10">
        <div className="container-prose">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-burnt to-burnt-hover flex items-center justify-center text-paper font-serif text-base font-semibold shadow-sm">
                {logoText.charAt(0)}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg text-pine group-hover:text-burnt transition-colors">{logoText}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-pine/50">{siteName}</span>
              </div>
            </Link>

            <nav className="flex items-center gap-1 md:gap-2">
              {enabledNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-pine/70 hover:text-burnt hover:bg-pine/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 py-12 md:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-12 md:pb-16">
        <div className="container-prose">
          <div className="glass-card px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-serif text-lg text-pine/80 italic leading-relaxed max-w-md">
                "{footerText}"
              </p>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-pine/50">
                <span className="h-px w-8 bg-gradient-to-r from-burnt/40 to-pine/20" />
                <span>{footerCopyright}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
