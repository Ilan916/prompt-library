# Pico (MVP)

Pico est une **librairie de prompts structurés**, pensée comme un **petit outil du quotidien** pour créer, organiser, retrouver et partager des prompts efficaces pour les IA modernes.

L’objectif n’est pas de créer une marketplace complexe, mais un **outil simple, rapide et fiable**, centré sur la **qualité des prompts** et une **recherche puissante**.

---

## 🎯 Vision

Les prompts sont devenus des outils à part entière, mais ils sont souvent :
- mal organisés
- difficiles à retrouver
- peu structurés
- dispersés entre Notion, Google Docs ou GitHub

**Pico** vise à devenir :
- une **boîte à outils de prompts**
- un **accessoire mental** pour les utilisateurs d’IA
- une librairie claire, partageable et orientée usage réel

---

## ✨ Fonctionnalités du MVP

### 📚 Prompts
- Création de prompts **multi-étapes**
- Chaque prompt est composé de messages ordonnés :
  - `system`
  - `user`
  - `assistant`
- Ajout d’exemples de réponses
- ID unique partageable pour chaque prompt

---

### 🔎 Recherche (fonctionnalité clé)
- Barre de recherche unique permettant :
  - recherche par ID
  - recherche par mots clés
  - recherche par phrase complète
- Recherche full-text sur :
  - titre
  - objectif
  - contenu des étapes
- Classement intelligent basé sur :
  - pertinence
  - score
  - récence

---

### 🎛️ Filtres
- IA compatible (ChatGPT, Claude, Gemini, etc.)
- Catégories
- Type de prompt (texte / image)
- Score minimum
- Tri (top, récent, tendance)

---

### 👍 Votes & Favoris
- Upvote / Downvote sur les prompts
- Score calculé automatiquement
- Ajout / suppression de favoris
- Les favoris sont privés

---

### 👤 Utilisateur
- Authentification :
  - Google OAuth
  - Email / mot de passe
- Profil utilisateur avec :
  - informations du compte
  - prompts publiés
  - prompts favoris
- Possibilité de supprimer ses propres prompts

---

## 🚫 Hors périmètre du MVP

Les fonctionnalités suivantes sont volontairement exclues du MVP :
- prompts privés
- édition collaborative
- commentaires
- amélioration automatique des prompts par IA
- marketplace / paiement
- API publique
- profils publics

👉 Le focus est volontairement mis sur **la librairie et la recherche**.

---

## 🧱 Architecture du projet

Le projet suit une architecture **feature-based**, pensée pour la scalabilité et la maintenabilité.

### `app/`
- Gestion des routes (Next.js App Router)
- Pages simples, sans logique métier
- Rôle : orchestration et navigation

### `features/`
- Logique métier par domaine :
  - `auth`
  - `prompts`
  - `search`
  - `user`
- Chaque feature contient :
  - `components/` → UI
  - `hooks/` → logique métier
  - `services/` → accès API / DB / providers
  - `types.ts` → types TypeScript

👉 Les pages n’implémentent **aucune logique métier**.

---

## 🛠️ Stack technique

- **Framework** : Next.js (App Router)
- **Langage** : TypeScript
- **UI** : React, Tailwind CSS, shadcn/ui
- **Architecture** : Feature-based
- **Auth** : Google OAuth + Email / Password
- **Base de données** : PostgreSQL (prévu)
- **ORM** : Prisma ou Drizzle (à valider)
- **Linting / Format** : ESLint, Prettier

---

## 🚀 Roadmap (haute-niveau)

### Sprint 1 (terminé)
- Setup projet
- Architecture
- Routing
- Base du produit

### Sprint 2
- Modélisation DB
- Création de prompts
- Liste des prompts
- Votes & favoris

### Sprint 3
- Recherche avancée
- Filtres
- Optimisation UX
- Seed de données

---

## 🧠 Philosophie du projet

- Simplicité > complexité
- Produit avant technique
- Lisibilité avant abstraction
- Scalabilité sans sur-ingénierie

---

## 📌 Statut

🚧 **Projet en cours de développement (MVP)**  
Ce dépôt évoluera par sprints hebdomadaires.

---

## 📄 Licence

À définir.
