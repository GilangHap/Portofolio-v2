"use client";

import { Plus, Edit, Trash2, GripVertical, X, Save, Loader2, Briefcase, GraduationCap, Award, Code, Star, Building2, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "@/app/actions/experience";

const ICON_OPTIONS = [
  { value: "Briefcase", label: "Briefcase (Work)" },
  { value: "GraduationCap", label: "Graduation Cap (Education)" },
  { value: "Award", label: "Award (Achievement)" },
  { value: "Code", label: "Code (Project)" },
  { value: "Star", label: "Star (Highlight)" },
  { value: "Building2", label: "Building (Organization)" },
  { value: "Trophy", label: "Trophy (Competition)" },
];

const COLOR_OPTIONS = [
  { value: "#39FF14", label: "Neon Green (default)" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#a855f7", label: "Purple" },
  { value: "#f97316", label: "Orange" },
  { value: "#ef4444", label: "Red" },
  { value: "#facc15", label: "Yellow" },
  { value: "#06b6d4", label: "Cyan" },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={16} />,
  GraduationCap: <GraduationCap size={16} />,
  Award: <Award size={16} />,
  Code: <Code size={16} />,
  Star: <Star size={16} />,
  Building2: <Building2 size={16} />,
  Trophy: <Trophy size={16} />,
};

const emptyForm = {
  institution: "",
  category_label: "",
  category_color: "#39FF14",
  description: "",
  period: "",
  side: "left",
  icon: "Briefcase",
  order_index: 0,
};

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getExperiences().then(data => {
      setExperiences(data);
      setLoading(false);
    });
  }, []);

  const openModal = (exp?: typeof experiences[0]) => {
    if (exp) {
      setEditId(exp.id);
      setFormData({
        institution: exp.institution || "",
        category_label: exp.category_label || "",
        category_color: exp.category_color || "#39FF14",
        description: exp.description || "",
        period: exp.period || "",
        side: exp.side || "left",
        icon: exp.icon || "Briefcase",
        order_index: exp.order_index ?? 0,
      });
    } else {
      setEditId(null);
      setFormData({ ...emptyForm, order_index: experiences.length });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "order_index" ? parseInt(value) || 0 : value }));
  };

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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border text-text-secondary text-sm">
                <th className="p-4 w-12 text-center">Order</th>
                <th className="p-4">Institution / Role</th>
                <th className="p-4">Category</th>
                <th className="p-4">Period</th>
                <th className="p-4">Side</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="p-4 text-center text-text-secondary font-mono text-sm">{exp.order_index ?? 0}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-text-secondary">
                        {ICON_MAP[exp.icon] ?? <Briefcase size={16} />}
                      </span>
                      <span className="font-bold text-text-primary">{exp.institution}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {exp.category_label && (
                      <span
                        className="px-2 py-0.5 text-xs font-bold rounded-full border"
                        style={{
                          color: exp.category_color || "#39FF14",
                          borderColor: `${exp.category_color || "#39FF14"}40`,
                          backgroundColor: `${exp.category_color || "#39FF14"}15`,
                        }}
                      >
                        {exp.category_label}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-text-secondary text-sm font-mono">{exp.period}</td>
                  <td className="p-4 text-text-secondary capitalize text-sm">{exp.side}</td>
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
                  <td colSpan={6} className="p-8 text-center text-text-secondary">No experience added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-surface z-10">
              <h2 className="text-xl font-bold text-text-primary">{editId ? "Edit Experience" : "Add New Experience"}</h2>
              <button onClick={closeModal} className="text-text-secondary hover:text-text-primary"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Institution / Role <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="institution"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="e.g. Universitas XYZ / Frontend Developer at ABC"
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              {/* Period */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Period <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="period"
                  required
                  value={formData.period}
                  onChange={handleChange}
                  placeholder="e.g. Jan 2022 – Present"
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              {/* Category Label + Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Category Label</label>
                  <input
                    type="text"
                    name="category_label"
                    value={formData.category_label}
                    onChange={handleChange}
                    placeholder="e.g. Education, Work, Org"
                    className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Category Color</label>
                  <select
                    name="category_color"
                    value={formData.category_color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary appearance-none"
                  >
                    {COLOR_OPTIONS.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  {/* Color preview */}
                  <div
                    className="mt-1 h-1.5 rounded-full"
                    style={{ backgroundColor: formData.category_color }}
                  />
                </div>
              </div>

              {/* Icon + Side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Icon</label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary appearance-none"
                  >
                    {ICON_OPTIONS.map(i => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Timeline Side</label>
                  <select
                    name="side"
                    value={formData.side}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of your role or activities..."
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary resize-y"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  name="order_index"
                  min={0}
                  value={formData.order_index}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-text-primary focus:outline-none focus:border-primary"
                />
                <p className="text-xs text-text-secondary mt-1">Lower number = shown first on timeline.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-border text-text-primary rounded font-medium hover:bg-background transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-black font-bold rounded hover:bg-primary-muted flex items-center disabled:opacity-70 transition-colors">
                  {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
