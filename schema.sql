-- =====================================================================
-- FORCE CHRÉTIENNE + JOYAU — Base de données Supabase
-- À coller en entier dans Supabase : SQL Editor > New query > Run
-- Le script peut être relancé sans danger (il ne supprime aucune donnée).
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Administrateurs : leurs e-mails reçoivent automatiquement le rôle admin
-- ---------------------------------------------------------------------
create table if not exists public.admin_emails (
  email text primary key
);
insert into public.admin_emails (email) values
  ('direction@zematechnologies.com'),
  ('forcechretienne@proton.me')
on conflict do nothing;
alter table public.admin_emails enable row level security;

-- ---------------------------------------------------------------------
-- 2. Profils des membres
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nom text not null,
  prenoms text not null,
  profession text not null,
  entreprise text default '',
  eglise text not null,
  assemblee text not null,
  naissance date,
  ville text default '',
  tel text default '',
  whatsapp text default '',
  mail text default '',
  bio text default '',
  photo_url text default '',
  carte_path text default '',
  carte_verso_path text default '',
  secteur text default '',
  status text not null default 'pending' check (status in ('pending','active','refused')),
  role text not null default 'member' check (role in ('member','admin')),
  created_at timestamptz not null default now()
);

-- Fonctions utilitaires (security definer pour éviter les boucles de sécurité)
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;
create or replace function public.is_active() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and status = 'active');
$$;

-- Un membre ne peut ni se donner le rôle admin ni se valider lui-même
create or replace function public.profiles_guard() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_email text;
begin
  if tg_op = 'INSERT' then
    if new.id <> auth.uid() and not public.is_admin() then
      raise exception 'Action non autorisée';
    end if;
    select email into v_email from auth.users where id = new.id;
    if exists (select 1 from public.admin_emails a where lower(a.email) = lower(v_email)) then
      new.role := 'admin'; new.status := 'active';
    else
      new.role := 'member'; new.status := 'pending';
    end if;
    if coalesce(new.mail, '') = '' then new.mail := coalesce(v_email, ''); end if;
  elsif tg_op = 'UPDATE' then
    if not public.is_admin() then
      new.role := old.role;
      new.status := case when old.status = 'refused' then 'pending' else old.status end;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_profiles_guard on public.profiles;
create trigger trg_profiles_guard before insert or update on public.profiles
for each row execute function public.profiles_guard();

alter table public.profiles enable row level security;
drop policy if exists "profils lisibles" on public.profiles;
create policy "profils lisibles" on public.profiles for select
  using (id = auth.uid() or public.is_admin() or (status = 'active' and public.is_active()));
drop policy if exists "creer son profil" on public.profiles;
create policy "creer son profil" on public.profiles for insert
  with check (id = auth.uid());
drop policy if exists "modifier son profil" on public.profiles;
create policy "modifier son profil" on public.profiles for update
  using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
