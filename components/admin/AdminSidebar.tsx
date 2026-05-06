"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Code2, 
  Briefcase, 
  User, 
  MessageSquare,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Projects", href: "/admin/projects", icon: <FolderGit2 size={20} /> },
  { name: "Skills", href: "/admin/skills", icon: <Code2 size={20} /> },
  { name: "Experience", href: "/admin/experience", icon: <Briefcase size={20} /> },
  { name: "About Me", href: "/admin/about", icon: <User size={20} /> },
  { name: "Contact", href: "/admin/contact", icon: <MessageSquare size={20} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="text-2xl font-black text-primary uppercase tracking-tighter">
          GH. Admin
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:bg-background hover:text-text-primary"
              )}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: '/admin' })}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
