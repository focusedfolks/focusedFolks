import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalaxyPageGate } from "@/components/layout/galaxy-page-gate";
import { StickyMobileCta } from "@/components/shared/sticky-mobile-cta";
import { RouteTransition } from "@/components/layout/route-transition";
import { ScrollToTopButton } from "@/components/shared/scroll-to-top";
import { CursorStarTrail } from "@/components/shared/cursor-star-trail";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { SiteLoader } from "@/components/shared/site-loader";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteLoader />
      <div id="site-main-shell">
        <CursorStarTrail />
        <Navbar />
        <GalaxyPageGate>
          <RouteTransition>{children}</RouteTransition>
        </GalaxyPageGate>
        <Footer />
        <StickyMobileCta />
        <WhatsAppFloat />
        <ScrollToTopButton />
      </div>
    </>
  );
}
