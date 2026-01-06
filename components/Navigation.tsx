'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-cream/70 shadow-lg' 
          : 'backdrop-blur-md bg-cream/40'
      }`}
      style={{
        borderBottom: '1px solid rgba(196, 164, 133, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-serif text-2xl text-earth tracking-wide"
            >
              Vaishnavi
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/poems">Poems</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/admin">Admin</NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ scale: 1.1, color: '#8B7355' }}
        className="font-sans text-sm font-medium text-charcoal transition-colors cursor-pointer"
      >
        {children}
      </motion.span>
    </Link>
  );
}
