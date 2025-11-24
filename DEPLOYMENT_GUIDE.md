# 🚀 Guide de Déploiement Complet - ShiftPilot SaaS

## 📋 Vue d'ensemble

Ce document décrit le processus de déploiement complet du SaaS ShiftPilot avec la stack Next.js 15+, Prisma, et PostgreSQL.

## 🏗️ Architecture de Déploiement

```
┌─────────────────┐
│   Next.js App   │ (Vercel/Railway/Netlify)
│   (Frontend +   │
│   API Routes)   │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
┌────────▼────────┐  ┌─────▼──────┐
│   PostgreSQL    │  │  Stripe    │
│   (Database)    │  │  (Billing) │
└─────────────────┘  └────────────┘
         │
         │
┌────────▼────────┐
│   Resend        │
│   (Emails)      │
└─────────────────┘
```

## 📦 Prérequis

- Node.js 20+
- PostgreSQL 15+
- Compte Vercel (recommandé) ou Railway/Netlify
- Comptes pour services tiers :
  - Stripe (paiements)
  - Resend (emails)
  - Twilio (SMS, optionnel)

## 🔧 Configuration Initiale

### 1. Variables d'Environnement

Créez un fichier `.env.local` à la racine :

```env
# Application
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-key-here-min-32-chars

# Database
DATABASE_URL=postgresql://user:password@host:5432/shiftpilot?schema=public

# NextAuth
NEXTAUTH_URL=https://your-domain.com

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=ShiftPilot <noreply@your-domain.com>

# SMS (Twilio - Optionnel)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890

# OAuth (Optionnel)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...

# Push Notifications (VAPID)
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
```

### 2. Génération des Clés

#### NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

#### VAPID Keys (pour notifications push)
```bash
npm install -g web-push
web-push generate-vapid-keys
```

## 🗄️ Base de Données

### 1. Créer la Base de Données PostgreSQL

```bash
# Local
createdb shiftpilot

# Ou via psql
psql -U postgres
CREATE DATABASE shiftpilot;
```

### 2. Initialiser Prisma

```bash
# Générer le client Prisma
pnpm db:generate

# Appliquer les migrations
pnpm db:migrate

# Ou push le schéma (développement uniquement)
pnpm db:push
```

### 3. Seed la Base de Données (Optionnel)

Créez un script de seed dans `prisma/seed.ts` :

```typescript
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Créer une organisation de test
  const org = await prisma.organization.create({
    data: {
      name: "Demo Restaurant",
      slug: "demo-restaurant",
      email: "demo@restaurant.com",
      settings: {
        create: {
          defaultWeeklyHours: 35,
          maxDailyHours: 8,
          minRestBetweenShifts: 11,
        },
      },
    },
  })

  // Créer un utilisateur admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@demo.com",
      password: await bcrypt.hash("Admin1234!", 10),
      role: "ADMIN",
      organizationId: org.id,
      status: "ACTIVE",
    },
  })

  console.log("Seed completed:", { org, admin })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Exécutez le seed :
```bash
pnpm tsx prisma/seed.ts
```

## 🚀 Déploiement

### Option 1: Vercel (Recommandé)

1. **Installer Vercel CLI**
```bash
npm i -g vercel
```

2. **Déployer**
```bash
vercel
```

3. **Configurer les Variables d'Environnement**
   - Allez sur le dashboard Vercel
   - Projet → Settings → Environment Variables
   - Ajoutez toutes les variables de `.env.local`

4. **Configurer PostgreSQL**
   - Utilisez Vercel Postgres ou connectez une base externe
   - Ajoutez `DATABASE_URL` dans les variables d'environnement

5. **Déployer en Production**
```bash
vercel --prod
```

### Option 2: Railway

1. **Créer un compte Railway**
2. **Connecter le repository GitHub**
3. **Ajouter PostgreSQL**
   - Railway → New → Database → PostgreSQL
4. **Configurer les Variables d'Environnement**
   - Railway → Variables
5. **Déployer automatiquement**

### Option 3: Docker (Self-hosted)

Créez un `Dockerfile` :

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm db:generate
RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Déployez avec Docker Compose :

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/shiftpilot
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=shiftpilot
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔐 Sécurité en Production

### 1. HTTPS
- Vercel/Railway/Netlify fournissent HTTPS automatiquement
- Pour self-hosted, configurez un reverse proxy (Nginx) avec Let's Encrypt

### 2. Headers de Sécurité

Ajoutez dans `next.config.mjs` :

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### 3. Rate Limiting

Installez `@upstash/ratelimit` pour limiter les requêtes API.

## 📊 Monitoring

### 1. Vercel Analytics
Déjà intégré via `@vercel/analytics`.

### 2. Sentry (Optionnel)
```bash
pnpm add @sentry/nextjs
```

### 3. Logs
- Vercel : Dashboard → Logs
- Railway : Dashboard → Logs
- Self-hosted : Configurez un service de logging (Datadog, LogRocket)

## ✅ Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Base de données PostgreSQL créée et migrée
- [ ] NEXTAUTH_SECRET généré (32+ caractères)
- [ ] VAPID keys générées pour notifications push
- [ ] Stripe configuré (clés de production)
- [ ] Resend configuré (API key)
- [ ] Domaine configuré (si applicable)
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] Tests E2E passent
- [ ] Monitoring configuré
- [ ] Backup de base de données configuré
- [ ] Documentation utilisateur créée

## 🔄 Migrations et Mises à Jour

### Appliquer de nouvelles migrations
```bash
pnpm db:migrate
```

### En production
```bash
# Vercel : automatique lors du déploiement
# Railway : automatique
# Self-hosted : 
pnpm db:migrate deploy
```

## 🆘 Dépannage

### Erreur de connexion à la base de données
- Vérifiez `DATABASE_URL`
- Vérifiez les firewall rules
- Testez la connexion : `psql $DATABASE_URL`

### Erreur NextAuth
- Vérifiez `NEXTAUTH_SECRET` (32+ caractères)
- Vérifiez `NEXTAUTH_URL` (doit correspondre au domaine)

### Erreurs de build
- Vérifiez les types TypeScript : `pnpm type-check`
- Vérifiez les imports manquants
- Vérifiez les variables d'environnement requises

## 📞 Support

Pour toute question de déploiement :
- Documentation : `/docs`
- Issues GitHub : `/issues`
- Email : support@shiftpilot.com

---

**Dernière mise à jour** : {new Date().toLocaleDateString("fr-FR")}

