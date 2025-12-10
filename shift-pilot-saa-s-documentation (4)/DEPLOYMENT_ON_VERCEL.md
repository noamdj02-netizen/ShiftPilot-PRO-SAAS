# Déploiement sur Vercel — instructions rapides

Ce document décrit les étapes et variables d'environnement nécessaires pour déployer cette application Next.js sur Vercel.

1) Root Directory
- Le code de l'application se trouve dans le dossier `shift-pilot-saa-socumentation (4)`.
- Sur Vercel, dans les paramètres du projet, définissez **Root Directory** sur `shift-pilot-saa-socumentation (4)`.
- Remarque recommandée : renommez le dossier pour enlever les espaces et parenthèses (par ex. `shift-pilot-saas`) pour éviter problèmes d'URL/paths.

2) Détection du package manager / Node
- Le projet utilise `pnpm`. J'ai ajouté `packageManager` dans `package.json` (`pnpm@8.8.0`) et `engines.node` pour indiquer Node >=18.16.0.
- Vercel détectera `pnpm` automatiquement si `pnpm-lock.yaml` et `packageManager` sont présents.

3) Commandes de build (config Vercel)
- Install command: `pnpm install --frozen-lockfile` (ou `pnpm install --no-frozen-lockfile` si vous n'utilisez pas un lockfile figé dans CI)
- Build command: `pnpm build`
- Output Directory: `.next`

4) Variables d'environnement (doivent être définies dans Vercel)
Voici une liste non exhaustive — vérifiez `ENV_EXAMPLE.md` et les fichiers `DATABASE_CONNECTION.md` / `SUPABASE_SETUP.md` pour détails :

- `DATABASE_URL` (Prisma / Postgres)
- `DIRECT_URL` (optionnel selon configuration)
- `NEXTAUTH_URL` (ex: `https://your-domain.vercel.app`)
- `NEXTAUTH_SECRET`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` pour client)
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `RESEND_API_KEY` (si utilisé pour envois d'emails)
- SMTP settings: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` (si Nodemailer)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` (si Twilio utilisé)
- `DATABASE_SHADOW_URL` or other Prisma-related envs if you run migrations in CI

Sécurité : marquez les clés sensibles comme `Secret` dans Vercel et ne les exposez pas côté client (préfixez `NEXT_PUBLIC_` seulement pour les clés destinées au client).

5) Notes sur Prisma et la build
- Evitez d'appeler `prisma.$connect()` au niveau du module lors de la build. Les imports qui tentent de se connecter à la DB au build-time causent des erreurs sur Vercel.
- Si vous utilisez `prisma generate` en CI, assurez-vous que `prisma` est présent et que `DATABASE_URL` est configurée.

6) Lint / Types
- La configuration ESLint a été migrée vers `eslint.config.js` (flat config). Les vérifications TypeScript et ESLint sont activées pendant la build.
- Si vous souhaitez bypasser temporairement ces vérifications sur Vercel, modifiez `next.config.mjs` (`eslint.ignoreDuringBuilds` ou `typescript.ignoreBuildErrors`) — mais cela masque les erreurs réelles. Ne pas recommander pour production.

7) Tests locaux rapides
```bash
cd "shift-pilot-saa-socumentation (4)"
corepack enable
corepack prepare pnpm@8.8.0 --activate
pnpm install
pnpm build
```

8) Problèmes connus
- Dossier racine du projet contient des espaces et parenthèses — renommez-le si possible.
- Vérifiez que toutes les variables d'environnement nécessaires (Prisma, Supabase, NextAuth) sont renseignées avant d'exécuter `pnpm build` en CI.

Si vous voulez, je peux générer un checklist prêt à coller dans la description de la PR pour faciliter la revue et le déploiement.
