"use server";

import { revalidatePath, revalidateTag, updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function requireAuthedClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return supabase;
}

/** Invalidate public pages after CMS saves so live site picks up changes immediately. */
export async function revalidateAdmin(...paths: string[]) {
  for (const p of paths) {
    revalidatePath(p, "page");
    revalidatePath(p, "layout");
  }
  // Prefer updateTag in Server Actions (read-your-own-writes); fall back to revalidateTag.
  try {
    updateTag("cms");
  } catch {
    try {
      revalidateTag("cms", "max");
    } catch {
      // ignore
    }
  }
}

export async function revalidateCmsTags(...tags: string[]) {
  for (const tag of tags) {
    try {
      updateTag(tag);
    } catch {
      try {
        revalidateTag(tag, "max");
      } catch {
        // ignore
      }
    }
  }
  try {
    updateTag("cms");
  } catch {
    try {
      revalidateTag("cms", "max");
    } catch {
      // ignore
    }
  }
}
