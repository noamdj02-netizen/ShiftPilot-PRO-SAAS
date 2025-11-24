# 🔧 Configuration Supabase pour ShiftPilot

## 📋 Étapes pour configurer Supabase

### 1. Obtenir la Connection String PostgreSQL

1. Allez sur votre [Dashboard Supabase](https://app.supabase.com)
2. Sélectionnez votre projet : `otuybbxfzjeuxppfihvv`
3. Allez dans **Settings** > **Database**
4. Dans la section **Connection string**, sélectionnez :
   - **Mode**: Transaction
   - **Connection pooling**: Enabled
   - **Type**: URI
5. Copiez la connection string (elle ressemble à) :
   ```
   postgresql://postgres.otuybbxfzjeuxppfihvv:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### 2. Mettre à jour .env.local

Remplacez `[YOUR-PASSWORD]` dans `DATABASE_URL` par votre mot de passe Supabase.

**Exemple complet :**
```env
DATABASE_URL=postgresql://postgres.otuybbxfzjeuxppfihvv:VotreMotDePasse@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 3. Alternative : Connection String Directe (sans pooling)

Si vous préférez une connection directe (pour les migrations) :
```
postgresql://postgres.otuybbxfzjeuxppfihvv:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
```

**Note**: Utilisez le port `5432` pour les migrations, et `6543` pour les connections avec pooling.

### 4. Variables d'environnement complètes

Votre `.env.local` devrait contenir :

```env
# Database - Supabase PostgreSQL
DATABASE_URL=postgresql://postgres.otuybbxfzjeuxppfihvv:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY

# NextAuth
NEXTAUTH_SECRET=change-this-to-a-random-secret-min-32-chars-in-production
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### 5. Exécuter les migrations

Une fois la `DATABASE_URL` correctement configurée :

```bash
# Générer le client Prisma
pnpm db:generate

# Appliquer les migrations
pnpm db:migrate
```

### 6. Vérifier la connection

```bash
# Valider le schéma
pnpm prisma validate

# Ouvrir Prisma Studio (optionnel)
pnpm db:studio
```

## 🔐 Sécurité

⚠️ **Important** :
- Ne commitez **JAMAIS** votre `.env.local` dans Git
- Le fichier `.env.local` est déjà dans `.gitignore`
- Pour la production, utilisez les variables d'environnement de votre plateforme (Vercel, Railway, etc.)

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Connection Pooling Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma + Supabase](https://supabase.com/docs/guides/integrations/prisma)

