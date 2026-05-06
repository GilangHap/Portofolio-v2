"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getContact() {
  const { data, error } = await supabase.from('Contact').select('*').single();
  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching contact:", error);
  }
  return data || null;
}

export async function saveContact(formData: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const existing = await getContact();
  const payload = { ...formData, updated_at: new Date().toISOString() };

  let response;
  if (existing) {
    response = await supabase.from('Contact').update(payload).eq('id', existing.id).select().single();
  } else {
    response = await supabase.from('Contact').insert([{ id: crypto.randomUUID(), ...payload }]).select().single();
  }

  if (response.error) {
    console.error("Supabase Contact Error:", response.error);
    throw new Error(response.error.message);
  }

  revalidatePath('/admin/contact');
  revalidatePath('/');
  return response.data;
}

// Helper for frontend ContactSection component to keep the same interface
export async function getSocialLinks() {
  const contact = await getContact();
  if (!contact) return [];

  const links = [];
  if (contact.github_url) links.push({ id: 'github', platform: 'Github', url: contact.github_url });
  if (contact.linkedin_url) links.push({ id: 'linkedin', platform: 'LinkedIn', url: contact.linkedin_url });
  if (contact.instagram_url) links.push({ id: 'instagram', platform: 'Instagram', url: contact.instagram_url });
  if (contact.twitter_url) links.push({ id: 'twitter', platform: 'Twitter', url: contact.twitter_url });
  if (contact.whatsapp) links.push({ id: 'whatsapp', platform: 'WhatsApp', url: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}` });

  return links;
}
