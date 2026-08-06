"use client";

import { useEffect, useId } from "react";

/**
 * Injects JSON-LD via the DOM instead of rendering a <script> in JSX.
 * React 19 rejects <script> tags inside client component trees.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const reactId = useId();
  const scriptId = `json-ld-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [data, scriptId]);

  return null;
}
