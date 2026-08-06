"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminUiProvider, useAdminUi } from "@/components/admin/admin-ui-context";
import { displayNameFromEmail } from "@/lib/admin/user-display";

function AdminShellInner({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { search, setSearch } = useAdminUi();
  const name = displayNameFromEmail(userEmail);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("site-loader-active");
    html.style.overflow = "auto";
    document.body.style.overflow = "auto";

    // Next.js mounts the Issues badge in a Shadow DOM portal — CSS can't kill its
    // native "Close" tooltip. Remove the portal nodes while admin is mounted.
    const scrubNextDevUi = () => {
      document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
      document
        .querySelectorAll(
          "[data-nextjs-toast], [data-next-badge-root], [data-nextjs-dev-overlay-root], [data-nextjs-dialog-overlay]"
        )
        .forEach((el) => el.remove());
    };
    scrubNextDevUi();

    const observer = new MutationObserver(() => scrubNextDevUi());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="admin-app">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="admin-content">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-btn"
            aria-label={mobileOpen ? "Hide navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>

          <label className="admin-search">
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <input
              type="text"
              inputMode="search"
              placeholder="Search sections…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search sections"
              autoComplete="off"
            />
          </label>

          <div className="admin-topbar-user">
            <Image
              src="/logo-admin-white.png"
              alt=""
              width={34}
              height={34}
              className="admin-avatar-logo"
              aria-hidden
            />
            <div className="admin-topbar-user-meta">
              <p className="admin-topbar-user-name">{name}</p>
              {userEmail ? <p className="admin-topbar-user-email">{userEmail}</p> : null}
            </div>
          </div>
        </header>

        <div className="admin-content-inner">{children}</div>
      </div>
    </div>
  );
}

type Props = {
  children: React.ReactNode;
  userEmail?: string | null;
};

export function AdminShell({ children, userEmail }: Props) {
  return (
    <AdminUiProvider>
      <AdminShellInner userEmail={userEmail}>{children}</AdminShellInner>
    </AdminUiProvider>
  );
}
