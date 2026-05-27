-- ============================================================
-- Liminal Arc — Database Seed
-- Creates and populates the `projects` table
-- ============================================================

-- 1. Create the projects table
create table if not exists public.projects (
  id            serial primary key,
  title         text        not null,
  location      text        not null,
  category      text        not null,
  status        text        not null default 'Completed',
  duration      text,
  budget        text,
  area          text,
  rooms         text,
  year          text,
  main_image    text,
  gallery       text[]      default '{}',
  description   text,
  features      text[]      default '{}',
  materials     text[]      default '{}',
  testimonial   jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.projects enable row level security;

-- Public read policy (anyone can view projects)
create policy "Anyone can view projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- 2. Seed data from data.json
insert into public.projects
  (id, title, location, category, status, duration, budget, area, rooms, year, main_image, gallery, description, features, materials, testimonial)
values
(
  1,
  'DAMAC Luxury Residence',
  'Dubai, UAE',
  'Interior Design & Fit-Out Works',
  'Completed',
  '6 months',
  '$250K - $300K',
  '5,000 sq ft',
  '4 BR + 5 BA',
  '2024',
  '/projects/damac-residence/main.jpg',
  ARRAY[
    '/projects/damac-residence/living-room.jpg',
    '/projects/damac-residence/kitchen.jpg',
    '/projects/damac-residence/bedroom.jpg'
  ],
  'Liminal Arc is a UAE-based interior design company dedicated to transforming spaces into refined, functional experiences. This residential project focuses on social media worthy visual impact and functional longevity, delivering a space that balances tradition and modernity.',
  ARRAY[
    'Turnkey solutions for prime residential sectors with elegance and a touch of class',
    'Smart automation solutions for homes',
    'Control lighting, climate, security, and entertainment easily',
    'Top-tier craftsmanship with premium materials and meticulous attention to detail'
  ],
  ARRAY['Oak Wood', 'Venetian Plaster', 'Brushed Brass', 'Natural Stone'],
  '{"quote": "They commit to managing every project with absolute transparency-from the initial structural planning to the final polishing of the smallest detail.", "author": "DAMAC Properties", "role": "Client Partner"}'::jsonb
),
(
  2,
  'Provident Corporate Headquarters',
  'Dubai, UAE',
  'Commercial Fit-Out & Automation',
  'Completed',
  '4 months',
  '$150K - $200K',
  '4,200 sq ft',
  'Open Office + 3 Meeting Rooms',
  '2024',
  '/projects/provident-office/reception.jpg',
  ARRAY[
    '/projects/provident-office/workspace.jpg',
    '/projects/provident-office/lounge.jpg',
    '/projects/provident-office/meeting-room.jpg'
  ],
  'We specialize in crafting bespoke interiors that reflect individuality while embracing modern aesthetics and timeless appeal. Our mission for this commercial space was to bridge the gap between creative imagination and technical execution.',
  ARRAY[
    'Complete interior solutions including furniture, joinery, and fit-outs for commercial spaces',
    'End-to-end facility services managed by experienced professionals for smooth operations',
    'Integration of smart-home technologies to create spaces that are as intelligent as they are beautiful'
  ],
  ARRAY['Acoustic Paneling', 'Glass Partitions', 'Engineered Wood', 'Concrete Finish'],
  '{"quote": "Through efficient project management, we ensure all milestones are met without compromising quality.", "author": "Provident Management", "role": "Corporate Client"}'::jsonb
),
(
  3,
  'Pullman Hotel Lounge Renovation',
  'Downtown Dubai, UAE',
  'Luxury Hospitality',
  'Completed',
  '5 months',
  '$350K - $400K',
  '6,500 sq ft',
  'Main Lounge + VIP Areas',
  '2025',
  '/projects/pullman-lounge/main-view.jpg',
  ARRAY[
    '/projects/pullman-lounge/bar-area.jpg',
    '/projects/pullman-lounge/seating.jpg',
    '/projects/pullman-lounge/lighting-details.jpg'
  ],
  'A tailored interior solution using premium materials and advanced techniques. This hospitality project translates complex client aspirations into seamless, high-performance interiors, setting a new global benchmark in the interior landscape where architecture and emotion converge.',
  ARRAY[
    'Turnkey interior fit-out solutions, innovative interior design, custom joinery, and shop fittings',
    'Industry-standard approvals and compliance with relevant regulatory authorities',
    'Eco-friendly materials championing environmental responsibility'
  ],
  ARRAY['Velvet Upholstery', 'Custom Italian Marble', 'Tinted Glass', 'Ambient LED Lighting'],
  '{"quote": "The team focuses on creating safe, functional, and beautiful spaces that prioritize the well-being of clients and teams.", "author": "Pullman Operations", "role": "Hospitality Partner"}'::jsonb
)
on conflict (id) do update set
  title       = excluded.title,
  location    = excluded.location,
  category    = excluded.category,
  status      = excluded.status,
  duration    = excluded.duration,
  budget      = excluded.budget,
  area        = excluded.area,
  rooms       = excluded.rooms,
  year        = excluded.year,
  main_image  = excluded.main_image,
  gallery     = excluded.gallery,
  description = excluded.description,
  features    = excluded.features,
  materials   = excluded.materials,
  testimonial = excluded.testimonial,
  updated_at  = now();
