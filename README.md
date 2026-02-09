# Compte Rendu - Application de Gestion Sportive

## Vue d'ensemble

Application web complète de gestion de compétitions sportives avec une architecture moderne utilisant :
- **Backend** : Symfony (PHP) avec API REST
- **Frontend** : Angular 18 avec TypeScript
- **Base de données** : SQLite
- **Containerisation** : Docker & Docker Compose

---

## Architecture du Système

### Infrastructure
- **Backend** : Serveur Symfony sur le port `8000`
- **Frontend** : Serveur Angular sur le port `4200`
- **Base de données** : SQLite (fichier `var/app.db`)
- **Réseau** : Bridge Docker `maintenance_network` pour la communication inter-conteneurs

---

## Modèle de Données

L'application suit une hiérarchie de relations :

```
Sport (1..*)
  ├── Championship (1..*)
  │   ├── Competition (1..*)
  │   │   └── Event (1..*)
```

### Entités

#### 1. **Sport**
- Représente un type de sport
- Attributs :
  - `id` : Identifiant unique
  - `name` : Nom du sport
  - `type` : Type de sport (énumération)
- Relations : 1 Sport → plusieurs Championships

#### 2. **Championship** (Championnat)
- Représente un championnat d'un sport donné
- Attributs :
  - `id` : Identifiant unique
  - `name` : Nom du championnat
  - `sport` : Référence au Sport parent
- Relations : 1 Championship → plusieurs Competitions

#### 3. **Competition** (Compétition)
- Représente une compétition au sein d'un championnat
- Attributs :
  - `id` : Identifiant unique
  - `name` : Nom de la compétition
  - `championship` : Référence au Championship parent
- Relations : 1 Competition → plusieurs Events

#### 4. **Event** (Événement)
- Représente un événement spécifique dans une compétition
- Attributs :
  - `id` : Identifiant unique
  - `name` : Nom de l'événement
  - `competition` : Référence à la Competition parent

---

## API REST Backend

### Sports (`/api/sport`)
- **POST** `/{name}/{type}` - Créer un nouveau sport
- **GET** `/{sport}` - Récupérer les détails d'un sport
- **GET** `/` - Lister tous les sports
- **PUT** `/{sport}/{newName}/{newType}` - Mettre à jour un sport
- **DELETE** `/{sport}` - Supprimer un sport

### Championships (`/api/championship`)
- **POST** `/{name}/{sport}` - Créer un championnat
- **GET** `/{championship}` - Récupérer les détails d'un championnat
- **GET** `/` - Lister tous les championnats
- **GET** `/sport/{sport}` - Lister les championnats d'un sport
- **PUT** `/{championship}/{newName}` - Mettre à jour un championnat
- **DELETE** `/{championship}` - Supprimer un championnat

### Competitions (`/api/competition`)
- **POST** `/{name}/{championship}` - Créer une compétition
- **GET** `/{competition}` - Récupérer les détails d'une compétition
- **GET** `/` - Lister toutes les compétitions
- **GET** `/championship/{championship}` - Lister les compétitions d'un championnat
- **PUT** `/{competition}/{newName}` - Mettre à jour une compétition
- **DELETE** `/{competition}` - Supprimer une compétition

### Events (`/api/event`)
- **POST** `/{name}/{competition}` - Créer un événement
- **GET** `/{event}` - Récupérer les détails d'un événement
- **GET** `/` - Lister tous les événements
- **GET** `/competition/{competition}` - Lister les événements d'une compétition
- **PUT** `/{event}/{newName}` - Mettre à jour un événement
- **DELETE** `/{event}` - Supprimer un événement

---

## Frontend (Angular 18)

### Technologies
- **Framework** : Angular 18
- **UI** : Angular Material (v18.2.14)
- **CSS** : SCSS
- **Routeur** : Angular Router pour la navigation
- **Animations** : Angular Animations
- **CDK** : Angular Component Dev Kit
- **Tests** : Cypress, Jasmine, Karma

### Commandes de Développement

#### Serveur de développement
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Scaffolding de composants
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Tests unitaires
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Tests E2E
Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

---

## Fonctionnalités Principales

### Gestion CRUD Complète
**Création** : Ajouter des sports, championnats, compétitions et événements  
**Lecture** : Consulter les détails et listes  
**Mise à jour** : Modifier les informations  
**Suppression** : Supprimer les entités

### Validation des Données
- Vérification des doublons (Sports, Championships, Competitions, Events)
- Validation des types de sports énumérés
- Gestion des relations d'intégrité

### Hiérarchie Relationnelle
- Navigation en cascade (Sport → Championship → Competition → Event)
- Comptage automatique des éléments enfants
- Récupération des entités par sport/championnat/compétition

---

## Stack Technique Complète

### Backend
- **PHP 8.x** (Symfony)
- **Doctrine ORM** pour la gestion de la base de données
- **CORS** activé (nelmio_cors)
- **Validations** via Symfony Validator
- **Logs** via Monolog

### Frontend
- **Angular 18.0.0**
- **TypeScript 5.4.2**
- **Angular Material 18.2.14**
- **RxJS 7.8.0**
- **ESLint** pour la qualité du code

### DevOps
- **Docker** : Conteneurisation des services
- **Docker Compose** : Orchestration multi-conteneurs
- **SQLite** : Base de données légère et intégrée

---

## Tests

- **Tests unitaires** : Jasmine/Karma (Frontend)
- **Tests d'intégration E2E** : Cypress (Frontend)
- **Tests Backend** : PHPUnit configuré

---

## Résumé des Capacités

Cette application est une **plateforme de gestion complète pour les compétitions sportives** permettant :

1. **Organiser les sports** avec typage
2. **Créer des championnats** associés à des sports
3. **Définir des compétitions** dans chaque championnat
4. **Lister des événements** pour chaque compétition
5. **Gérer l'intégralité du cycle de vie** des entités (CRUD)
6. **Consulter la hiérarchie relationnelle** des éléments

L'architecture est **scalable** et **maintenable**, avec une séparation claire entre le frontend et le backend, facilite les tests et les déploiements futurs.
