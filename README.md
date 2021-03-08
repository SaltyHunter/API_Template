## Template d'API Version 1.2.0

# Modules utilisés :

- Typeorm (DB)
- Babel
- Nodemon
- Eslint
- Log4j
- mjml2html
- Express
- Sendgrid
- Passport
- Types

...

# Installation

Une fois le répo cloné, faite un :

        yarn install
    
# Lancement 

Pour les phases de développement

        yarn dev
    
Pour la version final

        yarn start
    
# Configuration du .env

HOST=

PORT=

DATABASE_URL=

JWT_ENCRYPTION=

SENDGRID_API_KEY=

SENDGRID_MAIL=

# Gestion des mails (SENDGRID) :

Envoie de mail lors de la création d'un utilisateur, et suppression d'un utilisateur.

# Log (log4j):

- Configuration des logs via log.ts 
    - console
    - ERROR.log
    - INFO.log
    ...

## Appels JSON :

# Authentification : 

S'inscrire POST : http://localhost:8080/api/authenticate/signup

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }
    
Se connecter POST : http://localhost:8080/api/authenticate/signin

    {
        "username": ,
        "password":  
    }

# Profil : 

Consulter son profil GET : http://localhost:8080/api/users/${uuid}

Modifier son profil PUT : http://localhost:8080/api/users/${uuid}

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }

Supprimer son profil DEL : http://localhost:8080/api/users/${uuid}

# Template :

Consulter ses dossiers  GET : http://localhost:8080/api/users/${uuid}/template

Poster un dossier POST : http://localhost:8080/api/users/${uuid}/template

    {
        "name":
    }

Modifier son dossier PUT : http://localhost:8080/api/users/${uuid}/template/${id_template}

    {
        "name":
    }
    
Supprimer son dossier DELETE : http://localhost:8080/api/users/${uuid}/template/${id_template}


# EN COURS :

Ajout d'un template pour l'orm : Prisma

# NB des modules à mettre à jour

warning mjml > mjml-core > juice > cheerio > cheerio-select-tmp@0.1.1: Use cheerio-select instead

warning @babel/cli > @nicolo-ribaudo/chokidar-2 > braces > snapdragon > source-map-resolve > resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated

warning @babel/cli > @nicolo-ribaudo/chokidar-2 > braces > snapdragon > source-map-resolve > urix@0.1.0: Please see https://github.com/lydell/urix#deprecated

warning @types/dotenv@8.2.0: This is a stub types definition. dotenv provides its own type definitions, so you do not need this installed.

warning @types/moment@2.13.0: This is a stub types definition for Moment (https://github.com/moment/moment). Moment provides its own type definitions, so you don't need @types/moment installed!

User.ts : delete json.password, même si la ligne est surligné fonctionnement ok, le mot de passe n'est pas envoyé dans le JSON