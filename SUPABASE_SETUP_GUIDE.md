# 🔧 Guide de Configuration Supabase - ShiftPilot

## ✅ Informations du Projet

- **Project Ref**: `fapfeqinsxlamoolavnc`
- **URL Supabase**: `https://fapfeqinsxlamoolavnc.supabase.co`
- **Anon Key**: Configurée dans `.env.local`

## 📝 Étapes pour Obtenir la Connection String

### 1. Accéder au Dashboard Supabase

1. Allez sur https://app.supabase.com
2. Connectez-vous à votre compte
3. Sélectionnez le projet `fapfeqinsxlamoolavnc`

### 2. Obtenir la Connection String

1. Dans le menu latéral, cliquez sur **Settings** (⚙️)
2. Cliquez sur **Database**
3. Faites défiler jusqu'à la section **Connection string**
4. Configurez les options :
   - **Mode**: `Transaction`
   - **Connection pooling**: `Enabled`
   - **Type**: `URI`
5. Copiez la connection string affichée

### 3. Mettre à jour `.env.local`

Ouvrez le fichier `.env.local` et remplacez `[YOUR-PASSWORD]` dans les deux URLs :

#### Pour DATABASE_URL (Connection Pooler)
```env
DATABASE_URL=postgresql://postgres.fapfeqinsxlamoolavnc:[VOTRE-MOT-DE-PASSE]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

**Important** : Si votre mot de passe contient le caractère `@`, remplacez-le par `%40`

Exemple :
- Mot de passe : `MonMotDePasse@123`
- Dans l'URL : `MonMotDePasse%40123`

#### Pour DIRECT_URL (Connexion Directe)
```env
DIRECT_URL=postgresql://postgres:[VOTRE-MOT-DE-PASSE]@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres?sslmode=require
```

**Important** : Encore une fois, encodez le `@` en `%40` si présent dans le mot de passe.

### 4. Vérifier la Région

Si votre projet Supabase n'est pas dans la région `eu-central-1`, vous devez mettre à jour l'URL du pooler :

1. Dans Supabase Dashboard > Settings > Database
2. Regardez la section **Connection info**
3. Notez la région (ex: `us-east-1`, `ap-southeast-1`, etc.)
4. Remplacez `eu-central-1` dans `DATABASE_URL` par votre région

Exemple pour `us-east-1` :
```env
DATABASE_URL=postgresql://postgres.fapfeqinsxlamoolavnc:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

### 5. Tester la Connexion

Après avoir mis à jour `.env.local`, testez la connexion :

```bash
# Générer le client Prisma
npm run db:generate

# Tester la connexion (optionnel)
npx tsx test-db-connection.ts
```

### 6. Pousser le Schéma vers Supabase

Une fois la connexion testée avec succès :

```bash
# Option 1: Push direct (recommandé pour le développement)
npm run db:push

# Option 2: Créer une migration (recommandé pour la production)
npm run db:migrate
```

## ⚠️ Dépannage

### Erreur "Tenant or user not found"
- Vérifiez que le project ref est correct : `fapfeqinsxlamoolavnc`
- Vérifiez que le projet est actif dans Supabase Dashboard

### Erreur "Can't reach database server"
- Vérifiez que le projet n'est pas en pause (tier gratuit)
- Vérifiez les restrictions réseau dans Settings > Database > Network Restrictions
- Essayez d'utiliser le connection pooler (port 6543) au lieu de la connexion directe (port 5432)

### Erreur de mot de passe
- Assurez-vous que le `@` est encodé en `%40`
- Vérifiez que le mot de passe est correct dans Supabase Dashboard > Settings > Database

### Erreur SSL
- Les URLs incluent déjà `?sslmode=require`
- Si le problème persiste, essayez `?sslmode=prefer` au lieu de `require`

## 🔗 Liens Utiles

- [Dashboard Supabase](https://app.supabase.com/project/fapfeqinsxlamoolavnc)
- [Documentation Supabase](https://supabase.com/docs)
- [Prisma + Supabase](https://supabase.com/docs/guides/integrations/prisma)

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Supabase Dashboard > Logs
2. Vérifiez que votre connexion internet fonctionne
3. Contactez le support Supabase si nécessaire

