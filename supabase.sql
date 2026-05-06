-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.About (
  id uuid NOT NULL,
  headline text,
  bio text,
  availability boolean NOT NULL DEFAULT true,
  availability_label text,
  hero_photo_url text,
  stat_years integer NOT NULL DEFAULT 0,
  stat_projects integer NOT NULL DEFAULT 0,
  stat_tech_stack integer NOT NULL DEFAULT 0,
  stat_curiosity text,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT About_pkey PRIMARY KEY (id)
);
CREATE TABLE public.AdminUser (
  id uuid NOT NULL,
  email text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT AdminUser_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Contact (
  id uuid NOT NULL,
  email text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  twitter_url text,
  whatsapp text,
  hire_label text,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT Contact_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Experience (
  id uuid NOT NULL,
  institution text NOT NULL,
  category_label text,
  category_color text,
  description text,
  period text,
  side text,
  icon text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Experience_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Project (
  id uuid NOT NULL,
  title text NOT NULL,
  slug text NOT NULL,
  number integer,
  short_description text,
  thumbnail_url text,
  github_url text,
  live_url text,
  role text,
  duration text,
  team_size text,
  project_status text,
  year integer,
  problem text,
  goal text,
  target_users text,
  arch_description text,
  arch_image_url text,
  is_featured boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT Project_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ProjectChallenge (
  id uuid NOT NULL,
  project_id uuid NOT NULL,
  content text,
  order_index integer NOT NULL DEFAULT 0,
  CONSTRAINT ProjectChallenge_pkey PRIMARY KEY (id),
  CONSTRAINT ProjectChallenge_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.Project(id)
);
CREATE TABLE public.ProjectFeature (
  id uuid NOT NULL,
  project_id uuid NOT NULL,
  icon text,
  title text,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  CONSTRAINT ProjectFeature_pkey PRIMARY KEY (id),
  CONSTRAINT ProjectFeature_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.Project(id)
);
CREATE TABLE public.ProjectMetric (
  id uuid NOT NULL,
  project_id uuid NOT NULL,
  icon text,
  value text,
  label text,
  order_index integer NOT NULL DEFAULT 0,
  CONSTRAINT ProjectMetric_pkey PRIMARY KEY (id),
  CONSTRAINT ProjectMetric_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.Project(id)
);
CREATE TABLE public.ProjectScreenshot (
  id uuid NOT NULL,
  project_id uuid NOT NULL,
  image_url text NOT NULL,
  caption text,
  order_index integer NOT NULL DEFAULT 0,
  CONSTRAINT ProjectScreenshot_pkey PRIMARY KEY (id),
  CONSTRAINT ProjectScreenshot_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.Project(id)
);
CREATE TABLE public.ProjectSkill (
  project_id uuid NOT NULL,
  skill_id uuid NOT NULL,
  CONSTRAINT ProjectSkill_pkey PRIMARY KEY (project_id, skill_id),
  CONSTRAINT ProjectSkill_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.Project(id),
  CONSTRAINT ProjectSkill_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.Skill(id)
);
CREATE TABLE public.ProjectSolution (
  id uuid NOT NULL,
  project_id uuid NOT NULL,
  content text,
  order_index integer NOT NULL DEFAULT 0,
  CONSTRAINT ProjectSolution_pkey PRIMARY KEY (id),
  CONSTRAINT ProjectSolution_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.Project(id)
);
CREATE TABLE public.Skill (
  id uuid NOT NULL,
  name text NOT NULL,
  icon_url text,
  category text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Skill_pkey PRIMARY KEY (id)
);