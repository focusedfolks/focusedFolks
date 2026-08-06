"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeIndianRupee,
  BookOpen,
  Briefcase,
  FileQuestion,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  type LucideIcon,
} from "lucide-react";
import { ADMIN_SIDEBAR_NAV } from "@/lib/cms/section-status";

const ICONS: Record<string, LucideIcon> = {
  "/admin": LayoutDashboard,
  "/admin/pricing": BadgeIndianRupee,
  "/admin/homepage": Home,
  "/admin/services": Briefcase,
  "/admin/faqs": FileQuestion,
  "/admin/blog": BookOpen,
  "/admin/products": Package,
  "/admin/about": Info,
  "/admin/contact-settings": Mail,
};

type Props = {
  mobileOpen: boolean;
  onClose: () => void;
};

export function AdminSidebar({ mobileOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`admin-sidebar-backdrop${mobileOpen ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!mobileOpen}
      />
      <aside className={`admin-sidebar${mobileOpen ? " is-open" : ""}`} aria-label="Admin navigation">
        <div className="admin-sidebar-brand">
          <Image
            src="/logo-admin-white.png"
            alt="Focused Folks Solutions LLP"
            width={40}
            height={40}
            className="admin-logo-img"
            priority
          />
          <div>
            <p className="admin-sidebar-brand-title">FocusFolks</p>
            <p className="admin-sidebar-brand-sub">Admin</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {ADMIN_SIDEBAR_NAV.map((item) => {
            const active =
              item.match === "exact"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = ICONS[item.href] ?? LayoutDashboard;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link${active ? " is-active" : ""}`}
                onClick={onClose}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <form action="/admin/logout" method="post">
            <button type="submit" className="admin-sidebar-link admin-sidebar-logout">
              <LogOut className="h-4 w-4 shrink-0" aria-hidden />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
