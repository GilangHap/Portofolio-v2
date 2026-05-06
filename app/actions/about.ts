"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getAbout() {
  // Assuming there's only one row in About
  const { data, error } = await supabase.from('About').select('*').single();
  if (error && error.code !== 'PGRST116') { // PGRST116 is "JSON object requested, multiple (or no) rows returned"
    console.error("Error fetching about:", error);
  }
  return data || null;
}

export async function saveAbout(formData: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  // Check if it exists
  const existing = await getAbout();
  
  const payload = {
    ...formData,
    updated_at: new Date().toISOString(),
  };

  let response;
  if (existing) {
    response = await supabase.from('About').update(payload).eq('id', existing.id).select().single();
  } else {
    response = await supabase.from('About').insert([{ id: crypto.randomUUID(), ...payload }]).select().single();
  }

  if (response.error) {
    console.error("Supabase error in saveAbout:", response.error);
    throw new Error(response.error.message);
  }
  
  revalidatePath('/admin/about');
  revalidatePath('/');
  return response.data;
}
