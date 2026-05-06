"use client";

import { Plus, Edit, Trash2, GripVertical, X, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "@/app/actions/experience";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences().then(data => {
      setExperiences(data);
      setLoading(false);
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ institution: "", period: "", side: "left", description: "" });
  const [saving, setSaving] = useState(false);

  const openModal = (exp?: typeof experiences[0]) => {
    if (exp) {
      setEditId(exp.id);
      setFormData({ institution: exp.institution, period: exp.period, side: exp.side, description: exp.description || "" });
    } else {
      setEditId(null);
      setFormData({ institution: "", period: "", side: "left", description: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateExperience(editId, formData);
      } else {
        await addExperience(formData);
      }
      const newData = await getExperiences();
      setExperiences(newData);
      closeModal();
    } catch (err) {
      alert("Error saving experience");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      try {
        await deleteExperience(id);
        setExperiences(experiences.filter(s => s.id !== id));
      } catch (err) {
        alert("Error deleting experience");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Manage Experience</h1>
          <p className="text-text-secondary">Update your career and educational timeline.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Experience
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-border text-text-secondary text-sm">
              <th className="p-4 w-12 text-center">#</th>
              <th className="p-4">Institution / Role</th>
              <th className="p-4">Period</th>
              <th className="p-4">Side (Timeline)</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="p-4 text-center cursor-move text-text-secondary hover:text-text-primary">
                  <GripVertical size={18} className="inline-block" />
                </td>
                <td className="p-4 font-bold text-text-primary">{exp.institution}</td>
                <td className="p-4 text-text-secondary">{exp.period}</td>
                <td className="p-4 text-text-secondary capitalize">{exp.side}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => openModal(exp)}
                    className="inline-flex items-center justify-center p-2 text-text-secondary hover:text-primary bg-background border border-border rounded transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(exp.id)}
                    className="inline-flex items-center justify-center p-2 text-text-secondary hover:text-red-400 bg-background border border-border rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-text-secondary">No experience added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold text-text-primary">{editId ? "Edit Experience" : "Add New Experience"}</h2>
              <button onClick={closeModal} className="text-text-secondary hover:text-text-primary"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Institution / Role</label>
                <input 
                  type="text" 
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Period (e.g. 2021 - Present)</label>
                <input 
                  type="text" 
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Timeline Side</label>
                <select 
                  value={formData.side}
                  onChange={(e) => setFormData({...formData, side: e.target.value})}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary appearance-none"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-border text-text-primary rounded font-medium hover:bg-background">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-black font-bold rounded hover:bg-primary-muted flex items-center">
                  <Save size={16} className="mr-2" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
