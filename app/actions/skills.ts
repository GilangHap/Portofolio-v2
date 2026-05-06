"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  const { data, error } = await supabase.from('Skill').select('*').order('created_at', { ascending: true });
  if (error) console.error("Error fetching skills:", error);
  return data || [];
}

export async function addSkill(formData: { name: string, category: string, icon_url?: string }) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { data, error } = await supabase.from('Skill').insert([{ id: crypto.randomUUID(), ...formData }]).select().single();
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/skills');
  return data;
}

export async function updateSkill(id: string, formData: { name: string, category: string, icon_url?: string }) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { data, error } = await supabase.from('Skill').update(formData).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/skills');
  return data;
}

export async function deleteSkill(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase.from('Skill').delete().eq('id', id);
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/skills');
  return true;
}