drop policy if exists "supprimer son profil" on public.profiles;
create policy "supprimer son profil" on public.profiles for delete
  using (id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- 3. Notifications
-- ---------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null default 'info',
  text text not null,
  link text default '',
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications(user_id, created_at desc);
alter table public.notifications enable row level security;
drop policy if exists "mes notifications" on public.notifications;
create policy "mes notifications" on public.notifications for select using (user_id = auth.uid());
drop policy if exists "lire mes notifications" on public.notifications;
create policy "lire mes notifications" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "effacer mes notifications" on public.notifications;
create policy "effacer mes notifications" on public.notifications for delete using (user_id = auth.uid());

create or replace function public.notify(p_user uuid, p_kind text, p_text text, p_link text default '')
returns void language sql security definer set search_path = public as $$
  insert into public.notifications(user_id, kind, text, link) values (p_user, p_kind, p_text, coalesce(p_link, ''));
$$;
revoke execute on function public.notify(uuid, text, text, text) from public, anon, authenticated;

create or replace function public.full_name(p uuid) returns text
language sql stable security definer set search_path = public as $$
  select coalesce(prenoms || ' ' || nom, 'Un membre') from public.profiles where id = p;
$$;

-- Notification quand l'admin valide ou refuse une adhésion
create or replace function public.on_profile_status() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status <> old.status then
    if new.status = 'active' then
      perform public.notify(new.id, 'admin', 'Bienvenue ! Votre adhésion à Force Chrétienne a été validée par l''administrateur.');
    elsif new.status = 'refused' then
      perform public.notify(new.id, 'admin', 'Votre adhésion n''a pas pu être validée. Vérifiez votre carte de membre et mettez à jour votre profil.');
    end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_profile_status on public.profiles;
create trigger trg_profile_status after update on public.profiles
for each row execute function public.on_profile_status();

-- ---------------------------------------------------------------------
-- 4. Réseau (mises en relation)
-- ---------------------------------------------------------------------
create table if not exists public.connections (
  id uuid primary key default gen_random_uuid(),
  requester uuid not null references public.profiles(id) on delete cascade,
  addressee uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted')),
  created_at timestamptz not null default now(),
  unique (requester, addressee),
  check (requester <> addressee)
);
alter table public.connections enable row level security;
drop policy if exists "voir mes relations" on public.connections;
create policy "voir mes relations" on public.connections for select using (requester = auth.uid() or addressee = auth.uid());
drop policy if exists "demander une relation" on public.connections;
create policy "demander une relation" on public.connections for insert with check (requester = auth.uid() and status = 'pending' and public.is_active());
drop policy if exists "accepter une relation" on public.connections;
create policy "accepter une relation" on public.connections for update using (addressee = auth.uid()) with check (addressee = auth.uid());
drop policy if exists "retirer une relation" on public.connections;
create policy "retirer une relation" on public.connections for delete using (requester = auth.uid() or addressee = auth.uid());

create or replace function public.on_connection() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    perform public.notify(new.addressee, 'person', public.full_name(new.requester) || ' souhaite rejoindre votre réseau.', 'network');
  elsif new.status = 'accepted' and old.status <> 'accepted' then
    perform public.notify(new.requester, 'person', public.full_name(new.addressee) || ' a accepté votre demande de mise en relation.', 'profile:' || new.addressee);
  end if;
  return new;
end $$;
drop trigger if exists trg_connection on public.connections;
create trigger trg_connection after insert or update on public.connections
for each row execute function public.on_connection();

-- ---------------------------------------------------------------------
-- 5. Fil d'actualité
-- ---------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references public.profiles(id) on delete cascade,
  kind text not null default 'Publication',
  text text not null,
  image_url text default '',
  created_at timestamptz not null default now()
);
create index if not exists posts_created_idx on public.posts(created_at desc);
create table if not exists public.post_likes (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  primary key (post_id, user_id)
);
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.comments enable row level security;
drop policy if exists "lire le fil" on public.posts;
create policy "lire le fil" on public.posts for select using (public.is_active() or public.is_admin());
drop policy if exists "publier" on public.posts;
create policy "publier" on public.posts for insert with check (author = auth.uid() and public.is_active());
drop policy if exists "modifier sa publication" on public.posts;
create policy "modifier sa publication" on public.posts for update using (author = auth.uid()) with check (author = auth.uid());
drop policy if exists "supprimer sa publication" on public.posts;
create policy "supprimer sa publication" on public.posts for delete using (author = auth.uid() or public.is_admin());
drop policy if exists "lire les j'aime" on public.post_likes;
create policy "lire les j'aime" on public.post_likes for select using (public.is_active());
drop policy if exists "aimer" on public.post_likes;
create policy "aimer" on public.post_likes for insert with check (user_id = auth.uid() and public.is_active());
drop policy if exists "ne plus aimer" on public.post_likes;
create policy "ne plus aimer" on public.post_likes for delete using (user_id = auth.uid());
drop policy if exists "lire les commentaires" on public.comments;
create policy "lire les commentaires" on public.comments for select using (public.is_active() or public.is_admin());
drop policy if exists "commenter" on public.comments;
create policy "commenter" on public.comments for insert with check (author = auth.uid() and public.is_active());
drop policy if exists "supprimer son commentaire" on public.comments;
create policy "supprimer son commentaire" on public.comments for delete using (author = auth.uid() or public.is_admin());

create or replace function public.on_comment() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_author uuid;
begin
  select author into v_author from public.posts where id = new.post_id;
  if v_author is not null and v_author <> new.author then
    perform public.notify(v_author, 'comment', public.full_name(new.author) || ' a commenté votre publication.', 'home');
  end if;
  return new;
