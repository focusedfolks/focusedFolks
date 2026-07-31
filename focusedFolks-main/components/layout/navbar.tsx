"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import { mainNav } from "@/constants/navigation";
import { services } from "@/constants/services";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BrandLogo } from "@/components/shared/brand-logo";
import { HeaderChrome } from "@/components/layout/header-chrome";
import { ServicesMegaMenu } from "@/components/layout/services-mega-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollPosition(20);
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement | null>(null);
  const [servicesAnchorTop, setServicesAnchorTop] = useState<number>(84);
  const closeTimerRef = useRef<number | null>(null);

  const isServicesOpen = openMega === "Services";

  const closeMega = () => {
    cancelClose();
    setOpenMega(null);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => setOpenMega(null), 320);
  };

  const openServicesMega = () => {
    cancelClose();
    const rect = servicesButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setServicesAnchorTop(Math.round(rect.bottom));
    }
    setOpenMega("Services");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isServicesOpen) return;
    const update = () => {
      const rect = servicesButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setServicesAnchorTop(Math.round(rect.bottom));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isServicesOpen]);

  useEffect(() => {
    if (!isServicesOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onScroll = () => closeMega();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("scroll", onScroll);
    };
  }, [isServicesOpen]);

  useEffect(() => {
    if (!isServicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isServicesOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMega();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navLinkClass = (active: boolean) =>
    cn(
      "header-nav-link rounded-lg px-3.5 py-2 text-sm",
      active && "header-nav-link-active"
    );

  const panelTop = `calc(${servicesAnchorTop}px + (100vh - ${servicesAnchorTop}px) * 0.025)`;
  const panelHeight = `calc((100vh - ${servicesAnchorTop}px) * 0.95)`;

  const servicesMegaPortal = mounted
    ? createPortal(
        <AnimatePresence>
          {isServicesOpen && (
            <>
              {/* Frosted overlay — covers entire viewport (header + page), mega panel floats above */}
              <motion.div
                key="services-mega-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mega-menu-viewport-backdrop fixed inset-0 z-[95]"
                aria-hidden
                onClick={closeMega}
                onWheel={closeMega}
              />
              {/* Panel — 95% viewport, sharp above blurred backdrop */}
              <motion.div
                key="services-mega-panel"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mega-menu-panel-host fixed left-[2.5vw] z-[100] w-[95vw]"
                style={{ top: panelTop, height: panelHeight }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
              >
                <ServicesMegaMenu onClose={closeMega} />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={cn(
          "header-site fixed top-0 w-full transition-shadow duration-300",
          isServicesOpen ? "z-[70] overflow-visible" : "z-[80] overflow-hidden",
          scrolled && "header-site-scrolled"
        )}
      >
        <HeaderChrome />
        <nav className="relative z-10 container mx-auto flex h-[4.25rem] items-center justify-between px-4 sm:px-6 lg:h-[5.25rem] lg:px-8">
          <Link href="/" className="relative z-20 flex shrink-0 items-center">
            <BrandLogo variant="horizontal" priority imageClassName="h-auto w-64 max-h-[4.1rem] lg:w-[22rem] lg:max-h-[7.1rem]" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.label === "Services") {
                      openServicesMega();
                      return;
                    }
                    closeMega();
                    setOpenMega(item.label);
                  }}
                  onMouseLeave={() => {
                    if (item.label === "Services") return;
                    setOpenMega(null);
                  }}
                >
                  <button
                    ref={item.label === "Services" ? servicesButtonRef : undefined}
                    type="button"
                    className={cn(
                      navLinkClass(pathname.startsWith(item.href)),
                      "flex items-center gap-1"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Non-services dropdown stays in-place */}
                  <AnimatePresence>
                    {openMega === item.label && item.label !== "Services" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.99 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full z-[60] mt-2 -translate-x-1/2"
                      >
                        <div className="glass-white w-80 rounded-2xl p-4 shadow-xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMega}
                              className="footer-link block rounded-xl p-3 transition-colors hover:bg-slate-50"
                            >
                              <span className="font-semibold text-slate-900">{child.label}</span>
                              {child.description && (
                                <p className="footer-body mt-1 text-sm">{child.description}</p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={closeMega}
                  className={navLinkClass(pathname === item.href)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              asChild
              className="from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/20 hover:scale-[1.03]"
            >
              <Link href="/contact">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="header-menu-btn rounded-xl p-2"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8 flex flex-col gap-2">
                {mainNav.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="footer-brand-name block rounded-xl px-4 py-3 text-lg font-semibold hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                    {item.label === "Services"
                      ? services.map((s) => (
                          <Link
                            key={s.id}
                            href={s.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-8 py-2.5 hover:bg-slate-50"
                          >
                            <span className="text-sm font-semibold text-slate-900">{s.title}</span>
                            {s.megaSummary && (
                              <span className="mt-0.5 block text-xs text-slate-500">{s.megaSummary}</span>
                            )}
                          </Link>
                        ))
                      : item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="footer-link block rounded-xl px-8 py-2 text-sm hover:bg-slate-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                  </div>
                ))}
                <Button className="mt-4" size="lg" asChild>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    Get Started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      {servicesMegaPortal}
    </>
  );
}
