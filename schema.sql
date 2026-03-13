-- =============================================
-- Clínica Dental Dentimax – Supabase Schema
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- SERVICES
-- =============================================
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price_from numeric(10,2),
  price_to numeric(10,2),
  duration_minutes integer,
  category text check (category in ('limpieza','ortodoncia','implantes','blanqueamiento','radiografia','estetica','general')),
  icon text,
  is_active boolean default true,
  created_at timestamptz default now()
);

insert into services (name, description, price_from, price_to, duration_minutes, category) values
  ('Limpieza dental', 'Limpieza profesional con ultrasonido y pulido', 80.00, 120.00, 45, 'limpieza'),
  ('Ortodoncia Brackets', 'Ortodoncia con brackets metálicos o estéticos', 2800.00, 4500.00, 60, 'ortodoncia'),
  ('Implante dental', 'Implante de titanio con corona porcelana', 1200.00, 2500.00, 90, 'implantes'),
  ('Blanqueamiento LED', 'Blanqueamiento profesional con lámpara LED', 150.00, 250.00, 60, 'blanqueamiento'),
  ('Radiografía panorámica', 'Radiografía digital panorámica y periapical', 50.00, 90.00, 15, 'radiografia'),
  ('Diseño de Sonrisa', 'Carillas y diseño digital de sonrisa', 350.00, 800.00, 120, 'estetica');

-- =============================================
-- DOCTORS
-- =============================================
create table if not exists doctors (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  specialty text not null,
  degree text,
  university text,
  bio text,
  gender text check (gender in ('male','female','other')),
  avatar_color text,
  initials text,
  order_index integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

insert into doctors (full_name, specialty, degree, university, bio, gender, avatar_color, initials, order_index) values
  ('Carmen Quispe', 'Ortodoncia y Ortopedia Maxilar', 'Especialista en Ortodoncia', 'UNMSM', 'Con más de 8 años de experiencia en tratamientos ortodónticos para niños y adultos.', 'female', '#ec4899', 'CQ', 1),
  ('Rodrigo Vega', 'Implantología y Cirugía Oral', 'Especialista en Implantología', 'UPCH', 'Especialista en implantes de titanio y rehabilitación oral con más de 500 casos exitosos.', 'male', '#2563eb', 'RV', 2),
  ('Sofía Llanos', 'Estética y Blanqueamiento Dental', 'Especialista en Odontología Estética', 'PUCP', 'Apasionada del arte dental, transforma sonrisas con técnicas de vanguardia.', 'female', '#06b6d4', 'SL', 3);

-- =============================================
-- PATIENTS
-- =============================================
create table if not exists patients (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text,
  email text,
  date_of_birth date,
  gender text check (gender in ('male','female','other')),
  address text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- APPOINTMENTS
-- =============================================
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_name text not null,
  patient_phone text not null,
  patient_email text,
  service_id uuid references services(id) on delete set null,
  doctor_id uuid references doctors(id) on delete set null,
  preferred_date date not null,
  preferred_time time,
  message text,
  status text check (status in ('pending','confirmed','in_progress','completed','cancelled')) default 'pending',
  source text check (source in ('web','whatsapp','phone','walk_in')) default 'web',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- TESTIMONIALS
-- =============================================
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  patient_name text not null,
  gender text check (gender in ('male','female','other')),
  rating numeric(2,1) check (rating >= 1 and rating <= 5),
  treatment text,
  content text not null,
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

insert into testimonials (patient_name, gender, rating, treatment, content, is_published, published_at) values
  ('Milagros Torres', 'female', 5.0, 'Diseño de Sonrisa', 'Vine muy nerviosa porque tenía años sin ir al dentista, pero el equipo me hizo sentir súper cómoda. ¡El resultado superó mis expectativas!', true, now()),
  ('Carlos Mendoza', 'male', 4.5, 'Ortodoncia', 'Llevo 8 meses con los brackets y el avance es increíble. La Dra. Carmen es muy profesional y siempre explica cada paso del tratamiento.', true, now());

-- =============================================
-- GALLERY
-- =============================================
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text not null,
  category text check (category in ('clinic','treatment','team','before_after')),
  order_index integer default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- BEFORE/AFTER CASES
-- =============================================
create table if not exists before_after_cases (
  id uuid primary key default uuid_generate_v4(),
  treatment_name text not null,
  before_image_url text not null,
  after_image_url text not null,
  description text,
  doctor_id uuid references doctors(id) on delete set null,
  order_index integer default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- CONTACT MESSAGES (from appointment form)
-- =============================================
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  service text,
  preferred_date date,
  message text,
  is_read boolean default false,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
alter table services enable row level security;
alter table doctors enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;
alter table testimonials enable row level security;
alter table gallery enable row level security;
alter table before_after_cases enable row level security;
alter table contact_messages enable row level security;

-- Public read policies
create policy "Services are publicly readable" on services for select using (is_active = true);
create policy "Doctors are publicly readable" on doctors for select using (is_active = true);
create policy "Testimonials are publicly readable" on testimonials for select using (is_published = true);
create policy "Gallery is publicly readable" on gallery for select using (is_published = true);
create policy "Before/After cases are publicly readable" on before_after_cases for select using (is_published = true);

-- Anyone can submit appointment or contact
create policy "Anyone can submit appointments" on appointments for insert with check (true);
create policy "Anyone can submit contact messages" on contact_messages for insert with check (true);

-- Service role can do everything (for admin panel)
create policy "Service role manages services" on services for all using (auth.role() = 'service_role');
create policy "Service role manages doctors" on doctors for all using (auth.role() = 'service_role');
create policy "Service role manages patients" on patients for all using (auth.role() = 'service_role');
create policy "Service role manages appointments" on appointments for all using (auth.role() = 'service_role');
create policy "Service role manages testimonials" on testimonials for all using (auth.role() = 'service_role');
create policy "Service role manages gallery" on gallery for all using (auth.role() = 'service_role');
create policy "Service role manages before_after_cases" on before_after_cases for all using (auth.role() = 'service_role');
create policy "Service role manages contact_messages" on contact_messages for all using (auth.role() = 'service_role');

-- =============================================
-- INDEXES
-- =============================================
create index if not exists idx_appointments_status on appointments(status);
create index if not exists idx_appointments_date on appointments(preferred_date);
create index if not exists idx_contact_messages_read on contact_messages(is_read);
create index if not exists idx_testimonials_published on testimonials(is_published);
