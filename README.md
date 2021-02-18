## Template d'API Version 1.0.0

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

# Configuration du .env

HOST=

PORT=

DATABASE_URL=

JWT_ENCRYPTION=

SENDGRID_API_KEY=

# Gestion des mails (SENDGRID) :

Envoie de mail lors de la création d'un utilisateur, et suppression d'un utilisateur.

# Log (log4j):

- Configuration des logs sur le terminal de commande via log.ts

- Configuration du fichier de log (/log/api.log) via log4j.ts

Utilisation d'un fonction "transform" dans utils.ts pour indiquer l'emplacement de l'info, erreur etc...

## Appels JSON :

# Authentification : 

- S'inscrire POST : http://localhost:8080/api/authenticate/signup

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }
    
- Se connecter POST : http://localhost:8080/api/authenticate/signin

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
