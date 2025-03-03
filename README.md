# 🎨 Galerie d'Art Numérique - Art Numérique et Génératif

Un site permettant aux utilisateurs d'uploader et d'exposer des œuvres générées avec p5.js ou tout autre outil numérique.

## 🚀 Fonctionnalités

✅ **Uploader des images** depuis son ordinateur  
✅ **Afficher une galerie dynamique** des images envoyées  
✅ **Stocker les images** dans un dossier `/uploads/` et mettre à jour automatiquement la liste dans `images.json`  
✅ **Hébergement sur Railway** pour une accessibilité en ligne  

---


## 🛠️ Installation et Exécution en Local

### 1️⃣ Cloner le projet
```sh
git clone https://github.com/Jottiana/art-gallery.git
cd art-gallery
```

### 2️⃣ Installer les dépendances
`npm install`

### 3️⃣ Lancer le serveur en local
`node server.js`

Ouvrir http://localhost:3000 pour voir la galerie.

---


## 🔥 Déploiement sur Railway

### 📌 1. Créer un compte Railway

Aller sur https://railway.app/ et se connecter avec GitHub.

### 📌 2. Lancer le déploiement

  Créer un nouveau projet sur Railway.
  Connecter le dépôt GitHub et sélectionner galerie-artistique.
  Ajouter une variable d’environnement dans Railway :
  `PORT = 3000`
  Lancer le déploiement 🚀 Railway générera une URL publique pour ton site.


## 📜 License

Ce projet est sous **licence MIT** - voir [LICENSE](LICENSE) pour plus de détails.