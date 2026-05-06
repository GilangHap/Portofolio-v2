# Product Requirements Document (PRD)
## Personal Portfolio Website — GH.

**Version:** 1.0.0
**Last Updated:** May 2026
**Status:** Draft

---

## 1. Overview

### 1.1 Product Summary
Website portofolio personal fullstack developer dengan tampilan dark-theme modern (hitam + neon hijau), dilengkapi admin panel berbasis CMS untuk mengelola seluruh konten secara dinamis tanpa perlu menyentuh kode.

### 1.2 Goals
- Menampilkan identitas, skill, proyek, dan pengalaman secara profesional
- Memberikan kesan pertama yang kuat kepada recruiter & klien potensial
- Memudahkan update konten melalui admin panel tanpa deploy ulang
- Mendukung SEO dan performa tinggi

### 1.3 Non-Goals
- Tidak ada fitur blog/artikel (v1)
- Tidak ada multi-user admin (hanya 1 admin)
- Tidak ada sistem komentar / guestbook

---

## 2. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth (Admin) | NextAuth.js v5 (Credentials Provider) |
| Image Storage | Supabase Storage |
| ORM | Prisma (via Supabase connection string) |
| Deployment | Vercel |
| Language | TypeScript |

---

## 3. Halaman & Fitur (Public)

### 3.1 Struktur Halaman

```
/                   → Home (Hero + About + Skills)
/projects           → Daftar semua proyek
/projects/[slug]    → Detail proyek
/admin              → Login admin
/admin/dashboard    → Admin panel
```

### 3.2 Home Page `/`

#### Section 1 — Hero
| Field | Keterangan |
|---|---|
| Badge | Teks status (contoh: "Available for opportunities") + indikator warna |
| Headline | Teks besar "I'M A FULLSTACK DEVELOPER" (bisa diubah via admin) |
| Foto | Upload foto via Supabase Storage |
| Scroll CTA | Tombol / animasi scroll ke bawah |

#### Section 2 — About Me
| Field | Keterangan |
|---|---|
| Label | "ABOUT_ME" |
| Judul | "Get to know me better" |
| Deskripsi | Paragraf bio (rich text / plain text) |
| Stats Cards | 4 kartu: Years Coding, Projects Built, Tech Stack, Curiosity (semua angka bisa diedit) |

#### Section 3 — Skills & Technologies
| Field | Keterangan |
|---|---|
| Label | "TECH_STACK" |
| Filter Tabs | All, Frontend, Backend, Database, Tools, Mobile |
| Grid Skills | Icon + nama + kategori per item |

---

### 3.3 Projects Page `/projects`

- Header: "FEATURED_PROJECTS" + judul "Projects." + deskripsi singkat
- List proyek (sesuai urutan yang ditentukan admin)
- Setiap card proyek menampilkan:
  - Nomor urut (01, 02, dst)
  - Screenshot / thumbnail
  - Judul proyek
  - Deskripsi singkat
  - Tech stack badges
  - Tombol "View Details" → `/projects/[slug]`
  - Tombol "GitHub" → URL repo
- Tombol "View More Projects" (toggle show/hide proyek tambahan)

---

### 3.4 Project Detail Page `/projects/[slug]`

Berdasarkan desain gambar ketiga, halaman detail memiliki section berikut:

| No | Section | Konten |
|---|---|---|
| 01 | Overview | The Problem, The Goal, Target Users + meta card (Role, Duration, Team, Status, Year) |
| 02 | Tech Stack | Grouped by: Frontend, Backend, Database, Tools |
| 03 | System Architecture | Diagram teks / gambar arsitektur |
| 04 | Key Features | Grid fitur-fitur utama (icon + judul + deskripsi) |
| 05 | UI Preview | Carousel/slider screenshot UI |
| 06 | Challenges & Solutions | Dua kolom: Challenges list + Solutions list |
| 07 | Impact / Result | Kartu metrik (contoh: 60% reduction, 2x faster) |
| 08 | CTA | "Have a project in mind? Let's bring it to life." + tombol Hire Me & View More Projects |

---

### 3.5 Experience Section (di bawah Projects page atau halaman tersendiri)

- Timeline vertikal dengan dua kolom (kiri/kanan bergantian)
- Setiap item: nama institusi, label kategori (berwarna hijau), deskripsi, periode, icon

---

