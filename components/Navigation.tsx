'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type NavItem = { label: string; href: string; enabled?: boolean };

interface NavigationProps {
  logoText: string;
  navItems: NavItem[];
}

export default function Navigation({ logoText, navItems }: NavigationProps) {
  const [expanded, setExpanded] = useState(false);
  const items = useMemo(() => navItems.filter((item) => item.enabled !== false), [navItems]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="pointer-events-auto relative max-w-4xl w-full"
      >
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-burnt/30 via-paper/60 to-pine/30 opacity-70" aria-hidden />
        <div className="relative flex items-center gap-3 rounded-3xl border border-ink/10 bg-paper/90 shadow-xl backdrop-blur-xl px-4 py-3 md:py-4">
          <div className="flex items-center gap-3 rounded-2xl bg-ink/5 px-3 py-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-burnt to-pine text-paper flex items-center justify-center font-serif text-lg shadow-md">
              {logoText.slice(0, 1)}
            </div>
            <div className="leading-tight">
              <p className="font-serif text-base text-ink">{logoText}</p>
              <p className="text-xs text-ink/60">Poems in tactile form</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
            {items.map((item, index) => (
              <NavChip key={item.href} href={item.href} delay={0.05 * index}>
                {item.label}
              </NavChip>
            ))}
          </div>

          {/* Compact toggle for small screens */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-ink/10 bg-ink/5 px-3 py-2 text-xs font-medium text-ink shadow-sm md:hidden"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
          >
            Menu
            <span className="text-ink/50">▾</span>
          </button>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="relative mt-3 rounded-2xl border border-ink/10 bg-paper/95 shadow-lg backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col divide-y divide-ink/5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-ink/90 hover:bg-ink/5"
                  onClick={() => setExpanded(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}

function NavChip({ href, children, delay }: { href: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-2xl border border-ink/10 bg-ink/5 px-3 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-burnt/30 hover:bg-paper"
      >
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-burnt to-pine opacity-70 group-hover:opacity-100" />
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}
