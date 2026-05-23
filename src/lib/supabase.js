import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);

export function storageUrl(path, bucket = "kennytrbl") {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
