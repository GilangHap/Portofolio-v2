"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { getAbout, saveAbout } from "@/app/actions/about";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    availability: true,
    availability_label: "",
    hero_photo_url: "",
    cv_url: "",
    stat_years: 0,
    stat_projects: 0,
    stat_tech_stack: 0,
    stat_curiosity: "",
  });

  useEffect(() => {
    getAbout().then(data => {
      if (data) {
        setFormData({
          headline: data.headline || "",
          bio: data.bio || "",
          availability: data.availability ?? true,
          availability_label: data.availability_label || "",
          hero_photo_url: data.hero_photo_url || "",
          cv_url: data.cv_url || "",
          stat_years: data.stat_years || 0,
          stat_projects: data.stat_projects || 0,
          stat_tech_stack: data.stat_tech_stack || 0,
          stat_curiosity: data.stat_curiosity || "",
        });
      }
      setInitialFetchDone(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        stat_years: parseInt(formData.stat_years as any),
        stat_projects: parseInt(formData.stat_projects as any),
        stat_tech_stack: parseInt(formData.stat_tech_stack as any),
      };
      await saveAbout(payload);
      alert("Settings saved!");
    } catch (error) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Manage About Me & Stats</h1>
        <p className="text-text-secondary">Update your headline, bio, and portfolio statistics.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-surface border border-border p-8 rounded-xl shadow-sm">
        
        {/* Availability */}
        <div className="flex items-center space-x-3">
          <input 
            type="checkbox" 
            id="availability" 
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="w-5 h-5 accent-primary bg-background border-border" 
          />
          <label htmlFor="availability" className="text-sm font-medium text-text-primary">
            Available for opportunities
          </label>
        </div>

        {/* Headline & Photo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Availability Label</label>
              <input 
                type="text" 
                name="availability_label"
                value={formData.availability_label}
                onChange={handleChange}
                placeholder="e.g. Available for opportunities"
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Hero Headline</label>
              <input 
                type="text" 
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="I'M A FULLSTACK DEVELOPER"
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-text-secondary mb-2">Hero Photo</label>
            <ImageUploader 
              onUpload={(url) => setFormData(prev => ({ ...prev, hero_photo_url: url }))}
              currentImage={formData.hero_photo_url}
              bucket="images"
            />
          </div>
        </div>

        {/* CV URL */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">CV / Resume URL</label>
          <input
            type="url"
            name="cv_url"
            value={formData.cv_url}
            onChange={handleChange}
            placeholder="https://drive.google.com/... or Supabase storage URL"
            className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
          />
          <p className="text-xs text-text-secondary mt-1">Upload your CV PDF to Supabase Storage or paste a Google Drive / Dropbox link.</p>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">About Bio</label>
          <textarea 
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={5}
            placeholder="Write a brief intro about yourself..."
            className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary resize-y"
          ></textarea>
        </div>

        {/* Stats */}
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-4 border-b border-border pb-2">Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Years Coding</label>
              <input 
                type="number" 
                name="stat_years"
                value={formData.stat_years}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Projects Built</label>
              <input 
                type="number" 
                name="stat_projects"
                value={formData.stat_projects}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Tech Stack Count</label>
              <input 
                type="number" 
                name="stat_tech_stack"
                value={formData.stat_tech_stack}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Curiosity Label</label>
              <input 
                type="text" 
                name="stat_curiosity"
                value={formData.stat_curiosity}
                onChange={handleChange}
                placeholder="∞"
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
