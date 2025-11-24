# 🧹 RAPPORT D'AUDIT NETTOYAGE - ShiftPilot SaaS

**Date:** $(date)  
**Objectif:** Identifier tous les éléments à nettoyer sans casser la fonctionnalité

---

## 📋 RÉSUMÉ EXÉCUTIF

### ✅ Éléments identifiés à nettoyer:
- **Fichiers orphelins/dupliqués:** 1 fichier + 1 dossier entier (`src/`)
- **Console.log/error en production:** ~142 occurrences (à filtrer)
- **Fichiers de test:** 3 fichiers
- **Imports inutilisés:** À vérifier fichier par fichier
- **Code commenté:** Minimal trouvé

---

## 1️⃣ FICHIERS ORPHELINS/DUPLIQUÉS À SUPPRIMER

### ❌ Fichiers non référencés:

#### `app/dashboard/page-new.tsx`
- **Statut:** ❌ ORPHELIN
- **Raison:** Aucune référence trouvée dans le codebase
- **Contenu:** Version alternative du dashboard utilisant mock data
- **Action:** ✅ SUPPRIMER

#### Dossier `src/` (entier)
- **Statut:** ❌ DOUBLON COMPLET
- **Structure:**
  ```
  src/
  ├── app/
  │   ├── api/ (routes dupliquées)
  │   └── dashboard/page.tsx (non utilisé)
  ├── components/
  │   └── dashboard/ (composants non utilisés)
  └── lib/ (dupliqués)
  ```
- **Raison:** 
  - `src/app/dashboard/page.tsx` n'est pas utilisé (le vrai est `app/dashboard/page.tsx`)
  - Les composants dans `src/components/dashboard/` ne sont utilisés que par `src/app/dashboard/page.tsx`
  - Les routes API dans `src/app/api/` ne sont pas référencées
- **Action:** ✅ SUPPRIMER TOUT LE DOSSIER `src/`

### ⚠️ Fichiers de test (à garder ou supprimer selon usage):

#### `test-db-connection.ts`
- **Statut:** ⚠️ SCRIPT DE TEST
- **Usage:** `npx tsx test-db-connection.ts`
- **Action:** ⚠️ À DÉCIDER (garder si utile pour debug, sinon supprimer)

#### `test-connection.ps1`
- **Statut:** ⚠️ SCRIPT DE TEST
- **Action:** ⚠️ À DÉCIDER

#### `test-supabase-connection.ps1`
- **Statut:** ⚠️ SCRIPT DE TEST
- **Action:** ⚠️ À DÉCIDER

---

## 2️⃣ CONSOLE.LOG/CONSOLE.ERROR À NETTOYER

### 📊 Statistiques:
- **Total occurrences:** ~142
- **À garder (légitimes):** ~30-40
- **À supprimer (production):** ~100-110

### ✅ À GARDER (légitimes):

#### Scripts de développement:
- `scripts/init-test-users.ts` - Tous les console.log (légitimes pour scripts)
- `scripts/create-test-employee.ts` - Tous les console.log
- `test-db-connection.ts` - Tous les console.log (si gardé)

#### Services de logging:
- `lib/services/logger.ts` - Service de logging, TOUT GARDER
  ```typescript
  console.log(`[INFO] ${message}`)
  console.warn(`[WARN] ${message}`)
  console.error(`[ERROR] ${message}`)
  console.debug(`[DEBUG] ${message}`)
  ```

#### Service Worker:
- `public/sw.js` - Logs pour debugging SW (peut garder)
- `components/pwa/service-worker-register.tsx` - Logs SW (peut garder)
- `scripts/register-service-worker.ts` - Logs SW (peut garder)

#### Mode développement (DEV MODE):
- `lib/notifications/sms-service.ts` - `console.log("📱 SMS (DEV MODE):")` - GARDER
- `lib/notifications/email-service.ts` - `console.log("📧 Email (DEV MODE):")` - GARDER

### ❌ À SUPPRIMER (production code):

#### Pages/Composants React:
1. **`app/dashboard/notifications/page.tsx`**
   - Ligne 129: `console.error("Error sending email:", error)`
   - ❌ SUPPRIMER (utiliser logger service)

2. **`app/dashboard/availability/page.tsx`**
   - Ligne 45: `console.error("Error fetching user:", error)`
   - ❌ SUPPRIMER

3. **`app/auth/register/page.tsx`**
   - Ligne 91: `console.error("Register error:", error)`
   - ❌ SUPPRIMER

4. **`app/dashboard/page.tsx`**
   - Ligne 68: `console.error("Error fetching dashboard data:", error)`
   - ❌ SUPPRIMER

5. **`app/dashboard/error.tsx`**
   - Ligne 18: `console.error("Dashboard error:", error)`
   - ⚠️ GARDER (error boundary, utile pour debugging)

6. **`app/dashboard/schedules/templates/page.tsx`**
   - Ligne 45: `console.error("Error fetching templates:", error)`
   - ❌ SUPPRIMER

