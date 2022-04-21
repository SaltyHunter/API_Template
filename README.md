## Template d'API Version 1.4.0


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

Consulter son profil GET : http://localhost:8080/api/${uuid}

Modifier son profil PUT : http://localhost:8080/api/${uuid}

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

# Template :

Consulter ses templates  GET : http://localhost:8080/api/${uuid}/template

Poster un template POST : http://localhost:8080/api/${uuid}/template

    {
        "name":
    }

Modifier son template PUT : http://localhost:8080/api/${uuid}/template/${id_template}

    {
        "name":
    }
    
Supprimer son template DELETE : http://localhost:8080/api/${uuid}/template/${id_template}


# EN COURS :

Ajout des tests

# Rapport sonarqube :

Overview :
<img src ="https://cdn.discordapp.com/attachments/499862865956831234/819299521221361724/sonar1.PNG">

Issues :
<img src ="https://cdn.discordapp.com/attachments/499862865956831234/819299521262649386/sonar2.PNG">


Security :

<img src ="https://cdn.discordapp.com/attachments/499862865956831234/819299522240315433/sonar3.PNG">

Measure :
<img src ="https://cdn.discordapp.com/attachments/499862865956831234/819299523209330765/sonar4.PNG">

Code :
<img src ="https://cdn.discordapp.com/attachments/499862865956831234/819299527571406918/sonar5.PNG">


# NB 
User.ts : delete json.password, même si la ligne est surligné fonctionnement ok, le mot de passe n'est pas envoyé dans le JSON
Template.ts : delete json.user, même si la ligne est surligné fonctionnement ok, les informations du user ne sont pas envoyées dans le JSON
