# ✅ Configuration Supabase - ShiftPilot

## 📋 Informations de Configuration

### URL Supabase
```
https://otuybbxfzjeuxppfihvv.supabase.co
```

### Clé Anon (Publique)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY
```

### Project Reference
```
otuybbxfzjeuxppfihvv
```

## 🔧 Fichiers Créés

### 1. Client Supabase (Browser)
**Fichier**: `src/lib/supabase/client.ts`
- Utilisé pour les composants client (Client Components)
- Utilise `createBrowserClient` de `@supabase/ssr`

### 2. Client Supabase (Server)
**Fichier**: `src/lib/supabase/server.ts`
- Utilisé pour les Server Components et API Routes
- Utilise `createServerClient` de `@supabase/ssr`
- Gère les cookies automatiquement

## 📝 Variables d'Environnement

Votre fichier `.env.local` devrait contenir :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY

# Database - Supabase PostgreSQL
# IMPORTANT: Obtenez cette URL depuis Supabase Dashboard > Settings > Database
DATABASE_URL=postgresql://postgres.otuybbxfzjeuxppfihvv:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# NextAuth
NEXTAUTH_SECRET=change-this-to-a-random-secret-min-32-chars-in-production
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## 🚀 Utilisation

### Dans un Client Component
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  // Utiliser supabase...
}
```

### Dans un Server Component ou API Route
```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MyServerComponent() {
  const supabase = await createClient()
  
  // Utiliser supabase...
}
```

## ⚠️ Action Requise

Pour que Prisma fonctionne avec Supabase, vous devez :

1. **Obtenir la Connection String PostgreSQL** :
   - Allez sur https://app.supabase.com
   - Projet : `otuybbxfzjeuxppfihvv`
   - Settings > Database > Connection string
   - Mode: **Transaction**
   - Connection pooling: **Enabled**
   - Type: **URI**
   - Copiez la connection string

2. **Mettre à jour DATABASE_URL** dans `.env.local`

3. **Exécuter les migrations** :
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

## 📦 Packages Installés

- `@supabase/ssr` - Pour Next.js App Router
- `@supabase/supabase-js` - Client Supabase

## 🔗 Liens Utiles

- [Dashboard Supabase](https://app.supabase.com/project/otuybbxfzjeuxppfihvv)
- [Documentation Supabase](https://supabase.com/docs)
- [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