7. **`app/dashboard/schedule/page.tsx`**
   - Ligne 99: `console.error("Error generating schedule:", error)`
   - Ligne 117: `console.error("Error saving schedule:", error)`
   - ❌ SUPPRIMER

8. **`app/auth/login/page.tsx`**
   - Ligne 55: `console.error("Login error:", err)`
   - ❌ SUPPRIMER

9. **`app/error.tsx`**
   - Ligne 18: `console.error("Application error:", error)`
   - ⚠️ GARDER (error boundary)

10. **`app/register-sw/page.tsx`**
    - Ligne 14: `console.log("[SW] Service Worker registered:", registration)`
    - Ligne 18: `console.error("[SW] Service Worker registration failed:", error)`
    - ⚠️ GARDER (SW debugging)

#### API Routes:
11. **`lib/api-utils.ts`**
    - Ligne 18: `console.error("[API Error]", error)`
    - Ligne 59: `console.log("[API Success]", ...)`
    - ❌ SUPPRIMER (utiliser logger service)

12. **`lib/auth.ts`**
    - Ligne 40: `console.error("Error getting session:", error)`
    - Ligne 50: `console.error("Error getting session:", error)`
    - ❌ SUPPRIMER

13. **`lib/services/webhooks.ts`**
    - Ligne 39: `console.error(\`Webhook error for ${webhook.url}:\`, error)`
    - ❌ SUPPRIMER

14. **`app/api/notifications/email/route.ts`**
    - Ligne 37: `console.error("Error sending email:", error)`
    - ❌ SUPPRIMER

15. **`app/api/auth/login/route.ts`**
    - Ligne 128: `console.log("⚠️  Auto-migration: mot de passe hashé pour", email)`
    - Ligne 226: `console.error("Login error:", error)`
    - ⚠️ Ligne 128: GARDER (migration importante)
    - ❌ Ligne 226: SUPPRIMER

16. **`app/api/auth/me/route.ts`**
    - Ligne 55: `console.error("Get user error:", error)`
    - ❌ SUPPRIMER

17. **`app/api/auth/register/route.ts`**
    - Ligne 121: `console.error("Register error:", error)`
    - ❌ SUPPRIMER

18. **`hooks/use-auth.ts`**
    - Ligne 40: `console.error("Auth check error:", error)`
    - Ligne 89: `console.error("Logout error:", error)`
    - ❌ SUPPRIMER

19. **`components/layout/app-navbar.tsx`**
    - Ligne 175: `console.error("Logout error:", error)`
    - ❌ SUPPRIMER

20. **`app/api/auth/refresh/route.ts`**
    - Ligne 52: `console.error("Refresh token error:", error)`
    - ❌ SUPPRIMER

21. **`components/dashboard/enterprise/quick-actions.tsx`**
    - Ligne 88: `console.error("Error sending email:", error)`
    - ❌ SUPPRIMER

22. **`lib/notifications/sms-service.ts`**
    - Ligne 87: `console.error("Erreur envoi SMS:", error)`
    - Ligne 100: `console.error(\`Template SMS "${templateName}" introuvable\`)`
    - ❌ SUPPRIMER (garder seulement DEV MODE log)

23. **`lib/notifications/email-service.ts`**
    - Ligne 227: `console.error("Erreur envoi email:", error)`
    - Ligne 239: `console.error(\`Template email "${templateName}" introuvable\`)`
    - ❌ SUPPRIMER (garder seulement DEV MODE log)

24. **`lib/sessions.ts`**
    - Ligne 34: `console.error("Error reading sessions:", error)`
    - ❌ SUPPRIMER

25. **`hooks/use-optimized-fetch.ts`**
    - Ligne 48: `console.error("Fetch error:", error)`
    - ❌ SUPPRIMER

26. **`components/dashboard/dashboard-overview.tsx`**
    - Ligne 86: `console.error("Error fetching stats:", error)`
    - ❌ SUPPRIMER

27. **`components/dashboard/stats-cards.tsx`**
    - Ligne 144: `console.error("Error fetching stats:", error)`
    - ❌ SUPPRIMER

28. **`app/api/employees/email/route.ts`**
    - Ligne 72: `console.error(\`Erreur envoi email à ${employee.email}:\`, error)`
    - ❌ SUPPRIMER

29. **`components/dashboard/alerts-widget.tsx`**
    - Ligne 77: `console.error("Error fetching alerts:", error)`
    - ❌ SUPPRIMER

30. **`lib/push-notifications.ts`**
    - Ligne 5: `console.warn("This browser does not support notifications")`
    - Ligne 73: `console.error("Error subscribing to push notifications:", error)`
    - ⚠️ Ligne 5: GARDER (warning utile)
    - ❌ Ligne 73: SUPPRIMER

31. **`components/push/push-notification-manager.tsx`**
    - Ligne 26: `console.error("Error checking subscription:", error)`
    - Ligne 66: `console.error("Error subscribing to push:", error)`
    - Ligne 85: `console.error("Error unsubscribing from push:", error)`
    - ❌ SUPPRIMER

32. **`app/api/push/send/route.ts`**
    - Ligne 41: `console.log("[Push] Sending notification:", ...)`
    - ❌ SUPPRIMER

