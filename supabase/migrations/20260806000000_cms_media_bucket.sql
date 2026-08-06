-- Public media bucket for CMS uploads (team photos, process images, blog covers).
-- Safe to re-run: upserts bucket; policies created only if missing.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'cms-media public read'
  ) then
    create policy "cms-media public read"
      on storage.objects for select
      using (bucket_id = 'cms-media');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'cms-media auth insert'
  ) then
    create policy "cms-media auth insert"
      on storage.objects for insert
      to authenticated
      with check (bucket_id = 'cms-media');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'cms-media auth update'
  ) then
    create policy "cms-media auth update"
      on storage.objects for update
      to authenticated
      using (bucket_id = 'cms-media')
      with check (bucket_id = 'cms-media');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'cms-media auth delete'
  ) then
    create policy "cms-media auth delete"
      on storage.objects for delete
      to authenticated
      using (bucket_id = 'cms-media');
  end if;
end $$;