end $$;
drop trigger if exists trg_comment on public.comments;
create trigger trg_comment after insert on public.comments
for each row execute function public.on_comment();

-- ---------------------------------------------------------------------
-- 6. Messagerie
-- ---------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender uuid not null references public.profiles(id) on delete cascade,
  recipient uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check (sender <> recipient)
);
create index if not exists messages_pair_idx on public.messages(sender, recipient, created_at desc);
create index if not exists messages_recipient_idx on public.messages(recipient, created_at desc);
alter table public.messages enable row level security;
drop policy if exists "mes messages" on public.messages;
create policy "mes messages" on public.messages for select using (sender = auth.uid() or recipient = auth.uid());
drop policy if exists "envoyer un message" on public.messages;
create policy "envoyer un message" on public.messages for insert with check (sender = auth.uid() and public.is_active());
drop policy if exists "marquer comme lu" on public.messages;
create policy "marquer comme lu" on public.messages for update using (recipient = auth.uid()) with check (recipient = auth.uid());

-- ---------------------------------------------------------------------
-- 7. Opportunités : emplois, candidatures, services, affaires
-- ---------------------------------------------------------------------
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  company text not null,
  place text not null,
  contract text not null default 'CDI',
  salary text default 'Selon profil',
  description text not null,
  status text not null default 'pending' check (status in ('pending','online','refused')),
  created_at timestamptz not null default now()
);
alter table public.jobs enable row level security;
drop policy if exists "lire les offres" on public.jobs;
create policy "lire les offres" on public.jobs for select
  using ((status = 'online' and public.is_active()) or author = auth.uid() or public.is_admin());
drop policy if exists "proposer une offre" on public.jobs;
create policy "proposer une offre" on public.jobs for insert with check (author = auth.uid() and public.is_active());
drop policy if exists "modifier une offre" on public.jobs;
create policy "modifier une offre" on public.jobs for update using (author = auth.uid() or public.is_admin()) with check (author = auth.uid() or public.is_admin());
drop policy if exists "supprimer une offre" on public.jobs;
create policy "supprimer une offre" on public.jobs for delete using (author = auth.uid() or public.is_admin());

create or replace function public.jobs_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    if tg_op = 'INSERT' then new.status := 'pending';
    else new.status := case when old.status = 'online' and new.status = 'online' then 'pending' else old.status end; end if;
  end if;
  if tg_op = 'UPDATE' and new.status <> old.status then
    if new.status = 'online' then perform public.notify(new.author, 'job', 'Votre offre « ' || new.title || ' » a été validée et publiée.', 'opps');
    elsif new.status = 'refused' then perform public.notify(new.author, 'job', 'Votre offre « ' || new.title || ' » n''a pas été validée par l''administrateur.', 'opps'); end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_jobs_guard on public.jobs;
create trigger trg_jobs_guard before insert or update on public.jobs
for each row execute function public.jobs_guard();

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  applicant uuid not null references public.profiles(id) on delete cascade,
  message text default '',
  cv_path text default '',
  created_at timestamptz not null default now(),
  unique (job_id, applicant)
);
alter table public.applications enable row level security;
drop policy if exists "voir les candidatures" on public.applications;
create policy "voir les candidatures" on public.applications for select
  using (applicant = auth.uid() or public.is_admin() or exists (select 1 from public.jobs j where j.id = job_id and j.author = auth.uid()));
drop policy if exists "postuler" on public.applications;
create policy "postuler" on public.applications for insert with check (applicant = auth.uid() and public.is_active());

create or replace function public.on_application() returns trigger
language plpgsql security definer set search_path = public as $$
declare j record;
begin
  select author, title into j from public.jobs where id = new.job_id;
  perform public.notify(j.author, 'job', public.full_name(new.applicant) || ' a postulé à votre offre « ' || j.title || ' ».', 'opps');
  return new;
