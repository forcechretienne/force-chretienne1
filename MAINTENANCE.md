# Force Chrétienne + Joyau — notes de maintenance (ZEMA Technologies)

Application web mobile (PWA) : Force Chrétienne (réseau social des professionnels chrétiens) avec Joyau (marketplace) intégré.

## En ligne
- Site : https://force-chretienne.vercel.app (Vercel, projet `force-chretienne`, déploiement automatique à chaque commit sur `main`, preset « Other », sans compilation)
- Base : Supabase, projet `clfipjzoyuemaonphjmm` (URL et clé publique dans `config.js`)
- Administrateurs : direction@zematechnologies.com, forcechretienne@proton.me (table `admin_emails`)

## Joyau en application séparée
- Lien direct : https://force-chretienne.vercel.app/joyau (page `joyau.html`, réécriture dans `vercel.json`), installable à part (manifeste `manifest-joyau.webmanifest`, icônes `joyau-*.png`). Le code est le même que l'application : `window.FC_MODE = "joyau"` active le mode boutique seule.
- Liens de partage : produit `/joyau?p=<id>`, boutique `/joyau?s=<id>` (fonctionnent aussi avec `/?p=` dans Force Chrétienne).

## Notifications sur téléphone (Web Push)
- Fonction Supabase `push` (source : `supabase_push_function.ts`, vérification JWT désactivée, elle ne traite que les éléments réels de la file).
- Tables `push_subscriptions` (appareils), `push_queue` (file d'envoi), `push_secrets` (clés VAPID créées automatiquement au premier appel). Déclencheurs : notifications, messages, j'aime, demandes à valider pour les admins.
- Liens d'ouverture : `/?open=notifs|admin|network|home|opps|chat:<id>|profile:<id>`.

## Joyau ouvert à tous (vendeurs)
- N'importe qui peut créer un compte vendeur Joyau (bouton « Vendre ») sans adhérer à Force Chrétienne : profiles.account_type = 'seller'.
- Chaque nouvelle boutique est « en attente » (shops.status = pending) : l'administrateur la valide une seule fois (Espace admin → Boutiques). Ensuite chaque produit est publié instantanément.
- Badge « Membre vérifié Force Chrétienne » (shops.verified) si le propriétaire est membre validé ; sinon « Vendeur Joyau ».
- Bouton « Signaler » sur les annonces et boutiques (table reports) ; l'admin peut suspendre une boutique.
- Un vendeur peut demander à rejoindre Force Chrétienne depuis sa boutique (carte de membre, validation admin).

## Fichiers
- **Sources à modifier** : `src__core.js` (socle, cache, icônes, composants), `src__auth.js` (comptes, inscription, adhésion), `src__social.js` (fil, réseau, profils, messagerie, notifications), `src__opps.js` (emplois, services, affaires), `src__joyau.js` (marketplace, boutiques), `src__main.js` (profil, admin, navigation, installation), `src__app.css` (styles), `tpl__index.html`, `tpl__joyau.html`, `tpl__sw.js`, `img__*.svg` (illustrations).
- **Fichiers générés** (ne pas modifier à la main) : `app.js`, `app.css`, `index.html`, `joyau.html`, `sw.js` → produits par `python3 build.py`.
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
