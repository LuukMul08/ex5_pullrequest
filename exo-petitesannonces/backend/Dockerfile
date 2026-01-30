# Image Node légère
FROM node:18-alpine

# Répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json si présent
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD ["node", "./src/server.js"]
