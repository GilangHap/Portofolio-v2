"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ExternalLink, MessageSquare, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "@/components/BrandIcons";

const ICON_MAP: Record<string, any> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  x: TwitterIcon,
  email: Mail,
  whatsapp: Phone,
};

const getIcon = (platform: string) => {
  const key = platform.toLowerCase();
  for (const [k, Icon] of Object.entries(ICON_MAP)) {
    if (key.includes(k)) return Icon;
  }
  return ExternalLink;
};

export default function ContactSection({
  socialLinks = [],
  about,
}: {
  socialLinks?: any[];
  about: any;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">CONTACT_ME</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Let's Work <br />
            <span className="text-primary">Together.</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl text-lg">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* LEFT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quick info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg group hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-widest">Status</p>
                  <p className="text-sm font-semibold text-text-primary">
                    {about?.availability_label || "Open to opportunities"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg group hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-widest">Location</p>
                  <p className="text-sm font-semibold text-text-primary">Indonesia 🇮🇩</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg group hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-widest">Response Time</p>
                  <p className="text-sm font-semibold text-text-primary">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">Find me on</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = getIcon(link.platform);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
                      >
                        <Icon size={16} />
                        <span>{link.platform}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Decorative quote */}
            <div className="p-6 border border-primary/20 bg-primary/5 rounded-lg">
              <p className="text-text-secondary text-sm leading-relaxed italic">
                "Any fool can write code that a computer can understand. Good programmers write code that humans can understand"
              </p>
              <p className="text-primary text-xs mt-3 font-mono">— Martin Fowler</p>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full min-h-100 bg-surface border border-primary/30 rounded-xl p-10 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="text-primary" size={36} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Message Sent!</h3>
                  <p className="text-text-secondary mb-8 max-w-sm">
                    Thanks for reaching out. I'll get back to you as soon as possible, usually within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-surface border border-border rounded-xl p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                        Your Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Hi, I'd love to discuss a project with you..."
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm resize-none"
                    />
                    <p className="text-xs text-text-secondary/50 text-right">
                      {form.message.length}/1000
                    </p>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-text-secondary/50">
                    I'll reply to your email directly. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
