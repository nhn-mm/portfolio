"use client";

import { useEffect, useRef } from "react";
import type { NavLink } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus the first link when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector<HTMLAnchorElement>("a");
      firstLink?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      role="menu"
      aria-label="Mobile navigation menu"
      className="md:hidden absolute top-16 left-0 right-0 bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50 shadow-lg animate-slide-down"
    >
      <ul className="space-y-1 px-4 pb-4 pt-2">
        {navLinks.map((link) => (
          <li key={link.href} role="none">
            <a
              href={link.href}
              role="menuitem"
              className="block rounded-md px-3 py-2 text-base text-light-400 hover:text-light-100 hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:text-light-100 transition-colors"
              onClick={onClose}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