### 3.6 Navigation & Footer

**Navbar:**
- Logo "GH."
- Links: Home, About, Skills, Projects, Experience, Contact
- Tombol "Hire Me" (buka modal / scroll ke contact)
- Hamburger menu (mobile)

**Footer:**
- Social links (GitHub, LinkedIn, dll)
- Email
- Copyright

---

## 4. Admin Panel

### 4.1 Autentikasi
- Route: `/admin`
- Menggunakan NextAuth.js v5 dengan Credentials Provider
- Login dengan email + password (disimpan di Supabase dengan hash bcrypt)
- Session JWT
- Semua route `/admin/*` diproteksi middleware Next.js
- Hanya 1 akun admin (tidak ada registrasi)

---

### 4.2 Modul Admin

#### A. Dashboard
- Overview statistik: total proyek, total skills, last updated
- Shortcut ke masing-masing modul

---

#### B. Manage Projects

**List View:**
- Tabel proyek: nomor, judul, status (featured/hidden), tanggal dibuat
- Tombol: Add, Edit, Delete, Reorder (drag & drop)

**Form Add/Edit Project:**

| Field | Tipe | Keterangan |
|---|---|---|
| `title` | Text | Judul proyek |
| `slug` | Text | Auto-generate dari title, bisa diedit |
| `number` | Number | Nomor urut tampilan (01, 02, ...) |
| `short_description` | Textarea | Deskripsi singkat untuk list page |
| `thumbnail` | Image Upload | Upload ke Supabase Storage |
| `github_url` | URL | Link repo GitHub |
| `live_url` | URL | Link live demo (opsional) |
| `tech_stack` | Multi-select | Pilih dari daftar skills yang ada |
| `status` | Toggle | Featured / Hidden |
| **Detail Fields:** | | |
| `problem` | Textarea | The Problem |
| `goal` | Textarea | The Goal |
| `target_users` | Textarea | Target Users |
| `role` | Text | Fullstack Developer, dll |
| `duration` | Text | "3 Months", dll |
| `team` | Text | "1 Developer", dll |
| `project_status` | Text | Completed / In Progress |
| `year` | Number | Tahun proyek |
| `architecture_description` | Textarea | Deskripsi arsitektur sistem |
| `architecture_image` | Image Upload | Diagram arsitektur (opsional) |
| `key_features` | Repeater | icon + judul + deskripsi (bisa tambah/hapus) |
| `ui_screenshots` | Multi Image | Upload beberapa screenshot UI |
| `challenges` | Repeater | List challenges (bisa tambah/hapus) |
| `solutions` | Repeater | List solutions (bisa tambah/hapus) |
| `impact_metrics` | Repeater | icon + value + label (contoh: 60% + "Reduction") |

---

#### C. Manage Skills & Tech Stack

| Field | Tipe | Keterangan |
|---|---|---|
| `name` | Text | Nama skill (JavaScript, React, dll) |
| `icon` | Image Upload | Upload icon SVG/PNG ke Supabase Storage |
| `category` | Select | Frontend / Backend / Database / Tools / Mobile |
| `order` | Number | Urutan tampilan |

- Tampilan admin: grid dengan filter per kategori
- Bisa tambah, edit, hapus, reorder

---

#### D. Manage Experience / Timeline

| Field | Tipe | Keterangan |
|---|---|---|
| `institution` | Text | Nama perusahaan / institusi |
| `category_label` | Text | "Industrial Internship", "Undergraduate Program", dll |
| `category_color` | Color / Select | Warna label (hijau default) |
| `description` | Textarea | Deskripsi kegiatan |
| `period` | Text | "Jan – Jun 2024", "2021 – Present" |
| `position` | Select | Left / Right (posisi timeline) |
| `icon` | Select / Upload | Icon yang mewakili institusi |
| `order` | Number | Urutan tampilan di timeline |

---

#### E. Manage About Me & Stats

| Field | Tipe | Keterangan |
|---|---|---|
| `availability_status` | Toggle | Available / Not Available for opportunities |
| `availability_label` | Text | "Available for opportunities" |
| `hero_headline` | Text | Teks headline hero ("I'M A FULLSTACK DEVELOPER") |
| `hero_photo` | Image Upload | Foto profil utama |
| `about_bio` | Textarea (Rich Text) | Paragraf bio |
| `stat_years_coding` | Number | Angka stats "Years Coding" |
| `stat_projects_built` | Number | Angka stats "Projects Built" |
| `stat_tech_stack` | Number | Angka stats "Tech Stack" |
| `stat_curiosity_label` | Text | Label khusus (default: ∞ Curiosity) |

