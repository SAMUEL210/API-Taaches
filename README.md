by SAMUEL210 => Samuel Ibou MARONE, samuel210@live.fr https://samuelmarone.fr

API Taaches 

API de l'application TAACHES de Samuel Ibou MARONE https://github.com/SAMUEL210/Taaches

API qui gere le Backend, sauvegarde des taaches sur une base de donné mongo DB

API ONLINE : https://api-taaches-smarone.herokuapp.com/

Endpoints :
     /home (Présente l'API)
     /utilisateur
     /login
     /dates
     /taache

TOKEN :
    header-text: x-access-token
    header-value : token dans /login

UTILISATEUR :
    - options : { nom: string, prenom: string, email: string, mp: string}
    - params : id
    POST
        - https://api.exemple.com/utilisateurs
    GET
        - https://api.exemple.com/utilisateurs
        - https://api.exemple.com/utilisateurs/id
    PUT
        - https://api.exemple.com/utilisateurs/id
    DELETE
        - https://api.exemple.com/utilisateurs/id
        
LOGIN :
    - option : (email: string, mp: string )
    - Retourne:
        - id : id de l'utilisateur connecté
        - token : Dans les headers

DATES : 
    - option : ( texte(date): String, utilisateur(id utilisateur): String)

    POST
        - https://api.exemple.com/dates
    GET
        - https://api.exemple.com/dates
        - https://api.exemple.com/dates/id
        - https://api.exemple.com/dates/u/id (Get dates by id utilisateur)
    PUT
        - https://api.exemple.com/dates/id
    DELETE
        - https://api.exemple.com/dates/id 

TAACHES : 
    - option : ( utilisateur (idUtilisateur): String, date (idDate): String, texte: String, complete: Boolean )

    POST
        - https://api.exemple.com/taaches
    GET
        - https://api.exemple.com/taaches
        - https://api.exemple.com/taaches/id
        - https://api.exemple.com/taaches/u/id (get all taaches by user id)
        - https://api.exemple.com/taaches/d/id (Get all taaches by date id)
    PUT
        - https://api.exemple.com/taaches/id
    DELETE
        - https://api.exemple.com/taaches/id
        - https://api.exemple.com/taaches/s/u/id (Delete all taaches of the user(id))

