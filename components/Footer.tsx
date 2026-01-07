'use client';

import { useEffect, useState } from 'react';

interface Settings {
  footerText: string;
  footerCopyright: string;
  socialTwitter?: string;
  socialInstagram?: string;
  socialEmail?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    footerText: 'A quiet space for poetry and reflection.',
    footerCopyright: `© ${new Date().getFullYear()} Vaishnavi Poetry. All rights reserved.`,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch (_) {
        // Keep defaults if fetch fails
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 text-center md:text-left">
            {settings.footerText}
          </p>
          <div className="flex items-center gap-4">
            {settings.socialTwitter && (
              <a className="text-slate-500 hover:text-slate-900" href={settings.socialTwitter} target="_blank" rel="noreferrer">Twitter</a>
            )}
            {settings.socialInstagram && (
              <a className="text-slate-500 hover:text-slate-900" href={settings.socialInstagram} target="_blank" rel="noreferrer">Instagram</a>
            )}
            {settings.socialEmail && (
              <a className="text-slate-500 hover:text-slate-900" href={`mailto:${settings.socialEmail}`}>Email</a>
            )}
          </div>
        </div>
        <div className="text-xs text-slate-400 text-center md:text-left mt-2">
          {settings.footerCopyright}
        </div>
      </div>
    </footer>
  );
}
