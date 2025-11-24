# 🚀 ShiftPilot - Gestion Intelligente de Plannings

<div align="center">

![ShiftPilot Logo](public/icon-light-32x32.png)

**Automatisez la création de plannings pour vos employés avec l'intelligence artificielle**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Fonctionnalités](#-fonctionnalités) • [Installation](#-installation) • [Documentation](#-documentation) • [Contribuer](#-contribuer)

</div>

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Déploiement](#-déploiement)
- [Documentation](#-documentation)
- [Contribuer](#-contribuer)
- [License](#-license)

## 🎯 À propos

**ShiftPilot** est une solution SaaS complète de gestion de plannings pour restaurants et établissements de la restauration. L'application utilise l'intelligence artificielle pour automatiser la création de plannings optimisés, tout en respectant les contraintes légales et les préférences des employés.

### Pourquoi ShiftPilot ?

- ⚡ **Gain de temps** : Créez des plannings en quelques secondes au lieu d'heures
- 🤖 **Intelligence artificielle** : Optimisation automatique basée sur vos contraintes
- 📱 **PWA** : Application mobile installable avec mode hors ligne
- 🔔 **Notifications temps réel** : Alertes push pour les changements importants
- 📊 **Analytics avancés** : Tableaux de bord et rapports détaillés
- 👥 **Gestion d'équipe** : Gestion complète des employés et de leurs disponibilités
- 🔐 **Sécurisé** : Authentification robuste et gestion des sessions

## ✨ Fonctionnalités

### 🎨 Interface & Expérience Utilisateur

- ✅ **Mode sombre/clair** avec toggle automatique
- ✅ **Design moderne** avec glassmorphism et animations fluides
- ✅ **Responsive** : Optimisé pour mobile, tablette et desktop
- ✅ **PWA** : Installation sur mobile (iOS/Android)
- ✅ **Recherche globale** : Raccourci Cmd+K pour accès rapide
- ✅ **Command Palette** : Navigation rapide et actions

### 📅 Gestion de Plannings

- ✅ **Génération IA** : Création automatique de plannings optimisés
- ✅ **Création manuelle** : Interface intuitive pour créer des plannings
- ✅ **Templates** : Sauvegarder et réutiliser des modèles de planning
- ✅ **Duplication** : Dupliquer des plannings existants
- ✅ **Publication** : Publier des plannings avec notifications automatiques
- ✅ **Protection** : Empêcher la modification des plannings publiés
- ✅ **Export** : PDF, iCal, Excel

### 👥 Gestion d'Équipe

- ✅ **CRUD employés** : Ajout, modification, suppression
- ✅ **Génération d'identifiants** : Créer des comptes pour les employés
- ✅ **Dashboard employé** : Espace dédié pour chaque employé
- ✅ **Disponibilités** : Gestion des disponibilités par employé
- ✅ **Échanges de shifts** : Système de demande d'échange entre employés
- ✅ **Demandes de congés** : Gestion des demandes de congés payés
- ✅ **Préférences notifications** : Personnalisation par employé

### 📊 Analytics & Rapports

- ✅ **Dashboard temps réel** : Statistiques live mises à jour automatiquement
- ✅ **Graphiques interactifs** : Recharts pour visualisation des données
- ✅ **Métriques clés** : Heures travaillées, shifts, coûts
- ✅ **Rapports** : Génération de rapports hebdomadaires/mensuels
- ✅ **Export données** : Export pour logiciels de paie

### 🔔 Notifications

- ✅ **Notifications push** : Alertes en temps réel dans le navigateur
- ✅ **Email** : Notifications par email (Resend/SMTP)
- ✅ **SMS** : Notifications SMS (Twilio)
- ✅ **Templates personnalisables** : Messages personnalisés
- ✅ **Préférences** : Activation/désactivation par type de notification

### 🔐 Sécurité & Authentification

- ✅ **Authentification** : Login/Signup avec sessions sécurisées
- ✅ **OAuth** : Connexion Google et Apple
- ✅ **Séparation Manager/Employé** : Deux types de comptes distincts
- ✅ **Middleware** : Protection des routes
- ✅ **Gestion des sessions** : Suivi des sessions actives

### 🔌 Intégrations

- ✅ **Google Calendar** : Synchronisation bidirectionnelle
- ✅ **Webhooks** : Intégration avec systèmes externes
- ✅ **API REST** : API complète pour intégrations

## 🛠️ Technologies

### Frontend

- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling utility-first
- **Framer Motion** - Animations fluides
- **Shadcn/ui** - Composants UI modernes
- **Recharts** - Graphiques et visualisations
- **Zod** - Validation de schémas
- **Sonner** - Notifications toast
- **cmdk** - Command palette

### Backend

- **Next.js API Routes** - API REST
- **JSON File Storage** - Base de données simple (prêt pour migration vers PostgreSQL/MongoDB)
- **NextAuth** - Authentification (structure prête)
- **Resend** - Service d'emails
- **Twilio** - Service SMS

### PWA & Mobile

- **Service Workers** - Mode hors ligne et notifications push
- **Web Push API** - Notifications push natives
- **Manifest.json** - Installation PWA

## 📦 Installation

### Prérequis

- Node.js 18+ ou 20+
- npm, yarn ou pnpm
- Git

### Étapes

1. **Cloner le repository**

```bash
git clone https://github.com/noamdj02-netizen/ShiftPilot-PRO-21.git
cd ShiftPilot-PRO-21
```

2. **Installer les dépendances**

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine :

```env
# Application
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Email (Resend - recommandé)
RESEND_API_KEY=your-resend-api-key

# Email (SMTP - fallback)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_SECURE=false
EMAIL_FROM=ShiftPilot <noreply@shiftpilot.com>

# SMS (Twilio - recommandé)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# OAuth Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth Apple
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret

# Push Notifications (VAPID)
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
```

4. **Générer les clés VAPID (pour notifications push)**

```bash
npm install -g web-push
web-push generate-vapid-keys
```

Copiez les clés générées dans `.env.local`.

5. **Lancer le serveur de développement**

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

6. **Ouvrir dans le navigateur**

Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Comptes de test

#### Manager
- **Email** : `demo@shiftpilot.com`
- **Mot de passe** : `Demo1234!`

#### Employé
- **Email** : `employe@test.com`
- **Mot de passe** : `test1234`

### Structure des données

Les données sont stockées dans le dossier `data/` :
- `users.json` - Comptes managers
- `employees.json` - Employés
- `schedules.json` - Plannings
- `employee_sessions.json` - Sessions employés

## 🚀 Utilisation

### Pour les Managers

1. **Créer un compte** : `/signup`
2. **Se connecter** : `/login`
3. **Ajouter des employés** : Dashboard → Équipe → Ajouter
4. **Générer des identifiants** : Pour chaque employé, cliquer sur "Générer identifiants"
5. **Créer un planning** : Dashboard → Planning → Nouveau
6. **Publier** : Une fois le planning créé, cliquer sur "Publier"

### Pour les Employés

1. **Se connecter** : `/employee/login`
2. **Consulter son planning** : Dashboard employé
3. **Demander des congés** : Onglet "Congés"
4. **Échanger des shifts** : Via le système d'échange

### Raccourcis clavier

- `Cmd+K` (Mac) / `Ctrl+K` (Windows) : Ouvrir la recherche globale
- `Esc` : Fermer les modals/dialogs

## 📱 PWA (Progressive Web App)

ShiftPilot est une PWA installable :

1. **Sur mobile** : Ouvrir dans le navigateur → Menu → "Ajouter à l'écran d'accueil"
2. **Sur desktop** : Icône d'installation dans la barre d'adresse
3. **Mode hors ligne** : Consultation des plannings même sans connexion

## 🔔 Notifications Push

Pour activer les notifications push :

1. Aller dans les paramètres
2. Cliquer sur "Activer les notifications"
3. Autoriser dans le navigateur
4. Recevoir des alertes en temps réel

## 🚢 Déploiement

### Vercel (Recommandé)

1. **Installer Vercel CLI**

```bash
npm i -g vercel
```

2. **Déployer**

```bash
vercel
```

3. **Configurer les variables d'environnement** dans le dashboard Vercel

### Autres plateformes

- **Netlify** : Connecter le repo GitHub
- **Railway** : Déployer depuis GitHub
- **Docker** : Dockerfile inclus (à créer)

## 📚 Documentation

### API Routes

- `/api/auth/*` - Authentification
- `/api/employees/*` - Gestion des employés
- `/api/schedules/*` - Gestion des plannings
- `/api/analytics/*` - Statistiques
- `/api/push/*` - Notifications push
- `/api/realtime/*` - Données temps réel

### Structure du projet

```
shift-pilot/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # API Routes
│   ├── dashboard/         # Pages dashboard manager
│   ├── employee/          # Pages dashboard employé
│   └── ...
├── components/            # Composants React
│   ├── dashboard/        # Composants dashboard
│   ├── employees/        # Composants employés
│   ├── schedules/        # Composants plannings
│   └── ...
├── lib/                  # Utilitaires
│   ├── db.ts            # Base de données JSON
│   ├── auth.ts          # Authentification
│   └── ...
├── public/               # Assets statiques
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service Worker
└── data/                # Données JSON (créé à l'exécution)
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Recharts](https://recharts.org/) - Graphiques

## 📞 Support

Pour toute question ou problème :
- Ouvrir une [Issue](https://github.com/noamdj02-netizen/ShiftPilot-PRO-21/issues)
- Email : support@shiftpilot.com

---

<div align="center">

**Fait avec ❤️ pour les restaurants**

⭐ Si ce projet vous plaît, n'hésitez pas à mettre une étoile !

</div>

#   S h i f t P i l o t - S a a S  
 #   S h i f t P i l o t - S a a S  
 