## Template d'API Version 1.4.0

# Génération de certificat SSL/TLS auto-signé :
        
        openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem

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

S'inscrire POST : https://localhost:8080/api/authenticate/signup

    {
        "username": ,
        "mail": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }
    
Se connecter POST : https://localhost:8080/api/authenticate/signin

    {
        "username": ,
        "password":  
    }

# Profil : 

Consulter son profil GET : https://localhost:8080/api/${uuid}

Modifier son profil PUT : https://localhost:8080/api/${uuid}

    {
        "username": ,
        "mail": ,
        "n_tel": ,
        "nom": ,
        "prenom": ,
        "password": , 
        "passwordConfirmation":
    }

Supprimer son profil DEL : http://localhost:8080/api/${uuid}

# Role :

Consulter les roles  GET_ALL : https://localhost:8080/api/roles/all
Consulter un role  GET_ALL : https://localhost:8080/api/roles/${id}

Poster un role POST : https://localhost:8080/api/roles/${id}
    {
        "role":
    }

Poster un role PUT : https://localhost:8080/api/roles/${id}

    {
        "role":
    }
    
Supprimer son template DELETE : https://localhost:8080/api/roles/${id}



# Template :

Consulter ses templates  GET_ALL : https://localhost:8080/api/${uuid}/template
Consulter un de ses templates  GET : https://localhost:8080/api/${uuid}/template/${id_template}

Poster un template POST : https://localhost:8080/api/${uuid}/template

    {
        "name":
    }

Modifier son template PUT : https://localhost:8080/api/${uuid}/template/${id_template}

    {
        "name":
    }
    
Supprimer son template DELETE : https://localhost:8080/api/${uuid}/template/${id_template}
