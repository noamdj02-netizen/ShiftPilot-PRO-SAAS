# Checklist de déploiement & procédure de rollback

Utilisez cette checklist avant, pendant et après un déploiement sur Vercel.

## Avant le déploiement
- [ ] Branch prête et review approuvée (branche: `chore/lint-and-cleanup` ou `main` selon workflow)
- [ ] Tous les tests unitaires et e2e passent localement / CI
- [ ] `pnpm build` passe localement
- [ ] Mettre à jour la description de la PR avec les étapes de migration et changements importants
- [ ] Vérifier la présence du `pnpm-lock.yaml` et du champ `packageManager` dans `package.json`

## Variables d'environnement (Vercel)
Définir dans Vercel > Settings > Environment Variables:
- `DATABASE_URL` (production)
- `NEXTAUTH_URL` (ex: `https://votre-domaine.vercel.app`)
- `NEXTAUTH_SECRET`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` (si utilisé)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` (si envois mail)
- `RESEND_API_KEY` (si utilisé)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` (si Twilio)

Marquer les clés sensibles comme `Secret`. Ne pas exposer de variables non sécurisées côté client.

## Paramètres Vercel
- Root Directory: `shift-pilot-saa-socumentation (4)` (ou renommer dossier pour enlever espaces/parenthèses)
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build`
- Output Directory: `.next`
- Framework Preset: `Next.js` (détection automatique si nécessaire)

## Déploiement (exécution)
1. Lancer le déploiement depuis la PR ou merger sur `main` selon votre workflow.
2. Surveiller la build logs dans Vercel (onglet Deployments) pour erreurs build / types / eslint.
3. Attendre fin du processus et vérifier que le déploiement passe en `Ready`.

## Post-déploiement — vérifications rapides (smoke tests)
- [ ] Accéder au site public (racine) et vérifier page d'accueil / 200
- [ ] Tester connexion / login (si accessible) avec un compte de test
- [ ] Vérifier logs d'erreurs récentes dans Vercel
- [ ] Vérifier monitoring / alerting (Sentry, LogDrains, ou similar) si configuré
- [ ] Vérifier envoi d'emails (si fonctionnalité critique) depuis une action test

## Rollback — options rapides
- Option A — Redeploy previous successful deployment:
  1. Ouvrir Vercel > Deployments pour le projet
  2. Repérer le dernier déploiement stable (status `Ready`) et cliquer `Redeploy` ou `Promote`

- Option B — Revert PR / Merge:
  1. Revenir sur GitHub et revert le commit / merge (bouton `Revert`) pour créer une PR inverse
  2. Merge le revert PR sur `main` puis déployer

- Option C — Restaurer configuration / secrets:
  1. Si l'erreur provient d'une variable incorrecte, corriger la variable dans Vercel
  2. Redeploy ou redeploy du commit courant

## Si le rollback échoue
- Télécharger les logs d'erreur depuis Vercel (Build & Server) et rechercher stack traces
- Vérifier que les secrets (DATABASE_URL, etc.) sont corrects et que la DB est accessible
- Si problème de migration Prisma, vérifier que `prisma migrate` a été exécuté dans un environnement contrôlé
- En dernier recours : restaurer un snapshot/backup de la DB (procédure dépend de votre provider)

## Notes opérationnelles
- Ne pas exécuter de migrations destructrices directement depuis Vercel sans sauvegarde préalable.
- Pour les modifications de schéma de base de données : exécuter les migrations dans un environnement de staging, valider, puis appliquer en production.
- Conserver une checklist de smoke tests actualisée selon nouvelles fonctionnalités.
