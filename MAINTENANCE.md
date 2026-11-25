# Force Chrétienne + Joyau — notes de maintenance (ZEMA Technologies)

Application web mobile (PWA) : Force Chrétienne (réseau social des professionnels chrétiens) avec Joyau (marketplace) intégré.

## En ligne
- Site : https://force-chretienne.vercel.app (Vercel, projet `force-chretienne`, déploiement automatique à chaque commit sur `main`, preset « Other », sans compilation)
- Base : Supabase, projet `clfipjzoyuemaonphjmm` (URL et clé publique dans `config.js`)
- Administrateurs : direction@zematechnologies.com, forcechretienne@proton.me (table `admin_emails`)

## Fichiers
- **Sources à modifier** : `src__core.js` (socle, cache, icônes, composants), `src__auth.js` (comptes, inscription, adhésion), `src__social.js` (fil, réseau, profils, messagerie, notifications), `src__opps.js` (emplois, services, affaires), `src__joyau.js` (marketplace, boutiques), `src__main.js` (profil, admin, navigation, installation), `src__app.css` (styles), `tpl__index.html`, `tpl__sw.js`, `img__*.svg` (illustrations).
- **Fichiers générés** (ne pas modifier à la main) : `app.js`, `app.css`, `index.html`, `sw.js` → produits par `python3 build.py`.
- **Fixes** : `config.js`, `manifest.webmanifest`, icônes PNG, bibliothèques `preact.umd.js`, `hooks.umd.js`, `htm.umd.js`, `supabase.js` (supabase-js 2.117.0).
- `schema.sql` : structure complète de la base (rejouable sans perte de données). Toute modification de la base doit aussi y être ajoutée.
- `test__mock.js` : faux client Supabase pour tester l'interface hors ligne.

## Technique
Preact 10.19.3 + htm 3.1.1 (sans compilation), Supabase (auth e-mail + mot de passe, RLS, Storage : avatars, cards (privé), posts, products, deals, cvs (privé), Realtime sur messages et notifications).
Couleurs : Force Chrétienne = blanc, gris anthracite #23262D, or brillant ; Joyau = bleu roi #1F3FC4 / #1D4ED8, rouge #D62839, jaune #FFC93C.

## Procédure de mise à jour
1. Modifier les sources, puis `python3 build.py`.
2. Déposer les fichiers modifiés sur GitHub (Add file → Upload files → Commit) : Vercel publie automatiquement.
3. Si la base change : exécuter le SQL dans Supabase (SQL Editor) et l'ajouter à `schema.sql`.

## À faire avant le lancement public
- Réactiver « Confirm email » (Supabase → Authentication → Sign In / Providers) après avoir branché un SMTP (OVH ou Resend).
- Brancher le nom de domaine (Vercel → Domains) et mettre à jour Site URL / Redirect URLs dans Supabase.
- Passer Supabase en plan Pro au lancement (le plan gratuit se met en pause après une semaine d'inactivité).
