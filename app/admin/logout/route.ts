import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    /* ignore if supabase not configured */
  }
  return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
}
