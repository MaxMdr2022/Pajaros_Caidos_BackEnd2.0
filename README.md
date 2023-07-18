# Pajaros Caidos Back-End

## Descripción

Esta API contiene rutas para crear/buscar/eliminar: Usuarios, Publicaciones, Comentarios, Reacciones y una seccion con informacion de aves.

## Instalación

1. Clona este repositorio en tu compu local.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

## Configuracion

1.  Crea un archivo .env fuera de la carpeta src del proyecto.
2.  Completa el archivo .env con la siguiente información:

        PORT=3001

        (Tu configuracion de postgres)
        DB_USER=postgres
        DB_PASSWORD= "tu pass de postgres"
        DB_HOST=localhost
        DB_PORT=5432
        DB_NAME=pajaros_caidos   <= El nombre que le coloques a la BD

        SECRET_KEY_JWT=M@aMglhTZ3d$VJp&U9Wu1Qht^ENPBx

        ADMIN_1_EMAIL=email1@live.com.ar
        ADMIN_1_PASS=admin123
        ADMIN_2_EMAIL=pajaros_caidos@hotmail.com
        ADMIN_2_PASS=admin123

## Ejecucion

1.  Para iniciar el servidor, ejecuta el siguiente comando en consola:

        npm run dev

Esto iniciará el servidor en el puerto especificado en el archivo .env.
En la carpeta "utils" hay un archivo 'Pajaros Caidos.postman_collection.json' importando este archivo en Postman puede probar los endpoints.

## Contribucion

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

      Crea una rama: git checkout -b mi-nueva-rama.
      Realiza tus cambios y agregalos: git add nombreDelArchivo
      Commitea las modificaciones: git commit -m 'cambios'.
      Realiza un push desde tu rama: git push.
      Abre una pull request en este repositorio.

## Cualquier duda al grupo de wp :D

## Endpoints

### Users

### Authorization Guarden

- Method: GET
- Endpoint: 'user/guarden'
- Authorization:
  - Bearer Token (obligatory): The token is entered
- Description: Returns a 200 status if the token is validated successfully.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "access": "Authorized access",
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "ACCESS DENIED",
                        "code": "ACCESS_DENIED"
                }
        }

### Log in

- Method: POST
- Endpoint: 'user/login'
- Request parameters:
  - 'email' (obligatory): User email (string).
  - 'password' (obligatory): User password (string).
- Description: Returns an object with the Json Web Token and the information of the user who started the session.
- Status code: 200 (OK)
- Response body:

                {
                        "JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRydW1fOTRAbG",
                        "user": {
                                "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                                "first_name": "Maxi",
                                "last_name": "Meder",
                                "nick_name": "Administrador",
                                "email": "drum_94@live.com.ar",
                                "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                                "avatar": "https://t4.ftcdn.net.jpg",
                                "country": "-",
                                "city": "-",
                                "phone_number": 0,
                                "birth_date": "9999-12-31",
                                "emailValidateCode": null,
                                "isVoluntary": false,
                                "isPrincipalAdmin": true,
                                "isAdmin": true,
                                "isBanned": false,
                                "formComplete": false,
                                "userEmailValidate": true,
                                "createdAt": "2023-07-12T21:29:54.790Z",
                                "updatedAt": "2023-07-12T21:29:54.790Z"
                        },
                        "status": "success"
                }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Invalid password.",
                        "code": "INVALID_BODY"
                }
        }

### Get Users

- Method: GET
- Endpoint: 'user/all'
- Query parameters:
  - 'filter=complete' (optional): It brings all the information of the users. (id, first_name, last_name, nick_name, email, password, avatar, country, city, phone_number, birth_date, emailValidateCode, isVoluntary, isPrincipalAdmin, isAdmin, isBanned, formComplete, userEmailValidate, createdAt, updatedAt ).
- Description: Returns an array with user information (id, nick_name, isVoluntary, isBanned, isAdmin).
- Successful response:
- Status code: 200 (OK)
- Response body:

           {
                "users": [
                        {
                                "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                                "nick_name": "Administrador",
                                "isVoluntary": false,
                                "isAdmin": true,
                                "isBanned": false
                        },
                        {
                                "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                "nick_name": "Administrador",
                                "isVoluntary": false,
                                "isAdmin": true,
                                "isBanned": false
                        },
                ],
                "status": "success"
        }