33. **`app/api/push/subscribe/route.ts`**
    - Ligne 28: `console.log("[Push] Subscription saved for user:", ...)`
    - ❌ SUPPRIMER

34. **`components/pwa/pwa-installer.tsx`**
    - Ligne 66: `console.error("Erreur lors de l'installation:", error)`
    - ❌ SUPPRIMER

35. **`hooks/use-notification-subscription.ts`**
    - Ligne 25: `console.error("Error checking subscription:", error)`
    - ❌ SUPPRIMER

36. **`components/employees/notification-preferences.tsx`**
    - Ligne 49: `console.error("Erreur:", error)`
    - ❌ SUPPRIMER

37. **`lib/notifications/index.ts`**
    - Lignes 54, 69, 149, 164: `console.error(...)`
    - ❌ SUPPRIMER

38. **`app/api/auth/apple/callback/route.ts`**
    - Ligne 74: `console.error("Erreur OAuth Apple:", error)`
    - ❌ SUPPRIMER

39. **`app/api/auth/google/callback/route.ts`**
    - (à vérifier dans le fichier)
    - ❌ SUPPRIMER si présent

40. **`lib/db.ts`**
    - Ligne 83: `console.error(\`Error reading ${filePath}:\`, error)`
    - ❌ SUPPRIMER

41. **`lib/db/prisma.ts`**
    - Lignes 20-21, 35, 39-41, 46-47, 59, 71: Plusieurs console.warn/error
    - ⚠️ GARDER (warnings de fallback système critiques)

42. **`src/app/dashboard/page.tsx`** (sera supprimé avec src/)
    - Ligne 48: `console.error("Error fetching dashboard data:", error)`
    - ✅ SUPPRIMÉ automatiquement avec le dossier

43. **`src/app/api/*`** (sera supprimé avec src/)
    - Tous les console.error dans ces fichiers
    - ✅ SUPPRIMÉ automatiquement avec le dossier

---

## 3️⃣ IMPORTS INUTILISÉS

### ⚠️ À VÉRIFIER FICHIER PAR FICHIER:

Les imports inutilisés doivent être vérifiés avec un linter TypeScript. Voici les fichiers suspects:

1. **`app/dashboard/page-new.tsx`** (sera supprimé)
2. **`app/dashboard/page.tsx`** - Vérifier tous les imports de recharts
3. **`app/page.tsx`** - Vérifier tous les imports lucide-react
4. **`components/*`** - Vérifier imports non utilisés

**Action:** Utiliser `npm run lint` pour détecter automatiquement les imports inutilisés.

---

## 4️⃣ CODE COMMENTÉ

### Résultat de la recherche:
- **Code commenté trouvé:** Minimal
- **Sections entières commentées:** Aucune trouvée
- **Fonctions commentées:** Aucune trouvée

**Action:** Pas de nettoyage nécessaire pour le code commenté.

---

## 5️⃣ FICHIERS À GARDER (CONFIRMÉS)

### ✅ Fichiers utilisés (NE PAS SUPPRIMER):

- `components/landing/demo-section.tsx` - ✅ UTILISÉ dans `app/page.tsx`
- Tous les fichiers dans `app/` (sauf `page-new.tsx`)
- Tous les fichiers dans `components/` (sauf ceux dans `src/`)
- Tous les fichiers dans `lib/` (sauf ceux dans `src/`)
- Tous les fichiers dans `prisma/`
- Tous les fichiers de config

---

## 📊 RÉSUMÉ DES ACTIONS

### Phase 1: Suppression fichiers orphelins
- [ ] Supprimer `app/dashboard/page-new.tsx`
- [ ] Supprimer dossier `src/` entier
- [ ] Décider: Supprimer ou garder `test-*.ts` et `test-*.ps1`

### Phase 2: Nettoyage console.log
- [ ] Remplacer ~100 console.error par logger service
- [ ] Garder console.log dans scripts et logger service
- [ ] Garder console.warn critiques (fallback système)

### Phase 3: Nettoyage imports
- [ ] Lancer `npm run lint` pour détecter imports inutilisés
- [ ] Supprimer imports inutilisés fichier par fichier

### Phase 4: Vérification
- [ ] `npm run type-check` (0 errors)
- [ ] `npm run lint` (0 errors)
- [ ] `npm run build` (success)
- [ ] `npm run dev` (pas d'errors console)

---

## 🚨 AVANT DE COMMENCER

**IMPORTANT:** Créer une branche de backup:

```bash
git checkout -b backup-before-cleanup
git add .
git commit -m "backup: before cleanup"
git checkout main
```

---

## 📝 NOTES

- Le dossier `src/` semble être une ancienne structure qui a été remplacée par la structure actuelle dans `app/`, `components/`, `lib/`
- Les console.error doivent être remplacés par le service logger (`lib/services/logger.ts`)
- Les scripts de test peuvent être utiles pour le debugging, à décider selon les besoins

---

**Prochaine étape:** Confirmer cette liste avant de procéder au nettoyage.

