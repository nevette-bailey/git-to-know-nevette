"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
    {href: "/#about", label: "About"},
    {href: "/#work", label: "Work"},
    {href: "/#projects", label: "Projects"},
    {href: "/#contact", label: "Contact"},
    {href: "/resume", label: "Resume"},
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                ? "bg-canvas-DEFAULT/95 backdrop-blur-sm border-b border-canvas-rule"
                : "bg-transparent"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Monogram */}
                <Link
                    href="/"
                    className="transition-opacity duration-300 hover:opacity-75"
                    aria-label="Nevette Bailey — home"
                >
                    <Image src="/logo/logo.svg" alt="Nevette Bailey" width={85} height={32} priority/>
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-10">
                    {links.map(({href, label}) => (
                        <li key={href}>
                            {href.startsWith("/") ? (
                                <Link
                                    href={href}
                                    className="nav-link font-body text-xs tracking-widest uppercase text-ink-muted hover:text-ink-DEFAULT transition-colors duration-200"
                                >
                                    {label}
                                </Link>
                            ) : (
                                 <a
                                     href={href}
                                     className="nav-link font-body text-xs tracking-widest uppercase text-ink-muted hover:text-ink-DEFAULT transition-colors duration-200"
                                 >
                                     {label}
                                 </a>
                             )}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="mailto:contact@nevettebailey.com"
                    className="hidden md:inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-pink hover:text-pink-light transition-colors duration-200"
                >
                    Let&apos;s Talk
                    <span className="text-base leading-none">→</span>
                </a>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-1"
                    aria-label="Toggle menu"
                >
          <span
              className={`block w-5 h-px bg-ink-DEFAULT transition-all duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
                    <span
                        className={`block w-5 h-px bg-ink-DEFAULT transition-all duration-300 ${
                            menuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block w-5 h-px bg-ink-DEFAULT transition-all duration-300 ${
                            menuOpen ? "-translate-y-2 -rotate-45" : ""
                        }`}
                    />
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-canvas-DEFAULT border-t border-canvas-rule transition-all duration-300 overflow-hidden ${
                    menuOpen ? "max-h-64" : "max-h-0"
                }`}
            >
                <ul className="px-6 py-4 flex flex-col gap-4">
                    {links.map(({href, label}) => (
                        <li key={href}>
                            <a
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="font-body text-sm tracking-widest uppercase text-ink-muted hover:text-pink transition-colors duration-200"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="mailto:contact@nevettebailey.com"
                            className="font-body text-sm tracking-widest uppercase text-pink"
                        >
                            Let&apos;s Talk →
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