---

#### F. Manage Contact & Social Links

| Field | Tipe | Keterangan |
|---|---|---|
| `email` | Text | Email kontak |
| `github_url` | URL | GitHub profile |
| `linkedin_url` | URL | LinkedIn profile |
| `instagram_url` | URL | Instagram (opsional) |
| `twitter_url` | URL | Twitter/X (opsional) |
| `whatsapp_number` | Text | Nomor WA (opsional) |
| `hire_me_label` | Text | Label tombol Hire Me |

---

## 5. Database Schema (Supabase / PostgreSQL)

```sql
-- About / Hero
Table: about
  id              uuid PRIMARY KEY
  headline        text
  bio             text
  availability    boolean
  availability_label text
  hero_photo_url  text
  stat_years      int
  stat_projects   int
  stat_tech_stack int
  stat_curiosity  text
  updated_at      timestamp

-- Contact
Table: contact
  id              uuid PRIMARY KEY
  email           text
  github_url      text
  linkedin_url    text
  instagram_url   text
  twitter_url     text
  whatsapp        text
  hire_label      text
  updated_at      timestamp

-- Skills
Table: skills
  id              uuid PRIMARY KEY
  name            text NOT NULL
  icon_url        text
  category        text   -- frontend | backend | database | tools | mobile
  order_index     int
  created_at      timestamp

-- Projects
Table: projects
  id              uuid PRIMARY KEY
  title           text NOT NULL
  slug            text UNIQUE NOT NULL
  number          int
  short_description text
  thumbnail_url   text
  github_url      text
  live_url        text
  role            text
  duration        text
  team_size       text
  project_status  text
  year            int
  problem         text
  goal            text
  target_users    text
  arch_description text
  arch_image_url  text
  is_featured     boolean DEFAULT true
  order_index     int
  created_at      timestamp
  updated_at      timestamp

-- Project Tech Stack (relasi many-to-many)
Table: project_skills
  project_id      uuid REFERENCES projects(id)
  skill_id        uuid REFERENCES skills(id)

-- Project Key Features
Table: project_features
  id              uuid PRIMARY KEY
  project_id      uuid REFERENCES projects(id)
  icon            text
  title           text
  description     text
  order_index     int

-- Project UI Screenshots
Table: project_screenshots
  id              uuid PRIMARY KEY
  project_id      uuid REFERENCES projects(id)
  image_url       text NOT NULL
  caption         text
  order_index     int

-- Project Challenges
Table: project_challenges
  id              uuid PRIMARY KEY
  project_id      uuid REFERENCES projects(id)
  content         text
  order_index     int

-- Project Solutions
Table: project_solutions
  id              uuid PRIMARY KEY
  project_id      uuid REFERENCES projects(id)
  content         text
  order_index     int

-- Project Impact Metrics
Table: project_metrics
  id              uuid PRIMARY KEY
  project_id      uuid REFERENCES projects(id)
  icon            text
  value           text    -- "60%", "2x", "100%"
  label           text    -- "Reduction in manual HR processing time"
  order_index     int

-- Experience Timeline
Table: experiences
  id              uuid PRIMARY KEY
  institution     text NOT NULL
  category_label  text
  category_color  text
  description     text
  period          text
  side            text    -- left | right
  icon            text
  order_index     int
  created_at      timestamp

-- Admin User
Table: admin_users
  id              uuid PRIMARY KEY
  email           text UNIQUE NOT NULL
  password_hash   text NOT NULL
  created_at      timestamp
```

---

## 6. Supabase Storage Buckets

| Bucket | Konten | Akses |
|---|---|---|
| `hero-photos` | Foto profil hero | Public |
| `project-thumbnails` | Thumbnail proyek | Public |
| `project-screenshots` | Screenshot UI proyek | Public |
| `project-architecture` | Diagram arsitektur | Public |
| `skill-icons` | Icon skill/tech | Public |

---

## 7. API Routes (Next.js)

