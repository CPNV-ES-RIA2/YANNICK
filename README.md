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

ATTENTION : Avant de lancer le projet en local, il faut vous assurer que vous avez bien lancé les services backends disponible : (Projet)[https://github.com/YannickPerret/RIA-Vision.git]

Retrouvez la liste de tout les pré-requis pour lancer le projet.

* IDE utilisé : Visual Studio Code 1.85.1
* Gestionnaire de package : npm 10.1.0
* OS supported : MacOS, Linux, Windows
* Environmment Node.js : minimum v21.0.0
* Reactjs : 18.2.0

### Docker
Pour lancer le projet avec Docker, il faut installer Docker sur votre machine. Pour cela, suivez les instructions sur le site officiel de Docker : https://docs.docker.com/get-docker/.

#### Variables d'Environnement
Il faut copier le .env.example en .env et remplir les informations.

#### Lancement de projet avec Docker en standalone

Pour lancer le projet avec Docker, utilisez la commande suivante pour build l'image :

```bash
docker build -t frontend . 
```

Ensuite, lancez le container avec la commande suivante :

```bash
docker run -d -p 5173:5173 frontend
```

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
Résultat : 
```bash
tchoune@yannicks-MacBook-Pro YANNICK % npm install

added 319 packages, and audited 320 packages in 14s

109 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Pour lancer le projet en local, utilisez la commande raccourcis suivante, qui va lancer le server sur le port 5173 : 
```bash
npm run dev
```

Résultat : 
```bash
  VITE v5.2.6  ready in 422 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.xxx.56.89:5173/
  ➜  Network: http://19x.168.xx.1:5173/
  ➜  press h + enter to show help
```

Accédez ensuite à l'application via l'url suivante : http://localhost:5173/

#### Tests
Pour lancer les tests, dans un nouveau terminal, utilisez la commande suivante : 
Version avec backend active : 
```bash
npm run test tests/interface.test.js
```
resultat attendu : 
```bash
 tchoune@yannicks-MacBook-Pro ria2-frontend % npm run test tests/interface.test.js

> bi-frontend@0.0.0 test
> npx playwright test tests/interface.test.js


Running 8 tests using 1 worker

  ✓  1 [Chromium] › interface.test.js:6:5 › Access Website BDD Tests › access website (121ms)
  ✓  2 [Chromium] › interface.test.js:22:5 › React View BDD Tests › submit analysis with an existing image and default values (3.1s)
  ✓  3 [Chromium] › interface.test.js:35:5 › React View BDD Tests › attempt to submit form without an image (242ms)
  ✓  4 [Chromium] › interface.test.js:48:5 › React View BDD Tests › attempt to upload a non-image file (256ms)
  ✓  5 [Chromium] › interface.test.js:69:5 › Form Submission Tests › submit form with non-conform minConfidence value (253ms)
  ✓  6 [Chromium] › interface.test.js:86:5 › Form Submission Tests › submit form with changed values for maxLabel and minConfidence (2.5s)
  ✓  7 [Chromium] › interface.test.js:104:5 › Form Submission Tests › submit form with honney pot value filled (216ms)
  ✓  8 [Chromium] › interface.test.js:126:5 › Language Selection Tests › change application language without page reload (195ms)

  8 passed (7.4s)

```

Pour la version mockup sans backend : 
```bash
npm run test tests/interfaceWithIntercept.test.js
```

résultat attendu : 
```bash
tchoune@yannicks-MacBook-Pro ria2-frontend % npm run test tests/interfaceWithIntercept.test.js


> bi-frontend@0.0.0 test
> npx playwright test tests/interfaceWithIntercept.test.js


Running 5 tests using 1 worker

  ✓  1 [Chromium] › interfaceWithIntercept.test.js:7:5 › Access Website BDD Tests › access website (122ms)
  ✓  2 [Chromium] › interfaceWithIntercept.test.js:23:5 › React View BDD Tests › submit analysis with an existing image and default values (295ms)
  ✓  3 [Chromium] › interfaceWithIntercept.test.js:80:5 › Form Submission Tests › submit form with non-conform minConfidence value (255ms)
  ✓  4 [Chromium] › interfaceWithIntercept.test.js:98:5 › Form Submission Tests › submit form with honney pot value filled (253ms)
  ✓  5 [Chromium] › interfaceWithIntercept.test.js:120:5 › Language Selection Tests › change application language without page reload (197ms)

  5 passed (1.7s)
```

#### Docker Test : 
Pour lancer les tests avec Docker, utilisez la commande suivante pour build l'image :

```bash
docker build --target test -t frontend-test . 
```

Ensuite, lancez le container avec la commande suivante :

```bash
 docker run -it frontend-test:latest npm run test

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

## Structure du Projet
```shell
.
├── public
├── src
│ ├── assets
│ ├── components
│ ├── languages
│ ├── providers
│ └── styles
├── test-results
└── tests
    ├── features
    └── images

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
