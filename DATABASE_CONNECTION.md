# 🔌 Configuration de la Connexion Supabase

## ✅ Connection String Configurée

Votre connection string PostgreSQL Supabase :
```
postgresql://postgres:Noamdj20051414@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres
```

**Important** : Le caractère `@` dans le mot de passe doit être encodé en `%40` dans l'URL.

## 📝 Fichier .env.local

Votre fichier `.env.local` devrait contenir :

```env
# Database - Supabase PostgreSQL
DATABASE_URL=postgresql://postgres:Noamdj20051414%40@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY

# NextAuth
NEXTAUTH_SECRET=change-this-to-a-random-secret-min-32-chars-in-production
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## 🚀 Commandes à Exécuter

### 1. Vérifier la connexion
```bash
pnpm prisma validate
```

### 2. Générer le client Prisma
```bash
pnpm db:generate
```

### 3. Pousser le schéma vers Supabase
```bash
pnpm prisma db push
```

**OU** créer une migration :
```bash
pnpm prisma migrate dev --name init
```

## ⚠️ Dépannage

### Si la connexion échoue :

1. **Vérifier que Supabase est accessible** :
   - Allez sur https://app.supabase.com
   - Vérifiez que votre projet est actif

2. **Vérifier le mot de passe** :
   - Le `@` doit être encodé en `%40`
   - Exemple : `Noamdj20051414@` → `Noamdj20051414%40`

3. **Tester avec psql** (si installé) :
   ```bash
   psql "postgresql://postgres:Noamdj20051414%40@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres"
   ```

4. **Vérifier le firewall** :
   - Assurez-vous que le port 5432 n'est pas bloqué
   - Supabase peut nécessiter une IP autorisée (vérifiez dans les settings)

5. **Utiliser le Connection Pooler** :
   - Port 6543 au lieu de 5432
   - URL : `postgresql://postgres.otuybbxfzjeuxppfihvv:Noamdj20051414%40@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

## 📚 Ressources

- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma + Supabase](https://supabase.com/docs/guides/integrations/prisma)

