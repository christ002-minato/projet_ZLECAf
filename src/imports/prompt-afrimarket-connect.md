# PROMPT COMPLET — Reconstruction du site "AfriMarket Connect"

Copie-colle ce prompt en entier dans l'outil de génération (Google AI Studio, Claude, etc.) pour reconstruire le site.

---

## CONTEXTE DU PROJET

Construis une application web complète appelée **"AfriMarket Connect"**, une plateforme de mise en relation B2B/B2C pour le commerce intra-africain dans le cadre de la ZLECAf (Zone de Libre-Échange Continentale Africaine / AfCFTA).

**Stack technique imposée :**
- React 19 + TypeScript + Vite
- Tailwind CSS (v4)
- react-i18next pour la traduction (français, anglais, arabe, espagnol)
- lucide-react pour TOUTES les icônes (aucun emoji nulle part dans l'interface)
- motion (Framer Motion) pour les animations
- Architecture prête à brancher sur un futur backend (API REST), avec données simulées (mock data) en attendant

**Public cible :** des utilisateurs avec un **niveau éducatif basique**, parfois peu à l'aise avec la lecture ou le jargon administratif/douanier. Toute l'interface doit être pensée pour eux :
- Phrases courtes (12-15 mots maximum)
- Jamais de jargon seul sans explication immédiate (ex: "ZLECAf" toujours accompagné d'une explication simple entre parenthèses ou juste après)
- Toujours une icône ou une image à côté d'une idée importante
- Gros boutons, contrastes clairs, peu de choix à la fois

---

## 1. MESSAGE CENTRAL DU SITE (à répéter souvent, sous des formes variées)

Le site doit rappeler très souvent, de façons différentes, ce message simple :

> **"Achetez et vendez partout en Afrique, sans payer de taxe en plus."**

Avec l'explication courte qui l'accompagne la première fois :

> "Grâce à un accord entre pays africains (la ZLECAf), vous ne payez plus de taxe quand vous achetez ou vendez à un autre pays africain."

Ce message doit apparaître, reformulé chaque fois différemment, dans : le hero de la page d'accueil, un bandeau répété 2-3 fois sur la page, la section "Comment ça marche", le footer, et avant chaque CTA d'inscription.

---

## 2. PAGE D'ACCUEIL — Structure complète

### 2.1 Hero (bannière principale)
- Titre énorme et simple : "Achetez et vendez partout en Afrique, sans taxes"
- Sous-titre d'une ligne expliquant la ZLECAf simplement
- **Image/slide en arrière-plan** : carrousel automatique de 3-4 photos (marchés africains, ports, commerçants, produits) en fond du hero, avec un léger overlay sombre pour la lisibilité du texte. Utiliser des liens d'images externes (Unsplash ou équivalent libre de droits) pour la simulation, avec un champ `imageUrl` prévu pour le futur backend
- **Barre de recherche** centrale et visible (recherche de produits/fournisseurs par mot-clé)
- 2 gros boutons CTA : **"Je veux vendre"** et **"Je veux acheter"**, tous deux redirigeant vers la page Register, avec le type de profil pré-sélectionné selon le bouton cliqué

### 2.2 Bandeau de rappel (répétable)
- Bandeau coloré court avec icône (pas de texte long) : "54 pays africains. 1 seul marché. 0 taxe entre eux."
- Ce bandeau, ou une version raccourcie, doit réapparaître à 2-3 endroits différents sur la page (jamais identique mot pour mot, reformulé chaque fois)

### 2.3 Section "Comment ça marche" (3 étapes visuelles)
- Très visuel, peu de texte, en 3 cartes avec grandes icônes Lucide :
  1. "Je m'inscris" (icône UserPlus)
  2. "Je trouve un produit ou un acheteur" (icône Search)
  3. "Je vends ou j'achète, sans taxe" (icône HandCoins ou CheckCircle)
- Chaque étape : icône + titre de 3-4 mots + phrase de 5-6 mots maximum

### 2.4 Section catégories de produits
- Catégories illustrées avec icônes Lucide (Wheat, Shirt, Zap, Bricks/Hammer, FlaskConical) — jamais d'emoji
- Cliquables pour filtrer

### 2.5 Section produits locaux + produits du continent
- Cartes produits avec **vraie image** (`imageUrl`, lien externe simulé) au lieu du dégradé de couleur actuel
- Badge simple et visuel : **"Sans taxe"** (vert, icône ShieldCheck) au lieu de "Conforme Règle d'Origine ZLECAf"
- Prix affiché **dans la devise locale du pays sélectionné** (ex: FCFA, Naira, Cedi, Rand, Dinar...) avec l'équivalent USD en plus petit en dessous
- Drapeau du pays : utiliser un composant d'icône de drapeau (sprite/SVG), jamais l'emoji drapeau Unicode

### 2.6 Section chiffres-clés reformulés simplement
- Remplacer les chiffres abstraits par des phrases concrètes :
  - "54 pays où vendre sans payer de taxe"
  - "Des milliers d'acheteurs vous attendent"
  - "Zéro taxe entre pays africains"

### 2.7 Rappel final avant le footer
- Bloc CTA répété : "Rejoignez le grand marché africain — c'est gratuit et sans taxe" + bouton vers Register

### 2.8 Footer
- Reprend une courte phrase du message central (pas juste un copyright)
- Liens utiles, mentions légales
- Aucun emoji, utiliser une icône Lucide pour le logo (ex: Globe2)

---

## 3. AUTHENTIFICATION — Login & Register

### 3.1 Register (inscription en une seule fois)
- En haut de la page : **3 grandes cartes cliquables** (pas de texte technique), avec icône + libellé court :
  - **"Particulier"** (icône User) — une personne qui achète/vend pour elle-même
  - **"Représentant"** (icône Users) — représente un groupe, une coopérative
  - **"Entreprise"** (icône Building2) — société enregistrée
- Le formulaire en dessous **s'adapte dynamiquement** selon la carte choisie :
  - Champs communs : nom complet, téléphone ou email, mot de passe, pays (avec drapeau icône), ville
  - Si "Représentant" ou "Entreprise" : champs additionnels (nom de l'entreprise/coopérative, secteur d'activité, numéro d'enregistrement si disponible — optionnel, jamais bloquant)
- **Une seule soumission**, pas de wizard multi-étapes, pour rester simple
- Bouton CTA final unique et gros : "Créer mon compte gratuitement"
- Aucun jargon : pas de "habilitation commerciale", remplacer par "Votre compte est prêt"

### 3.2 Login
- Champs simples : téléphone/email + mot de passe
- Gros boutons, libellés clairs ("Se connecter")
- Lien "Mot de passe oublié ?" et lien vers Register pour les nouveaux utilisateurs

### 3.3 Préparation backend pour l'auth
- Prévoir un contrat d'API clair (mock pour l'instant, structure prête à brancher) :
  - `POST /auth/register` — reçoit `{ profileType: "individual" | "representative" | "company", fullName, contact, password, country, city, companyName?, sector?, regNumber? }`
  - `POST /auth/login` — reçoit `{ contact, password }`, retourne un token simulé
  - Stocker le token simulé dans le state global (pas dans localStorage en clair pour les données sensibles)

---

## 4. DEVISES LOCALISÉES

- Ajouter à chaque pays dans les données : `currencyCode`, `currencySymbol`, et un `exchangeRateToUsd` simulé (taux indicatif fixe pour la démo)
- Convertir et afficher tous les prix produits dans la devise du pays actuellement sélectionné par l'utilisateur
- Toujours montrer l'équivalent USD en plus petit comme référence secondaire
- Exemples de devises à couvrir : FCFA (Sénégal, Côte d'Ivoire, Mali, Bénin, etc.), Naira (Nigeria), Cedi (Ghana), Shilling (Kenya), Rand (Afrique du Sud), Dirham (Maroc), Dinar (Algérie, Tunisie), Livre égyptienne (Égypte), Birr (Éthiopie)

---

## 5. ICÔNES — Règle stricte

**Aucun emoji nulle part dans l'interface** (logo, navigation, catégories, drapeaux, notation, boutons, badges). Remplacer systématiquement par des icônes `lucide-react` :
- Logo du site → icône Globe2 ou MapPin stylisée
- Bouton réglages → icône Settings
- Catégories → Wheat, Shirt, Zap, Bricks, FlaskConical
- Notation produit (étoiles) → icône Star pleine/vide de lucide-react
- Drapeaux pays → composant de drapeau SVG/sprite dédié (pas l'emoji Unicode)
- Badges de conformité → ShieldCheck, CheckCircle2

---

## 6. IMAGES

- Ajouter un champ `imageUrl` à chaque produit (lien vers une image, simulé avec des liens d'images libres de droits pour la démo)
- Ajouter un champ `imageUrl` ou `bannerImages` (tableau) pour chaque pays ou pour le hero général, pour le carrousel d'arrière-plan
- Toutes les images doivent avoir un texte alternatif (`alt`) descriptif simple

---

## 7. RESPONSIVE — Mobile ET Desktop

- **Version mobile** : navigation en barre du bas (bottom tab bar) avec icônes + libellés très courts, boutons larges et faciles à toucher, une seule colonne, hero avec texte réduit mais toujours lisible
- **Version desktop** : navigation complète en haut, grille de produits en plusieurs colonnes, hero pleine largeur avec carrousel d'images plus grand
- Tester la cohérence des deux versions pour le Header, le Hero, Register/Login, et les listes de produits

---

## 8. DONNÉES SIMULÉES POUR LE FUTUR BACKEND

Toutes les données doivent être structurées comme si elles venaient d'une API, avec des fichiers de mock séparés des composants, prêts à être remplacés par des appels `fetch`/`axios` :

- **Pays** (`countries.ts`) : id, noms (fr/en), drapeau (icône, pas emoji), langue par défaut, couleurs de thème, devise (code, symbole, taux de change simulé)
- **Produits** (`products.ts`) : id, noms/descriptions (fr/en), catégorie, fournisseur, pays, prix de base en USD, prix préférentiel ZLECAf, prix standard hors ZLECAf, image (`imageUrl`), note, conformité origine, délai de livraison, quantité minimum
- **Utilisateurs simulés** (`users.ts`, nouveau) : id, type de profil (particulier/représentant/entreprise), nom, contact, pays, ville, infos entreprise si applicable, date d'inscription
- **Barrières commerciales signalées** (`barriers.ts`) : déjà existant, à conserver et enrichir si besoin
- Structurer chaque fichier de mock pour qu'il ressemble à une réponse JSON d'API (facilement remplaçable plus tard par un vrai appel réseau)

---

## 9. TON ET VOCABULAIRE — Rappel final

Remplacer systématiquement le jargon institutionnel par des formulations simples partout dans le site :
- "Devenir fournisseur certifié ZLECAf" → "Vendre mes produits"
- "Tarif préférentiel ZLECAf" → "Prix sans taxe"
- "Habilitation commerciale" → "Votre compte est prêt"
- "Conforme Règle d'Origine" → "Sans taxe" (badge vert)
- "Droits régionaux : 0%" → "Vous ne payez rien en plus"

---

## 10. LIVRABLE ATTENDU

Un site complet et fonctionnel avec :
- Toutes les pages existantes (Accueil, Fournisseurs, Devenir fournisseur, Signaler une barrière, Réglages) adaptées au nouveau ton et design
- Nouvelles pages Login et Register comme décrites ci-dessus
- Données simulées complètes et réalistes pour pays, produits, utilisateurs
- Design entièrement sans emoji, avec icônes professionnelles
- Devises localisées par pays
- Images de produits et carrousel d'arrière-plan
- Barre de recherche visible et fonctionnelle
- Bouton CTA "S'inscrire" visible en permanence, redirigeant vers Register
- Version mobile et version desktop toutes deux abouties
