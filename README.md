# RIA - Frontend

## Description

Ce service permet aux utilisateurs d'uploader une image, laquelle est ensuite analysée par un moteur d'intelligence artificielle pour générer des labels précis et pertinents.

### Fonctionnalités
- Upload d'Image : Interface utilisateur conviviale pour uploader facilement des images.
- Reconnaissance IA : Utilisation d'AWS Rekognition pour une analyse d'image fiable et avancée. La flexibilité du système permet une intégration future avec d'autres API de reconnaissance d'image.
- Technologies Utilisées : Développé avec Node.js et React.js, garantissant une expérience utilisateur fluide et une intégration backend robuste.
- Enregistre vos images sur le cloud et votre analyse dans une base de données

## Getting Started

### Pré-requis

Retrouvez la liste de tout les pré-requis pour lancer le projet.

* IDE utilisé : Visual Studio Code 1.85.1
* Gestionnaire de package : npm 10.1.0
* OS supported : MacOS, Linux, Windows
* Environmment Node.js : minimum v21.0.0
* Reactjs : 18.2.0

### Configuration

#### Cloner le Projet
Récupérer le projet sur votre machine en utilisant la commande suivante :
```bash
git clone https://github.com/CPNV-ES-RIA2/YANNICK.git ria-vision
```

#### Variables d'Environnement
Il faut ensuite copie le .env.example en .env et remplir les informations de connexion au SDK d'aws et pour la base de donnée RethinkDB

```bash
cp .env.example .env
```

## Installation
> :warning: **La suite de la procédure est executée pour un environnement MacOs** Les commandes peuvent différer selon votre environnement.

### Sur l'environnement de développement
Une fois le projet cloné et les prérequis installé, il faut installer les dépendances du projet avec la commande suivante :

```bash
npm install
```

Pour lancer le projet en local, utilisez la commande raccourcis suivante, qui va lancer le server sur le port 5173 : 
```bash
npm run dev
```
Accédez ensuite à l'application via l'url suivante : http://localhost:5173/

#### Tests
Pour lancer les tests, utilisez la commande suivante : 
```bash
npm run test
```
resultat attendu : 
```bash
 
```

Pour lancer un test spécifique, utilisez la commande suivante : 
```bash
jest tests
```

par exemple : 
```bash
jest labelDetector/tests/LabelDetector.test.js 
```
avec le resultat suivant : 
```bash

```

### Sur l'environnement de production

Commençons par build l'interface web avec la commande suivante : 
```bash
npm run build
```
resultat attendu : 
```bash
tchoune@yannicks-MacBook-Pro Bi1 % npm run build     

> bi-frontend@0.0.0 build
> vite build

vite v5.0.10 building for production...
✓ 32 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-4sK4E3Wk.css    1.39 kB │ gzip:  0.72 kB
dist/assets/index-XPzPoTB7.js   144.75 kB │ gzip: 46.60 kB
✓ built in 406ms
```

Chaque service peut être lancer indépendamment des autres. Pour cela, il faut se rendre dans le dossier du service et lancer la commande suivante : 
```bash
npm run dev
```

```shell
.
├── dataObject    //nodejs Bucket AWS
│   ├── libs
│   ├── tests
│   │   ├── download
│   │   └── images
│   └── uploads
├── dist
│   └── assets
├── labelDetector //nodejs AWS Rekognition et RethinkDB
│   ├── lib
│   │   ├── database
│   │   └── providers
│   └── rethinkdb_data
│       └── tmp
│   ├── tests
│   │   ├── download
│   │   └── images
├── public
├── src           //ReactJS
│   ├── assets
│   ├── components
│   └── styles
└── tests
    └── images
        └── tests
```

## Contribuer au Projet

  ### Convention de Nommage
  Nous suivons une convention de nommage claire pour assurer une lisibilité et une maintenabilité élevées du code. Voici quelques exemples basés sur votre code :

  **Classes** : Noms en CamelCase avec un préfixe indiquant leur rôle, par exemple `AwsDataObjectImpl` pour une implémentation d'un objet de données AWS.

  **Fonctions** : Noms en camelCase commençant par un verbe, par exemple `encode(data)`.

  **Variables et Instances** : Noms explicites en camelCase, comme `bucketName` ou `fileContent`.

  **Constantes** : Utilisez des majuscules avec des underscores, par exemple AWS.

  **Noms de Fichiers** : Pour les noms de fichiers, utilisez une lettre minuscule au début et pour les mots suivants, collez-les ensemble avec la première lettre de chaque nouveau mot en majuscule, comme `awsDataObjectImpl.js`.

### Pattern de Protection de Branche

1. **`main/master` :** 
   - **Protection :** Cette branche est protégée. Les commits directs sont interdits.
   - **Usage :** Seules les pull requests (PR) approuvées et testées peuvent être fusionnées dans `main/master`.
   - **Revue de Code :** Chaque PR doit être revue et approuvée par au moins une autre personne de l'équipe.
   - **Tests Automatiques :** Les tests automatisés doivent passer avant la fusion.

2. **Branches de Développement (`dev`, `feature/*`, `bugfix/*`, etc.) :**
   - **Protection :** Protection légère ou pas de protection. Selon les besoins du projet, vous pouvez choisir d'exiger des revues de code même pour ces branches.
   - **Usage :** 
     - `dev` sert de branche de développement principal.
     - `feature/*` pour le développement de nouvelles fonctionnalités.
     - `bugfix/*` pour les corrections de bugs.
   - **Fusion :** Ces branches peuvent être fusionnées dans `main/master` une fois qu'elles sont complètes, testées, et approuvées.

### Bonnes Pratiques
- **Noms des commit :** Utilisez des noms descriptifs pour vos branches, par exemple `feature: add-image-processing` ou `bugfix: login-issue` ou si c'est un developpement courrant "verbe + action"
- **Rebase et Squash :** Pour garder un historique propre, utilisez `rebase` pour mettre à jour votre branche avec `main/master` et `squash` vos commits avant de fusionner.
- **Commits Fréquents, Petits et Significatifs :** Cela facilite les revues de code et la compréhension de l'historique des changements.

## License

Le projet est sous licence MIT

## Contact

Yannick Perret - support par email exclusivement :  dev[at]yannickperret.com ou via une issue sur le projet github
