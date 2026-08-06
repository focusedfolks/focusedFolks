export function displayNameFromEmail(email: string | null | undefined): string {
  if (!email) return "Admin";
  const local = email.split("@")[0] ?? "Admin";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export function initialsFromEmail(email: string | null | undefined): string {
  if (!email) return "AD";
  const local = email.split("@")[0] ?? "ad";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  return local.slice(0, 2).toUpperCase();
}