### Public API
```
GET  /api/about              → Data hero + about
GET  /api/skills             → Semua skills
GET  /api/projects           → Semua proyek (featured)
GET  /api/projects/[slug]    → Detail proyek by slug
GET  /api/experience         → Semua experience
GET  /api/contact            → Data kontak & social
```

### Admin API (Protected — requires session)
```
POST   /api/admin/projects         → Create project
PUT    /api/admin/projects/[id]    → Update project
DELETE /api/admin/projects/[id]    → Delete project
POST   /api/admin/projects/reorder → Reorder projects

POST   /api/admin/skills           → Create skill
PUT    /api/admin/skills/[id]      → Update skill
DELETE /api/admin/skills/[id]      → Delete skill

POST   /api/admin/experience       → Create experience
PUT    /api/admin/experience/[id]  → Update experience
DELETE /api/admin/experience/[id]  → Delete experience

PUT    /api/admin/about            → Update about/hero
PUT    /api/admin/contact          → Update contact

POST   /api/admin/upload           → Upload image ke Supabase Storage
```

---

## 8. Struktur Folder Project

```
portfolio/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  ← Home
│   │   ├── projects/
│   │   │   ├── page.tsx              ← Projects list
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← Project detail
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── api/
│   │   ├── [...]/route.ts
│   │   └── auth/[...nextauth]/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── public/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetail/
│   │   └── ExperienceTimeline.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── ProjectForm.tsx
│       ├── SkillForm.tsx
│       ├── ExperienceForm.tsx
│       ├── ImageUploader.tsx
│       └── ReorderList.tsx
├── lib/
│   ├── supabase.ts
│   ├── prisma.ts
│   └── auth.ts
├── middleware.ts                     ← Proteksi route /admin/*
├── prisma/
│   └── schema.prisma
└── public/
    └── fonts/
```

---

## 9. SEO & Performance

| Aspek | Implementasi |
|---|---|
| Meta Tags | Dinamis per halaman via `generateMetadata()` Next.js |
| OG Image | Static OG image untuk home, dinamis untuk project detail |
| Sitemap | `app/sitemap.ts` auto-generate |
| Robots.txt | `app/robots.ts` |
| Image Optimization | `next/image` dengan Supabase Storage domain |
| Font | Local font atau Google Font (`next/font`) |
| Rendering | SSG untuk home & projects list, SSR untuk dynamic data |
| Loading | Skeleton loading state untuk semua section |

---

## 10. Design System

| Token | Value |
|---|---|
| Background | `#0a0a0a` / `#000000` |
| Surface | `#111111` / `#1a1a1a` |
| Primary (Neon Green) | `#39FF14` / `#22c55e` |
| Text Primary | `#ffffff` |
| Text Secondary | `#888888` |
| Border | `#222222` |
| Font Heading | Bold / Black weight, uppercase |
| Border Radius | `8px` card, `4px` badge |
| Transition | `0.2s ease` default |

---

## 11. Milestone & Prioritas

### Phase 1 — Foundation (Week 1–2)
- Setup Next.js + Tailwind + Supabase + Prisma
- Database schema & migration
- Auth admin (NextAuth.js)
- Layout & Design System (color, font, component base)

### Phase 2 — Public Pages (Week 3–4)
- Hero + About + Skills section (home)
- Projects list page
- Project detail page (semua 8 section)
- Experience timeline
- Navbar + Footer + responsive

### Phase 3 — Admin Panel (Week 5–6)
- Admin login page
- Middleware proteksi
- CRUD: Projects (termasuk repeater fields)
- CRUD: Skills & Tech Stack
- CRUD: Experience
- Edit: About Me & Stats
- Edit: Contact & Social Links
- Image upload ke Supabase Storage

### Phase 4 — Polish & Deploy (Week 7)
- SEO meta tags + sitemap
- Animasi & transisi (Framer Motion)
- Optimasi performa (Core Web Vitals)
- Deploy ke Vercel
- Environment variables production
- Testing end-to-end

---

## 12. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database (Prisma)
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Admin Credentials (seed initial)
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

## 13. Out of Scope (v1)

- Blog / artikel
- Dark/Light mode toggle
- Fitur pencarian proyek
- Multi-bahasa (i18n)
- Analytics dashboard di admin
- Comment / feedback dari visitor
- CI/CD pipeline (cukup Vercel auto-deploy dari GitHub)

---

*Dokumen ini bersifat living document dan akan diperbarui seiring perkembangan proyek.*