end $$;
drop trigger if exists trg_application on public.applications;
create trigger trg_application after insert on public.applications
for each row execute function public.on_application();

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references public.profiles(id) on delete cascade,
  cat text not null,
  title text not null,
  description text not null,
  zone text default 'À préciser',
  price text default 'Sur devis',
  created_at timestamptz not null default now()
);
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references public.profiles(id) on delete cascade,
  cat text not null default 'Immobilier',
  title text not null,
  price text default 'Prix à débattre',
  place text not null,
  photo_url text default '',
  created_at timestamptz not null default now()
);
alter table public.services enable row level security;
alter table public.deals enable row level security;
drop policy if exists "lire les services" on public.services;
create policy "lire les services" on public.services for select using (public.is_active() or public.is_admin());
drop policy if exists "proposer un service" on public.services;
create policy "proposer un service" on public.services for insert with check (author = auth.uid() and public.is_active());
drop policy if exists "gerer son service" on public.services;
create policy "gerer son service" on public.services for update using (author = auth.uid()) with check (author = auth.uid());
drop policy if exists "supprimer un service" on public.services;
create policy "supprimer un service" on public.services for delete using (author = auth.uid() or public.is_admin());
drop policy if exists "lire les affaires" on public.deals;
create policy "lire les affaires" on public.deals for select using (public.is_active() or public.is_admin());
drop policy if exists "publier une affaire" on public.deals;
create policy "publier une affaire" on public.deals for insert with check (author = auth.uid() and public.is_active());
drop policy if exists "gerer son affaire" on public.deals;
create policy "gerer son affaire" on public.deals for update using (author = auth.uid()) with check (author = auth.uid());
drop policy if exists "supprimer une affaire" on public.deals;
create policy "supprimer une affaire" on public.deals for delete using (author = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- 8. JOYAU : boutiques et produits (lisibles par tous, même sans compte)
-- ---------------------------------------------------------------------
create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null unique references public.profiles(id) on delete cascade,
  name text not null,
  whatsapp text not null,
  city text default 'Abidjan',
  description text default '',
  created_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  owner uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  cat text not null,
  price integer not null check (price >= 0),
  description text default '',
  photo_url text not null,
  opt_label text default '',
  opts text[] not null default '{}',
  size_label text default '',
  sizes text[] not null default '{}',
  status text not null default 'online' check (status in ('online','hidden','hidden_admin')),
  views integer not null default 0,
  clicks integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists products_status_idx on public.products(status, created_at desc);
alter table public.shops enable row level security;
alter table public.products enable row level security;
drop policy if exists "boutiques publiques" on public.shops;
create policy "boutiques publiques" on public.shops for select using (true);
drop policy if exists "ouvrir sa boutique" on public.shops;
create policy "ouvrir sa boutique" on public.shops for insert with check (owner = auth.uid() and public.is_active());
drop policy if exists "gerer sa boutique" on public.shops;
create policy "gerer sa boutique" on public.shops for update using (owner = auth.uid()) with check (owner = auth.uid());
drop policy if exists "fermer sa boutique" on public.shops;
create policy "fermer sa boutique" on public.shops for delete using (owner = auth.uid() or public.is_admin());
drop policy if exists "produits publics" on public.products;
create policy "produits publics" on public.products for select using (status = 'online' or owner = auth.uid() or public.is_admin());
drop policy if exists "ajouter un produit" on public.products;
create policy "ajouter un produit" on public.products for insert
  with check (owner = auth.uid() and public.is_active() and exists (select 1 from public.shops s where s.id = shop_id and s.owner = auth.uid()));
drop policy if exists "gerer ses produits" on public.products;
create policy "gerer ses produits" on public.products for update using (owner = auth.uid() or public.is_admin()) with check (owner = auth.uid() or public.is_admin());
drop policy if exists "supprimer un produit" on public.products;
create policy "supprimer un produit" on public.products for delete using (owner = auth.uid() or public.is_admin());

-- Le vendeur ne peut pas annuler un masquage décidé par l'admin, ni gonfler ses compteurs
create or replace function public.products_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if coalesce(current_setting('fc.counter', true), '') = 'on' then return new; end if;
  if not public.is_admin() then
    if tg_op = 'INSERT' then new.status := 'online'; new.views := 0; new.clicks := 0;
    else
      if old.status = 'hidden_admin' or new.status = 'hidden_admin' then new.status := old.status; end if;
      new.views := old.views; new.clicks := old.clicks;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_products_guard on public.products;
create trigger trg_products_guard before insert or update on public.products
for each row execute function public.products_guard();

-- Compteurs de vues et de clics WhatsApp (appelables par tous, y compris sans compte)
create or replace function public.product_view(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform set_config('fc.counter', 'on', true);
  update public.products set views = views + 1 where id = p_id and status = 'online';
  perform set_config('fc.counter', '', true);
end $$;
create or replace function public.product_click(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform set_config('fc.counter', 'on', true);
  update public.products set clicks = clicks + 1 where id = p_id and status = 'online';
  perform set_config('fc.counter', '', true);
end $$;
grant execute on function public.product_view(uuid) to anon, authenticated;
grant execute on function public.product_click(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------
-- 9. Statistiques pour l'espace administrateur
-- ---------------------------------------------------------------------
create or replace function public.admin_stats() returns json
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Réservé aux administrateurs'; end if;
  return json_build_object(
    'members', (select count(*) from public.profiles where status = 'active'),
    'pending', (select count(*) from public.profiles where status = 'pending'),
    'jobs_pending', (select count(*) from public.jobs where status = 'pending'),
    'products', (select count(*) from public.products where status = 'online'),
    'shops', (select count(*) from public.shops)
  );
end $$;
grant execute on function public.admin_stats() to authenticated;

-- Suppression complète de son propre compte (profil + accès)
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'Non connecté'; end if;
  delete from auth.users where id = auth.uid();
end $$;
grant execute on function public.delete_my_account() to authenticated;

-- ---------------------------------------------------------------------
-- 10. Stockage des photos et documents
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit) values
  ('avatars', 'avatars', true, 3145728),
  ('cards', 'cards', false, 6291456),
  ('posts', 'posts', true, 6291456),
  ('products', 'products', true, 6291456),
  ('deals', 'deals', true, 6291456),
  ('cvs', 'cvs', false, 6291456)
on conflict (id) do nothing;

-- Chaque utilisateur range ses fichiers dans un dossier à son identifiant : <id>/fichier.jpg
drop policy if exists "fc lire public" on storage.objects;
create policy "fc lire public" on storage.objects for select
  using (bucket_id in ('avatars','posts','products','deals'));
drop policy if exists "fc deposer ses fichiers" on storage.objects;
create policy "fc deposer ses fichiers" on storage.objects for insert to authenticated
  with check (bucket_id in ('avatars','cards','posts','products','deals','cvs') and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "fc remplacer ses fichiers" on storage.objects;
create policy "fc remplacer ses fichiers" on storage.objects for update to authenticated
  using ((storage.foldername(name))[1] = auth.uid()::text and bucket_id in ('avatars','cards','posts','products','deals','cvs'));
drop policy if exists "fc supprimer ses fichiers" on storage.objects;
create policy "fc supprimer ses fichiers" on storage.objects for delete to authenticated
  using ((storage.foldername(name))[1] = auth.uid()::text and bucket_id in ('avatars','cards','posts','products','deals','cvs'));
drop policy if exists "fc cartes et cv prives" on storage.objects;
create policy "fc cartes et cv prives" on storage.objects for select to authenticated
  using (
    bucket_id in ('cards','cvs') and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_admin()
      or (bucket_id = 'cvs' and exists (
        select 1 from public.applications a join public.jobs j on j.id = a.job_id
        where a.cv_path = storage.objects.name and j.author = auth.uid()))
    )
  );

-- ---------------------------------------------------------------------
-- 11. Temps réel (messages et notifications instantanés)
-- ---------------------------------------------------------------------
do $$ begin
  begin alter publication supabase_realtime add table public.messages; exception when others then null; end;
  begin alter publication supabase_realtime add table public.notifications; exception when others then null; end;
end $$;

-- ---------------------------------------------------------------------
-- 12. Droits d'accès de l'API (la sécurité ligne par ligne reste appliquée)
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on public.products, public.shops to anon;
grant execute on all functions in schema public to anon, authenticated;
revoke execute on function public.notify(uuid, text, text, text) from public, anon, authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;

-- Ajout : verso de la carte de membre (recto/verso en photos, ou un PDF unique dans carte_path)
alter table public.profiles add column if not exists carte_verso_path text default '';

-- Fin. Vérification : la requête suivante doit afficher les deux e-mails administrateurs.
select email as administrateurs from public.admin_emails;
