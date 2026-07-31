import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_ASSETS = {
  horizontal: { src: "/logo-h.png", width: 1536, height: 1024 },
  vertical: { src: "/logo-v.png", width: 1024, height: 1024 },
} as const;

type BrandLogoProps = {
  variant: keyof typeof LOGO_ASSETS;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandLogo({ variant, className, imageClassName, priority }: BrandLogoProps) {
  const logo = LOGO_ASSETS[variant];

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={logo.src}
        alt="Focused Folks Solutions LLP"
        width={logo.width}
        height={logo.height}
        style={{ width: "auto", maxWidth: "100%" }}
        className={cn(
          "object-contain",
          variant === "horizontal" && "brand-logo-horizontal",
          variant === "vertical" && "brand-logo-vertical",
          imageClassName
        )}
        priority={priority}
      />
    </span>
  );
}