- Response body (query params filter=complete):

           {
                "0": {
                        "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                        "first_name": "Maxi",
                        "last_name": "Meder",
                        "nick_name": "Administrador",
                        "email": "drum_94@live.com.ar",
                        "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                        "avatar": "https://t4.ftcdn.net/jpg/04/75/00/99/.jpg",
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "isAdmin": true,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": true,
                        "createdAt": "2023-07-12T21:29:54.790Z",
                        "updatedAt": "2023-07-12T21:29:54.790Z"
                },
                "1": {
                        "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                        "first_name": "Clara",
                        "last_name": "Correa",
                        "nick_name": "Administrador",
                        "email": "pajaros_caidos@hotmail.com",
                        "password": "$2b$10$NMXyyktwebzmF8vnED/dlu2C3pLARRGTVgBfJ5E9tI9y8JX2hC1sq",
                        "avatar": "https://t4.ftcdn.net/jpg/0.jpg",
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "isAdmin": true,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": true,
                        "createdAt": "2023-07-12T21:29:54.958Z",
                        "updatedAt": "2023-07-12T21:29:54.958Z"
                },

                "status": "success"
                }

### Get User

- Method: GET
- Endpoint: 'user/:id'(user id)
- Query parameters:
  - 'filter=all' (optional): Returns the user's information plus an array of posts, an array of comments, and an array of reactions made by that user.
  - 'filter=publications':Returns the user's information plus an array with the publications made.
  - 'filter=comments':Returns the user's information plus an array with the comments made.
- Description: Returns a user with the following information: (id, first_name, last_name, nick_name, email, password, avatar, country, city, phone_number, birth_date, emailValidateCode, isVoluntary, isPrincipalAdmin, isAdmin, isBanned, formComplete, userEmailValidate, createdAt, updatedAt ).
- Successful response:
- Status code: 200 (OK)
- Response body:

           {
                "user": {
                        "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                        "first_name": "Clara",
                        "last_name": "Correa",
                        "nick_name": "Administrador",
                        "email": "pajaros_caidos@hotmail.com",
                        "password": "$2b$10$NMXyyktwebzmF8vnED/dlu2C3pLARRGTVgBfJ5E9tI9y8JX2hC1sq",
                        "avatar": "https://t4.ftcdn.net/jpg/04/75/00/99/360.jpg",
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "isAdmin": true,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": true,
                        "createdAt": "2023-07-12T21:29:54.958Z",
                        "updatedAt": "2023-07-12T21:29:54.958Z"
                },
                "status": "success"
        }

- Response body (query params filter=all):

           {
                "user": {
                        "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                        "first_name": "Clara",
                        "last_name": "Correa",
                        "nick_name": "Administrador",
                        "email": "pajaros_caidos@hotmail.com",
                        "password": "$2b$10$NMXyyktwebzmF8vnED/dlu2C3pLARRGTVgBfJ5E9tI9y8JX2hC1sq",
                        "avatar": "https://t4.ftcdn.net/jpg/04/75/00/99/36.jpg",
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "isAdmin": true,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": true,
                        "createdAt": "2023-07-12T21:29:54.958Z",
                        "updatedAt": "2023-07-12T21:29:54.958Z",
                        "publications": [
                                {
                                        "id": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                                        "title": "AIUDAA!! ",
                                        "description": " Que alimento deberia darle?",
                                        "image": [
                                        "img01.jpg"
                                        ],
                                        "isDeleted": false,
                                        "createdAt": "2023-07-17T18:41:16.525Z",
                                        "updatedAt": "2023-07-17T18:41:16.659Z",
                                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95"
                                }
                        ],
                                "comments": [
                                {
                                        "id": "86e11e61-64aa-4629-81e5-95d6d14bc03e",
                                        "comment": "muy buen post :D555",
                                        "isDeleted": false,
                                        "createdAt": "2023-07-13T17:34:12.256Z",
                                        "updatedAt": "2023-07-13T17:34:12.268Z",
                                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                        "publicationId": null
                                }
                        ],
                                "reactions": [
                                {
                                        "id": "5cd74540-c5d9-4078-b7d7-515333650f9c",
                                        "reaction": "like",
                                        "createdAt": "2023-07-17T18:41:55.776Z",
                                        "updatedAt": "2023-07-17T18:41:55.784Z",
                                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                        "publicationId": "4822bf58-be83-40d2-85c8-a6e7f8d122fa"
                                }
                        ]
                },
                "status": "success"
        }

