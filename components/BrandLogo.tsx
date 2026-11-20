"use client";

import Image from "next/image";
import brandLogo from "@/logo-mark.png";
import { COMPANY_DISPLAY_NAME } from "@/lib/contact-site-data";

type Props = {
  className?: string;
  /** Kept for call-site compatibility — logo is theme-independent. */
  forceDark?: boolean;
  /** Kept for call-site compatibility — logo is theme-independent. */
  forceLight?: boolean;
  priority?: boolean;
  alt?: string;
  width?: number;
  height?: number;
};

/**
 * Same logo mark as SiteHeader — use this everywhere in the LMS
 * so branding matches the site header.
 */
export default function BrandLogo({
  className = "h-10 w-auto object-contain",
  forceDark: _forceDark = false,
  forceLight: _forceLight = false,
  priority = false,
  alt = COMPANY_DISPLAY_NAME,
  width = 128,
  height = 128,
}: Props) {
  void _forceDark;
  void _forceLight;

  return (
    <Image
      src={brandLogo}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
