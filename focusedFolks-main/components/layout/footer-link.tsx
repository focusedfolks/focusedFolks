"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
      <Link
        href={href}
        className="footer-link group inline-flex items-center gap-1.5 text-sm"
      >
        <span className="relative">
          {label}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] transition-all duration-300 group-hover:w-full" />
        </span>
        <ArrowUpRight className="footer-icon h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-80" />
      </Link>
    </motion.li>
  );
}