## Create user

- Method: POST
- Endpoint: 'user/create'
- Description: Create a new user.
- Request parameters:

  - 'email'(obligatory): User email (string).
  - 'password' (obligatory): User password (string).
  - 'first_name' (obligatory): User name (string).
  - 'last_name' (obligatory): User last name (string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newUser": {
                        "id": "a5260e01-6c92-4e4c-b7e7-ed564fb9bbdd",
                        "avatar": "-",
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "isVoluntary": false,
                        "isPrincipalAdmin": false,
                        "isAdmin": false,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": false,
                        "email": "jua@hotmail.com",
                        "password": "$2b$10$I3jIOrrUZIivJit3gc9yeOxsUIPOgs9qh0WwLo7JO6B/4s/4R04Oa",
                        "first_name": "John",
                        "last_name": "Vo",
                        "nick_name": "jua",
                        "emailValidateCode": "760616",
                        "updatedAt": "2023-07-17T18:52:20.487Z",
                        "createdAt": "2023-07-17T18:52:20.487Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "There is a registered user with the email entered: jua@hotmail.com",
                        "code": "INVALID_BODY"
                }
        }

### validate user email

- Method: POST
- Endpoint: 'user/:id'(user id)
- Description: Check the email validation code.
- Request parameters:

  - 'code'(obligatory): Code number (string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "userEmailValidate": "Email validated successfully.",
                "status": "success"
        }

- Error response:

  - Status code: 404
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "The entered 14169 code is not valid.",
                        "code": "INVALID_BODY"
                }
        }

### create new code validation email

- Method: PATCH
- Endpoint: 'user/:id/code'(user id)
- Description: Generates a new email verification code and sends it to the user's email.

- Successful response:

  - Status code: 200 (OK)
  - Response body:

                {
                        "userEmailValidate": "Verification code sent successfully.",
                        "status": "success"
                }

- Error response:

  - Status code: 404
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Invalid id",
                        "code": "INVALID_PARAMETER"
                }
        }

### Update User

- Method: PUT
- Endpoint: 'user/update/:id' (user id)
- Description: Update data user.
- Request parameters:

  - 'first_name' (optional): User name (string).
  - 'last_name' (optional): User name (string).
  - 'nick_name' (optional): User name (string).
  - 'avatar' (optional): User name (string).
  - 'phone_number' (optional): User name (string).
  - 'country' (optional): User name (string).
  - 'city' (optional): User name (string).
  - 'birth_date' (optional): User name (string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "userUpdated": {
                        "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                        "first_name": "max",
                        "last_name": "Meder",
                        "nick_name": "Administrador",
                        "email": "drum_94@live.com.ar",
                        "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                        "avatar": "https://t4.ftcdn.net/jpg/.jpg",
                        "country": "Argentina",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "-",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "isAdmin": true,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": true,
                        "createdAt": "2023-07-12T21:29:54.790Z",
                        "updatedAt": "2023-07-17T20:23:30.833Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "User not found",
                        "code": "USER_NOT_FOUND"
                }
        }

### Admin actions

- Method: PATCH
- Endpoint: 'user/admin/:id/action'(user id)
- Description: The administrator executes an action on a user. (ban, volunteer etc.)isAdmin, isBanned, isVoluntary.
- Request parameters:

  - 'isAdmin' (optional): Dar/quitar permisos de administrador a usuario (boolean).
  - 'isBanned' (optional): Banear/desbanear usuario (boolean).
  - 'isVoluntary' (optional): Asignar a usuario como voluntario. (boolean).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "userMod": {
                        "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                        "first_name": "max",
                        "last_name": "Meder",
                        "nick_name": "Administrador",
                        "email": "drum_94@live.com.ar",
                        "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                        "avatar": "https://t4.ftcdn.net/jpg/04/75/00/9.jpg",
                        "country": "Argentina",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "-",
                        "emailValidateCode": null,
                        "isVoluntary": true,
                        "isPrincipalAdmin": true,
                        "isAdmin": true,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": true,
                        "createdAt": "2023-07-12T21:29:54.790Z",
                        "updatedAt": "2023-07-17T20:31:00.248Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "User not found",
                        "code": "USER_NOT_FOUND"
                }
        }

