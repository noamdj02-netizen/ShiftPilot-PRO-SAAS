# 🔧 Dépannage Connexion Supabase

## ✅ Configuration Actuelle

### Connection String Configurée
```
postgresql://postgres:Noamdj20051414%40@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres
```

### Variables Supabase
- **URL**: `https://otuybbxfzjeuxppfihvv.supabase.co`
- **Project Ref**: `otuybbxfzjeuxppfihvv`
- **Database Host**: `db.fapfeqinsxlamoolavnc.supabase.co`

## ❌ Problème : Connexion Impossible

Si `pnpm prisma db push` échoue avec l'erreur `P1001: Can't reach database server`, voici les solutions :

## 🔍 Solutions à Tester

### Solution 1 : Vérifier les Settings Supabase

1. Allez sur https://app.supabase.com/project/otuybbxfzjeuxppfihvv
2. **Settings** > **Database**
3. Vérifiez :
   - ✅ Le projet est **actif**
   - ✅ **Connection pooling** est activé
   - ✅ Aucune restriction IP n'est configurée

### Solution 2 : Utiliser le Connection Pooler (Port 6543)

Le port 5432 direct peut être bloqué. Utilisez le pooler :

**Mettez à jour `.env.local`** :
```env
DATABASE_URL=postgresql://postgres.otuybbxfzjeuxppfihvv:Noamdj20051414%40@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Note** : Remplacez `eu-central-1` par votre région Supabase (trouvable dans Settings > Database).

### Solution 3 : Vérifier le Mot de Passe

Le mot de passe `Noamdj20051414@` doit être encodé :
- `@` → `%40`
- Donc : `Noamdj20051414%40`

### Solution 4 : Tester avec psql (si installé)

```bash
psql "postgresql://postgres:Noamdj20051414%40@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres"
```

Si psql fonctionne mais Prisma non, c'est un problème de configuration Prisma.

### Solution 5 : Vérifier le Firewall

- Vérifiez que le port 5432 n'est pas bloqué par votre firewall Windows
- Vérifiez dans Supabase Settings > Database > Network Restrictions

### Solution 6 : Utiliser Supabase CLI

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref otuybbxfzjeuxppfihvv

# Pousser le schéma
supabase db push
```

## 📋 Checklist de Vérification

- [ ] Le projet Supabase est actif
- [ ] Le mot de passe est correct (`Noamdj20051414@`)
- [ ] Le `@` est encodé en `%40` dans l'URL
- [ ] Connection pooling est activé dans Supabase
- [ ] Aucune restriction IP dans Supabase Settings
- [ ] Le firewall Windows n'bloque pas le port 5432
- [ ] Le fichier `.env.local` est bien lu par Prisma

## 🚀 Alternative : Créer les Tables Manuellement

Si la connexion Prisma ne fonctionne pas, vous pouvez :

1. **Utiliser Supabase Dashboard** :
   - Allez sur https://app.supabase.com/project/otuybbxfzjeuxppfihvv
   - **SQL Editor** > Créer les tables manuellement

2. **Utiliser Supabase CLI** :
   ```bash
   supabase db push
   ```

## 📞 Support

Si le problème persiste :
- Vérifiez les logs Supabase : Dashboard > Logs
- Contactez le support Supabase
- Vérifiez votre connexion internet

## 🔗 Liens Utiles

- [Dashboard Supabase](https://app.supabase.com/project/otuybbxfzjeuxppfihvv)
- [Documentation Supabase](https://supabase.com/docs)
- [Prisma + Supabase](https://supabase.com/docs/guides/integrations/prisma)

