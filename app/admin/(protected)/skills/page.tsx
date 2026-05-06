"use client";

import { Plus, Edit, Trash2, GripVertical, X, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getSkills, addSkill, updateSkill, deleteSkill } from "@/app/actions/skills";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills().then(data => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "Frontend", icon_url: "" });
  const [saving, setSaving] = useState(false);

  const openModal = (skill?: typeof skills[0]) => {
    if (skill) {
      setEditId(skill.id);
      setFormData({ name: skill.name, category: skill.category, icon_url: skill.icon_url || "" });
    } else {
      setEditId(null);
      setFormData({ name: "", category: "Frontend", icon_url: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateSkill(editId, formData);
      } else {
        await addSkill(formData);
      }
      const newData = await getSkills();
      setSkills(newData);
      closeModal();
    } catch (err) {
      alert("Error saving skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id);
        setSkills(skills.filter(s => s.id !== id));
      } catch (err) {
        alert("Error deleting skill");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Manage Skills</h1>
          <p className="text-text-secondary">Add and organize your tech stack.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Skill
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-border text-text-secondary text-sm">
              <th className="p-4 w-12 text-center">#</th>
              <th className="p-4 w-16 text-center">Icon</th>
              <th className="p-4">Skill Name</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="p-4 text-center cursor-move text-text-secondary hover:text-text-primary">
                  <GripVertical size={18} className="inline-block" />
                </td>
                <td className="p-4 text-center">
                  {skill.icon_url ? (
                    <img src={skill.icon_url} alt={skill.name} className="w-8 h-8 inline-block object-contain" />
                  ) : (
                    <div className="w-8 h-8 bg-surface border border-border rounded flex items-center justify-center inline-flex text-xs text-text-secondary">
                      -
                    </div>
                  )}
                </td>
                <td className="p-4 font-bold text-text-primary">{skill.name}</td>
                <td className="p-4 text-text-secondary">{skill.category}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => openModal(skill)}
                    className="inline-flex items-center justify-center p-2 text-text-secondary hover:text-primary bg-background border border-border rounded transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.id)}
                    className="inline-flex items-center justify-center p-2 text-text-secondary hover:text-red-400 bg-background border border-border rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-text-secondary">No skills added yet.</td>
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
              <h2 className="text-xl font-bold text-text-primary">{editId ? "Edit Skill" : "Add New Skill"}</h2>
              <button onClick={closeModal} className="text-text-secondary hover:text-text-primary"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Skill Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:border-primary appearance-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Design">UI/UX & Design</option>
                  <option value="Language">Language</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Skill Icon</label>
                <ImageUploader 
                  onUpload={(url) => setFormData({...formData, icon_url: url})}
                  currentImage={formData.icon_url}
                  bucket="skills"
                />
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