## PUBLICATIONS

### Get all publications

- Method: GET
- Endpoint: 'publication/all'
- Query parameters:
  - 'limit=2' (optional): Return of publications up to the limit of the quantity requested.(number)
- Description: Retorna un arreglo con la info, comentarios y reacciones de las publicaciones.(nota: solo devuelve hasta dos comentarios de cada publication)
- Successful response:
- Status code: 200 (OK)
- Response body:

               {
                "publications":
                        [
                                {
                                "id": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                                "title": "AIUDAA!! ",
                                "description": "Que alimento deberia darle?",
                                "image": [ "img01.jpg"],
                                "isDeleted": false,
                                "createdAt": "2023-07-17T18:41:16.525Z",
                                "updatedAt": "2023-07-17T18:41:16.659Z",
                                "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                "user": {
                                        "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                        "avatar": "https://t4.ftcdn.net/jpg/04/75/0.jpg",
                                        "nick_name": "Administrador"
                                },
                                "reactions": [
                                        {
                                        "id": "5cd74540-c5d9-4078-b7d7-515333650f9c",
                                        "reaction": "like",
                                        "createdAt": "2023-07-17T18:41:55.776Z",
                                        "updatedAt": "2023-07-17T18:41:55.784Z",
                                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                        "publicationId": "4822bf58-be83-40d2-85c8-a6e7f8d122fa"
                                        }
                                ],
                                "comments": [
                                        {
                                                "id": "effeb8a0-1594-4f26-98c4-c11968844e40",
                                                "comment": "A esa ave de la debe alimentar con semillas",
                                                "isDeleted": false,
                                                "createdAt": "2023-07-17T20:44:43.014Z",
                                                "updatedAt": "2023-07-17T20:44:43.167Z",
                                                "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                                "publicationId": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                                                "user": {
                                                        "nick_name": "Administrador"
                                                }
                                        }
                                ]
                                },

                        ],

                        "status": "success"

                }

### Get publication by id

- Method: GET
- Endpoint: 'publication/:id' (publication id)
- Description: Retorna un objeto con la info comentarios y reacciones de la publication.
- Successful response:
- Status code: 200 (OK)
- Response body:

              {
                "publication": {
                                "id": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                                "title": "AIUDAA!! ",
                                "description": "Que alimento deberia darle?",
                                "image": [
                                "img01.jpg"
                                ],
                                "isDeleted": false,
                                "createdAt": "2023-07-17T18:41:16.525Z",
                                "updatedAt": "2023-07-17T18:41:16.659Z",
                                "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                "user": {
                                "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                "avatar": "https://t4.ftcdn.net/jpg/04/75/0i.jpg",
                                "nick_name": "Administrador"
                                },
                                "comments": [
                                {
                                        "id": "effeb8a0-1594-4f26-98c4-c11968844e40",
                                        "comment": "A esa ava de la debe alimentar con semillas",
                                        "isDeleted": false,
                                        "createdAt": "2023-07-17T20:44:43.014Z",
                                        "updatedAt": "2023-07-17T20:44:43.167Z",
                                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                        "publicationId": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                                        "user": {
                                        "nick_name": "Administrador"
                                        }
                                }
                                ],
                                "reactions": [
                                {
                                        "id": "5cd74540-c5d9-4078-b7d7-515333650f9c",
                                        "reaction": "like",
                                        "createdAt": "2023-07-17T18:41:55.776Z",
                                        "updatedAt": "2023-07-17T18:41:55.784Z",
                                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                        "publicationId": "4822bf58-be83-40d2-85c8-a6e7f8d122fa"
                                }
                                ]
                        },
                        "status": "success"
                }

### create publication

