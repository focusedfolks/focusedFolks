/** Public Supabase Storage bucket for CMS uploads (team, process, blog covers). */
export const CMS_MEDIA_BUCKET = "cms-media";

export function cmsMediaPublicUrl(supabaseUrl: string, path: string): string {
  const base = supabaseUrl.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/${CMS_MEDIA_BUCKET}/${path.replace(/^\//, "")}`;
}
