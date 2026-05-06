"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type ExperienceFormData = {
  institution: string;
  category_label?: string;
  category_color?: string;
  description?: string;
  period: string;
  side: string;
  icon?: string;
  order_index?: number;
};

export async function getExperiences() {
  const { data, error } = await supabase
    .from('Experience')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) console.error("Error fetching experiences:", error);
  return data || [];
}

export async function addExperience(formData: ExperienceFormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('Experience')
    .insert([{ id: crypto.randomUUID(), ...formData }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/experience');
  revalidatePath('/');
  return data;
}

export async function updateExperience(id: string, formData: ExperienceFormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('Experience')
    .update(formData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/experience');
  revalidatePath('/');
  return data;
}

export async function deleteExperience(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase.from('Experience').delete().eq('id', id);
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/experience');
  return true;
}