- Method: POST
- Endpoint: 'publication/create/:id'(user id)
- Description: Create a new user.
- Request parameters:

  - 'title'(obligatory): (string).
  - 'description' (obligatory): (string).
  - 'image' (obligatory): ( array of string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

                {
                        "newPublication": {
                                "id": "4a1a6bd0-7a7e-4162-829a-a5673361bbd0",
                                "isDeleted": false,
                                "title": "AIUDAA!! ",
                                "description": "Que alimento deberia darle?",
                                "image": [
                                "img01.jpg"
                                ],
                                "updatedAt": "2023-07-17T20:53:54.813Z",
                                "createdAt": "2023-07-17T20:53:54.813Z",
                                "userId": null
                        },
                        "status": "success"
                }

- Error response:

  - Status code: 404
  - Error body:

                {
                        "status": "error",
                        "error": {
                                "message": "User not found",
                                "code": "USER_NOT_FOUND"
                        }
                }

### update publication

- Method: PUT
- Endpoint: 'publication/update/:id'(publication id)
- Description: Update the post title, description or images.
  - 'title' (optional): (string).
  - 'description' (optional): (string).
  - 'image' (optional): (array of string).
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "publicationUpdated": {
                        "id": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                        "title": "nuevo titulo",
                        "description": "Que alimento deberia darle?",
                        "image": [
                        "img01.jpg"
                        ],
                        "isDeleted": false,
                        "createdAt": "2023-07-17T18:41:16.525Z",
                        "updatedAt": "2023-07-17T23:16:00.124Z",
                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Publication not found",
                        "code": "PUBLICATION_NOT_FOUND"
                }
        }

### delete publication

- Method: DELETE
- Endpoint: 'publication/delete/:id' (publication id)
- Description: Elimina la publicacion relacionada a ese id. Nota: Elimina los comentarios y reacciones que esten relacionados a esa publicacion.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "publicationDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Publication not found",
                        "code": "PUBLICATION_NOT_FOUND"
                }
        }

## Comments

### get comment by id

- Method: GET
- Endpoint: 'comment/:id'(comment id)
- Description: Returns the comment related to the id.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "comment": {
                        "id": "01bbecf0-1ae8-4c3d-b6ab-46d0a734e36a",
                        "comment": "Deberias alimentarlo con semillas",
                        "isDeleted": false,
                        "createdAt": "2023-07-13T18:08:48.482Z",
                        "updatedAt": "2023-07-13T18:08:48.501Z",
                        "userId": "5bf39c11-5c36-45ee-af3f-fbe300c10876",
                        "publicationId": null
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Invalid comment id",
                        "code": "INVALID_PARAMETER"
                }
        }

### Create comment

- Method: POST
- Endpoint: 'comment/create/:id' (publication id)
- Request parameters:
  - 'comment' (obligatory): (string).
  - 'idUser' (obligatory): User id (string).
- Description: Create a new comment for the publication related to the id.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newComment": {
                        "id": "bcd48610-ef27-499a-bd5c-80fc79241f60",
                        "isDeleted": false,
                        "comment": "A esa ave se la debe alimentar con semillas",
                        "updatedAt": "2023-07-17T23:28:56.139Z",
                        "createdAt": "2023-07-17T23:28:56.139Z",
                        "userId": null,
                        "publicationId": null
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Publication not found",
                        "code": "PUBLICATION_NOT_FOUND"
                }
        }

### Update comment

- Method: PUT
- Endpoint: 'comment/update/:id' (comment id)
- Description: Update comment.
- Request parameters:
  - 'comment' (obligatory): (string).
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newComment": {
                        "id": "bcd48610-ef27-499a-bd5c-80fc79241f60",
                        "comment": "comentario actualizado xD",
                        "isDeleted": false,
                        "createdAt": "2023-07-17T23:28:56.139Z",
                        "updatedAt": "2023-07-17T23:31:49.615Z",
                        "userId": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                        "publicationId": "4a1a6bd0-7a7e-4162-829a-a5673361bbd0"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Comment not found",
                        "code": "COMMENT_NOT_FOUND"
                }
        }

### Delete comment

- Method: DELETE
- Endpoint: 'comment/delete/:id' (comment id)
- Description: Delete the comment related to the id.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "quantityCommentDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Comment not found",
                        "code": "COMMENT_NOT_FOUND"
                }
        }

## REACTION

### Create reaction

- Method: POST
- Endpoint: 'reaction/create/:id' (publication id)
- Request parameters:
  - 'reaction' (obligatory): Las unicas reacciones soportadas son: 'love', 'like', 'applause', 'laugh', 'sad', 'free', 'angry'. (string).
    -'idUser'(obligatory): User id (string)
