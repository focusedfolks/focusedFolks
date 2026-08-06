/**
 * Site is permanently dark on the public pages (class + colorScheme on <html>).
 * next-themes was removed here because its injected <script> crashes under React 19 /
 * Next.js App Router ("Encountered a script tag while rendering React component").
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return children;
}
