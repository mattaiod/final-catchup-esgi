

Projet réalisé avec les participants:
- Matteo 
- Kinan 
- Jeremy
- Sonny
  
# Prérequis

Assurez-vous d'avoir installé `pnpm` sur votre machine. Si ce n'est pas le cas, vous pouvez l'installer en utilisant la commande suivante :

  

```bash

npm  install  -g  pnpm
```

# Lancer le projet
## Backend

  

Pour lancer le backend, suivez les étapes suivantes :

  

1. Naviguez vers le dossier `backend` :

  

```bash

cd  backend
```

2.  Installez les dépendances :

```bash
pnpm  i
```

3.  Ouvrez deux terminaux en parallèle. Dans le premier, exécutez la commande suivante pour construire le code en hot update :

```bash
pnpm  build:dev
```
et dans un autre terminal pour lancer le serveur en hot update avec la commande :
```bash
pnpm  start:dev
```

## Frontend
1. Naviguez vers le dossier `frontend` :

  

```bash

cd  frontend
```

2.  Installez les dépendances :

```bash

pnpm  install
```

3.  Pour lancer le frontend, exécutez la commande suivante :

```bash

pnpm  run  dev
```

## MongoDB
1. Assurez vous d'avoir votre logiciel Docker de lancé
2. Lancer le docker MongoDb avec :
```bash
docker-compose  up
```