- Description: Create a new category.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newReaction": {
                        "id": "5cd74540-c5d9-4078-b7d7-515333650f9c",
                        "reaction": "like",
                        "updatedAt": "2023-07-17T18:41:55.776Z",
                        "createdAt": "2023-07-17T18:41:55.776Z",
                        "userId": null,
                        "publicationId": null
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Publication not found",
                        "code": "PUBLICATION_NOT_FOUND"
                }
        }

### Delete reaction

- Method: DELETE
- Endpoint: 'reaction/delete/:id' (reaction id)
- Description: Removes the reaction related to the ID.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "reactionDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Reaction not found",
                        "code": "REACTION_NOT_FOUND"
                }
        }

## BIRDS

### Get all birds

- Method: GET
- Endpoint: 'bird/all'
- Query parameter:
  - 'limit' (optional): Devuelve hasta la cantidad solicitada (number).
  - 'location' (optional): Filtra por pais.
  - 'color' (optional): Filtra por color.
- Description: Un arreglo con datos de las aves registradas.
- Successful response (simple):

  - Status code: 200 (OK)
  - Response body:

        {
                "birds": [
                        {
                        "id": "296304bc-63c1-4d68-85f4-45918ee925c4",
                        "name": "paloma",
                        "scientificName": "pp",
                        "image": [
                                "img.jpg",
                                "imagen2.jpg"
                        ],
                        "location": [
                                "Argentina",
                                "España"
                        ],
                        "size": "medium",
                        "color": "white",
                        "description": "brrr brrr brrr",
                        "createdAt": "2023-07-17T23:42:10.303Z",
                        "updatedAt": "2023-07-17T23:42:10.303Z"
                        },
                        {
                        "id": "f5cddca5-bacc-4977-af19-9b9ab83c595b",
                        "name": "gorrion",
                        "scientificName": "pp",
                        "image": [
                                "img.jpg",
                                "imagen2.jpg"
                        ],
                        "location": [
                                "Argentina",
                                "Japon"
                        ],
                        "size": "small",
                        "color": "brown",
                        "description": "brrr brrr brrr",
                        "createdAt": "2023-07-17T23:42:57.375Z",
                        "updatedAt": "2023-07-17T23:42:57.375Z"
                        }
                ],
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "message": "Birds not found"
        }

## Create Bird

name, scientificName, image, location, size, color, description

- Method: POST
- Endpoint: 'bird/create'
- Request parameters:
  - 'name' (obligatory): Category name (string).
  - 'scientificName' (obligatory): (string).
  - 'image' (obligatory): (array of string).
  - 'location' (obligatory): (array of string).
  - 'size' (obligatory): (string).
  - 'color' (obligatory): (string).
  - 'description' (obligatory): (string).
- Description: Create a new category.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newBird": {
                        "id": "f5cddca5-bacc-4977-af19-9b9ab83c595b",
                        "name": "gorrion",
                        "scientificName": "pp",
                        "image": [
                        "img.jpg",
                        "imagen2.jpg"
                        ],
                        "location": [
                        "Argentina",
                        "Japon"
                        ],
                        "size": "small",
                        "color": "brown",
                        "description": "brrr brrr brrr",
                        "updatedAt": "2023-07-17T23:42:57.375Z",
                        "createdAt": "2023-07-17T23:42:57.375Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "To create a bird you must enter name, scientificName, image, location, size, color and description.",
                        "code": "INVALID_BODY"
                }
        }

### Update bird

- Method: PUT
- Endpoint: 'bird/update/:id' (bird id)
- Description: Update bird.
- Request parameters:
  - 'name' (optional): Category name (string).
  - 'scientificName' (optional): (string).
  - 'image' (optional): (array of string).
  - 'location' (optional): (array of string).
  - 'size' (optional): (string).
  - 'color' (optional): (string).
  - 'description' (optional): (string).
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "dataValues": {
                        "id": "296304bc-63c1-4d68-85f4-45918ee925c4",
                        "name": "Paloma",
                        "scientificName": "pp",
                        "image": [
                        "nuevaimagen.jpg"
                        ],
                        "location": [
                        "Argentina",
                        "España"
                        ],
                        "size": "medium",
                        "color": "white",
                        "description": "brrr brrr brrr",
                        "createdAt": "2023-07-17T23:42:10.303Z",
                        "updatedAt": "2023-07-17T23:56:29.736Z"
                },
                "isNewRecord": false,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Bird not found",
                        "code": "BIRD_NOT_FOUND"
                }
        }
