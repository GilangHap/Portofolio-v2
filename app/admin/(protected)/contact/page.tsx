"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { getContact, saveContact } from "@/app/actions/contact";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    github_url: "",
    linkedin_url: "",
    instagram_url: "",
    twitter_url: "",
    whatsapp: "",
    hire_label: "",
  });

  useEffect(() => {
    getContact().then(data => {
      if (data) {
        setFormData({
          email: data.email || "",
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          instagram_url: data.instagram_url || "",
          twitter_url: data.twitter_url || "",
          whatsapp: data.whatsapp || "",
          hire_label: data.hire_label || "",
        });
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveContact(formData);
      alert("Contact info saved!");
    } catch (error: any) {
      alert("Error saving: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Manage Contact & Social Links</h1>
        <p className="text-text-secondary">Update your email, social media profiles, and call-to-action buttons.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-surface border border-border p-8 rounded-xl shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@example.com"
              className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">WhatsApp Number (Optional)</label>
            <input 
              type="text" 
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+628123456789"
              className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Hire Me Button Label</label>
            <input 
              type="text" 
              name="hire_label"
              value={formData.hire_label}
              onChange={handleChange}
              placeholder="Hire Me"
              className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-text-primary mb-4 border-b border-border pb-2 mt-4">Social Media Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">GitHub URL</label>
              <input 
                type="url" 
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">LinkedIn URL</label>
              <input 
                type="url" 
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourusername"
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Instagram URL</label>
              <input 
                type="url" 
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/yourusername"
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Twitter/X URL</label>
              <input 
                type="url" 
                name="twitter_url"
                value={formData.twitter_url}
                onChange={handleChange}
                placeholder="https://twitter.com/yourusername"
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2.5 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
