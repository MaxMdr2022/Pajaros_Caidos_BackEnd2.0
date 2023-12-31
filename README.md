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
- Description: Returns an object with the information of the user who started the session and saves a JWT in cookies for validation in private routes.
- Status code: 200 (OK)
- Response body:

                {
                        "user": {
                                "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                                "first_name": "Maxi",
                                "last_name": "Meder",
                                "nick_name": "Administrador",
                                "email": "dr@live.com.ar",
                                "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                                "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                                } ,
                                "country": "-",
                                "city": "-",
                                "phone_number": 0,
                                "birth_date": "9999-12-31",
                                "description":"-",
                                "contact":"-",
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

  - 'verbose'='simple' (optional): Returns the following user information: id, first_name, last_name, nick_name, email, avatar, isVoluntary, isAdmin, isBanned, description, contact.
  - 'userStatus' (optional): Filter users by their status. Only supported: 'isVoluntary', 'isAdmin', 'isBanned'.
  - 'last_name'= userLastName(optional): Search for the user/s by their last_name.
  - 'userPerPage'= 9 (optional): The number of users per page.
  - 'pageNumber'= 1 (optional): The page.

- Description: Returns an array with user information.
- Successful response:
- Status code: 200 (OK)
- Response body (query params verbose=simple):

           {
                "users": [
                        {
                                "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                                "nick_name": "Administrador",
                                "first_name": "Tony",
                                "last_name": "Stark",
                                "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                                } ,
                                "isAdmin": true,
                                "isVoluntary": false,
                                "isBanned": false,
                                "description": "-",
                                "contact": "-",
                                "email": "dr@live.com.ar"
                        },
                        {
                                "id": "ad01b19f-f414-4135-ab8d-02591abe9e95",
                                "nick_name": "La_araña_que_pica",
                                "first_name": "Peter",
                                "last_name": "Parker",
                                "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                                } ,
                                "isAdmin": true,
                                "isVoluntary": true,
                                "isBanned": false,
                                "description": "-",
                                "contact": "-",
                                "email": "pp@hotmail.com"
                        },
                ],
                "status": "success"
        }

- Response body:

           {
                        "users": [
                                {
                                        "id": "9e88084d-b944-4c51-b945-183b5e98de24",
                                        "first_name": "Tony",
                                        "last_name": "Stark",
                                        "nick_name": "Administrador",
                                        "email": "dr@live.com.ar",
                                        "password": "$2b$10$ajJcg58D3GX8ZKbA4MQQWisy2025C.Cjq56",
                                        "avatar":{
                                                "avatar_url": "https://t4.ftcdn.net.jpg",
                                                public_id: "-",
                                                secure_url: "-"
                                        } ,
                                        "country": "-",
                                        "city": "-",
                                        "phone_number": 0,
                                        "birth_date": "9999-12-31",
                                        "description": "-",
                                        "contact": "-",
                                        "emailValidateCode": null,
                                        "isVoluntary": false,
                                        "isPrincipalAdmin": true,
                                        "isAdmin": true,
                                        "isBanned": false,
                                        "formComplete": false,
                                        "userEmailValidate": true,
                                        "createdAt": "2023-07-29T02:13:41.035Z",
                                        "updatedAt": "2023-07-29T02:13:41.035Z"
                                },
                                {
                                        "id": "e567e7f4-a38b-4d0b-a313-2807af2762ef",
                                        "first_name": "Peter",
                                        "last_name": "Parker",
                                        "nick_name": "La_araña_que_pica",
                                        "email": "pp@hotmail.com",
                                        "password": "$2b$10$D8cYgJ8/FTYu1C3ig0IsKPzio8Xjm",
                                        "avatar":{
                                                "avatar_url": "https://t4.ftcdn.net.jpg",
                                                public_id: "-",
                                                secure_url: "-"
                                        } ,
                                        "country": "-",
                                        "city": "-",
                                        "phone_number": 0,
                                        "birth_date": "9999-12-31",
                                        "description": "-",
                                        "contact": "-",
                                        "emailValidateCode": null,
                                        "isVoluntary": false,
                                        "isPrincipalAdmin": true,
                                        "isAdmin": true,
                                        "isBanned": false,
                                        "formComplete": false,
                                        "userEmailValidate": true,
                                        "createdAt": "2023-07-29T02:13:41.174Z",
                                        "updatedAt": "2023-07-29T02:13:41.174Z"
                                }
                        ],
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
                        "first_name": "Peter",
                        "last_name": "Parker",
                        "nick_name": "La_araña_que_pica",
                        "email": "pp@hotmail.com",
                        "password": "$2b$10$NMXyyktwebzmF8vnED/dlu2C3pLARRGTVgBfJ5E9tI9y8JX2hC1sq",
                        "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                        } ,
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "description": "-",
                        "contact": "-",
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
                        "first_name": "Peter",
                        "last_name": "Parker",
                        "nick_name": "La_araña_que_pica",
                        "email": "pp@hotmail.com",
                        "password": "$2b$10$NMXyyktwebzmF8vnED/dlu2C3pLARRGTVgBfJ5E9tI9y8JX2hC1sq",
                        "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                        } ,
                        "country": "-",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "9999-12-31",
                        "emailValidateCode": null,
                        "description": "-",
                        "contact": "-",
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
                                        {
                                                "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
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
                        "id": "a3b4e8af-926f-4610-adb9-43ad04597369",
                        "birth_date": "9999-12-31",
                        "isVoluntary": false,
                        "isPrincipalAdmin": false,
                        "isAdmin": false,
                        "isBanned": false,
                        "formComplete": false,
                        "userEmailValidate": false,
                        "registerWithAuth0": false,
                        "email": "batman@live.com",
                        "password": "$2b$10$CCmGUDzDvHo2g4Dp5Pz3DetFeiYw/7lcY4wVkkoJjHV9S4scsg8ii",
                        "first_name": "bruce",
                        "last_name": "Weyne",
                        "avatar": {
                        "secure_url": "https://res.cloudinary.com//USER/456212_yncwde.png"
                        },
                        "nick_name": "batman",
                        "emailValidateCode": "537148",
                        "updatedAt": "2023-09-09T20:11:49.380Z",
                        "createdAt": "2023-09-09T20:11:49.380Z",
                        "country": null,
                        "city": null,
                        "province": null,
                        "phone_number": null,
                        "age": null,
                        "description": null,
                        "contact": null
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
  - 'avatar' (optional): User name (files).
  - 'phone_number' (optional): User name (string).
  - 'country' (optional): User name (string).
  - 'city' (optional): User name (string).
  - 'birth_date' (optional): User name (string).
  - 'description' (optional): User name (string).
  - 'contact' (optional): User name (string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "userUpdated": {
                        "id": "3103333a-fabf-40ef-b88f-699a59cc8510",
                        "first_name": "max",
                        "last_name": "Meder",
                        "nick_name": "mgm",
                        "email": "dr@live.com.ar",
                        "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                        "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                        } ,
                        "country": "Argentina",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "-",
                        "emailValidateCode": null,
                        "isVoluntary": false,
                        "isPrincipalAdmin": true,
                        "description": "-",
                        "contact": "-",
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

### update password

- Method: PUT
- Endpoint: 'user/update-password/:id' (user id)
- Description: Update password user.
- Request parameters:

  - 'oldPassword' (obligatory): (string).
  - 'newPassword' (obligatory): (string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "userUpdated": [
                        1
                ],
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Invalid password.",
                        "code": "INVALID_PASSWORD"
                }
        }

### generate a new password (The new password is sent to the user's email.)

- Method: POST
- Endpoint: 'user/generate-password'
- Description: This route is used when the user clicks on "forgot my password" It generates a new one and sends it to them by email.
- Request parameters:

  - 'email' (obligatory): (string).

- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "userPassword": "Password generated successfully",
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "There is no registered user with the email: email@123.com",
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
                        "email": "dr4@live.com.ar",
                        "password": "$2b$10$iULBHrQVmEdynQ0dWNrkG.RSpn.49jHJVKUWwWMK9MZDMMMdVOE3y",
                        "avatar":{
                                        "avatar_url": "https://t4.ftcdn.net.jpg",
                                        public_id: "-",
                                        secure_url: "-"
                        } ,
                        "country": "Argentina",
                        "city": "-",
                        "phone_number": 0,
                        "birth_date": "-",
                        "emailValidateCode": null,
                        "description": "-",
                        "contact": "-",
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
  - 'limitComments=2' (optional): Limit the number of comments on posts.(number)
  - 'pageNumber=2' (optional): Number page.(number)
  - 'postPerPage=2' (optional): Publications per page.(number)
  - 'orderCreate' (optional): Ordena las publicaciones de forma ascendente o descendente (valores admitidos 'asc' o 'desc')
- Description: Retorna un arreglo con la info, comentarios y reacciones de las publicaciones.
- Successful response:
- Status code: 200 (OK)
- Response body:

               {
                "totalPages": 2,
                "publications":
                        [
                                {
                                "id": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                                "title": "AIUDAA!! ",
                                "description": "Que alimento deberia darle?",
                                "image": [
                                        {
                                                "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                                        ],
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
                                        {
                                                "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
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
  - 'image' (obligatory): ( files).

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
                                        {
                                                "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
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
  - 'newImage' (optional): (files).
  - 'deleteImages' (optional): ( array of string) pasar el/los public_id ejemplo: ["PUBLICATIONS/gpxzjaerbhylpsqg9emf"].
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "publicationUpdated": {
                        "id": "4822bf58-be83-40d2-85c8-a6e7f8d122fa",
                        "title": "nuevo titulo",
                        "description": "Que alimento deberia darle?",
                        "image": [
                                        {
                                                "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
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
  - 'idUser'(obligatory): User id (string)
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
  - 'name' (optional): Busca ave por el nombre
  - 'pageNumber'= 1 (optional): Numero de la pagina
  - 'birdPerPage'= 9 (optional): Aves por pagina

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
                                {
                                        "public_id": "BIRDS/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
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

### Create Bird

- Method: POST
- Endpoint: 'bird/create'
- Request parameters:
  - 'name' (obligatory): Bird name (string).
  - 'scientificName' (obligatory): (string).
  - 'image' (obligatory): (files).
  - 'location' (obligatory): (array of string).
  - 'size' (obligatory): (string).
  - 'color' (obligatory): (string).
  - 'description' (obligatory): (string).
- Description: Create a new bird.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newBird": {
                        "id": "f5cddca5-bacc-4977-af19-9b9ab83c595b",
                        "name": "gorrion",
                        "scientificName": "pp",
                        "image": [
                                {
                                        "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
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
  - 'name' (optional): Bird name (string).
  - 'scientificName' (optional): (string).
  - 'newImage' (optional): (files).
  - 'deleteImages' (optional): (array of string) ["public_id"].
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
                                {
                                        "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
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

## SHOP

### Get item by id

- Method: GET
- Endpoint: 'shop/item/:id'
- Description: Returns the item related to the id.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "item": {
                        "id": "d0453780-c3d3-4897-93b9-d1b657ef36b6",
                        "title": "Remera imagen paloma",
                        "description": "Remera algodon ...",
                        "image": [
                                {
                                        "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                        ],
                        "price": 5000,
                        "createdAt": "2023-07-29T03:51:06.030Z",
                        "updatedAt": "2023-07-29T03:51:06.030Z",
                        "categories": [
                        {
                                "id": "9d0aad61-7dde-4143-98a7-257cdb9a9462",
                                "name": "talle L"
                        }
                        ]
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "there is no item with that id",
                        "code": "INVALID_BODY"
                }
        }

### Get all items

- Method: GET
- Endpoint: 'shop/items'
- Query parameter:

  - 'limit' (optional): Devuelve hasta la cantidad solicitada (number).
  - 'category' (optional): Filtra por categoria.
  - 'name' (optional): Busca por nombre del title.
  - 'minPrice' (optional): Trae los items que esten en el rango del precio (setear query minPrice y maxPrice)
  - 'minPrice' (optional): Trae los items que esten en el rango del precio (setear query minPrice y maxPrice)
  - 'orderPrice' (optional): Ordena los items por el precio (setear query asc / desc)
  - 'orderName' (optional): Ordena los items alfabéticamente (setear query asc / desc)
  - 'orderCreate' (optional): Ordena los items por fecha de creación (setear query asc / desc)
  - 'pageNumber'= 1 (optional): Numero de la pagina
  - 'itemPerPage'= 9 (optional): items por pagina

- Description: Un arreglo con datos de los items.
- Successful response (simple):

  - Status code: 200 (OK)
  - Response body:

        {
                "items": [
                        {
                        "id": "d0453780-c3d3-4897-93b9-d1b657ef36b6",
                        "title": "Remera imagen paloma",
                        "description": "Remera algodon ...",
                        "image": [
                                        {
                                                "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                        ],
                        "price": 5000,
                        "createdAt": "2023-07-29T03:51:06.030Z",
                        "updatedAt": "2023-07-29T03:51:06.030Z",
                        "categories": [
                                {
                                "id": "9d0aad61-7dde-4143-98a7-257cdb9a9462",
                                "name": "talle L"
                                }
                        ]
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

### Create item

- Method: POST
- Endpoint: 'shop/item'
- Request parameters:

  - 'title' (obligatory): (string).
  - 'description' (obligatory): (string).
  - 'price' (obligatory): (number).
  - 'image' (obligatory): (files).
  - 'category' (obligatory): (array of string) ["talle L"].

- Description: Create a new item.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newItem": {
                        "id": "d0453780-c3d3-4897-93b9-d1b657ef36b6",
                        "title": "Remera imagen paloma",
                        "description": "Remera algodon ...",
                        "price": 5000,
                        "image": [
                                {
                                        "public_id": "SHOP/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                         ],
                        "updatedAt": "2023-07-29T03:51:06.030Z",
                        "createdAt": "2023-07-29T03:51:06.030Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "category must be provided and must be a string or number.",
                        "code": "INVALID_BODY"
                }
        }

### Update item

- Method: PUT
- Endpoint: 'shop/item/:id'
- Request parameters:

  - 'title' (optionals): (string).
  - 'description' (optionals): (string).
  - 'price' (optionals): (number).
  - 'newImage' (optionals): (files).
  - 'deleteImages' (optionals): (array of string) ['public_id'].
  - 'category' (optional): (array of string) ["talle m", "blanco"]. NOTA: agrega categorias, para sacar usar la ruta PATCH

- Description: Update item.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newItem": {
                        "id": "d0453780-c3d3-4897-93b9-d1b657ef36b6",
                        "title": "Remera imagen paloma",
                        "description": "Remera algodon ...",
                        "price": 5000,
                        "image": [
                                        {
                                                "public_id": "SHOP/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                        ],
                        "updatedAt": "2023-07-29T03:51:06.030Z",
                        "createdAt": "2023-07-29T03:51:06.030Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "category must be provided and must be a string or number.",
                        "code": "INVALID_BODY"
                }
        }

### Remover la categoría del item

- Method: PATCH
- Endpoint: 'shop/item/:id'
- Request parameters:

  - 'category' (optionals): (string) La categoria que quiere sacar del arreglo.

- Description: Update item.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "itemUpdated": {
                        "id": "d0453780-c3d3-4897-93b9-d1b657ef36b6",
                        "title": "Remera imagen paloma",
                        "description": "Remera algodon ...",
                        "image": [
                                {
                                        "public_id": "SHOP/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                        ],
                        "price": 5000,
                        "createdAt": "2023-07-29T03:51:06.030Z",
                        "updatedAt": "2023-07-29T03:51:06.030Z",
                        "categories": []
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "there is no item with that id",
                        "code": "INVALID_BODY"
                }
        }

### Delete item

- Method: DELETE
- Endpoint: 'shop/item/:id'
- Description: Removes the item related to the ID.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "itemDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "there is no item with that id",
                        "code": "ITEM_NOT_FOUND"
                }
        }

### Get all categories

- Method: GET
- Endpoint: 'shop/category'
- Description: Un arreglo con datos de las categorias.
- Successful response (simple):

  - Status code: 200 (OK)
  - Response body:

        {
                "categories": [
                        {
                        "id": "9d0aad61-7dde-4143-98a7-257cdb9a9462",
                        "name": "talle L",
                        "createdAt": "2023-07-29T03:50:55.241Z",
                        "updatedAt": "2023-07-29T03:50:55.241Z"
                        }
                ],
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "message": "categories not found"
        }

### Create category

- Method: POST
- Endpoint: 'shop/category'
- Request parameters:

  - 'name' (obligatory):Category name (string).

- Description: Create a new category.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newCategory": {
                        "id": "9d0aad61-7dde-4143-98a7-257cdb9a9462",
                        "name": "talle L",
                        "updatedAt": "2023-07-29T03:50:55.241Z",
                        "createdAt": "2023-07-29T03:50:55.241Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "talle L exist",
                        "code": "INVALID_BODY"
                }
        }

### Update category

- Method: PUT
- Endpoint: 'shop/category/:id'
- Request parameters:

  - 'name' (optionals): (string).

- Description: Update category.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "categoryUpdated": [
                        1
                ],
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "there is no such category",
                        "code": "INVALID_BODY"
                }
        }

### Delete category

- Method: DELETE
- Endpoint: 'shop/category/:id'
- Description: Removes the category related to the ID.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "categoryDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "there is no such category",
                        "code": "INVALID_BODY"
                }
        }

## NEWS

### Get news by id

- Method: GET
- Endpoint: 'news/:id'
- Description: Returns the news related to the id.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "news": {
                        "id": "0d9a636f-5ac0-426f-8617-32e2137c1e89",
                        "title": "Evento para recaudar fondos",
                        "description": "El evento se va a realizar el dia...",
                        "image": [
                                {
                                        "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                        ],
                        "createdAt": "2023-07-31T01:55:29.355Z",
                        "updatedAt": "2023-07-31T01:55:29.355Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "News not found",
                        "code": "NEWS_NOT_FOUND"
                }
        }

### Get all news

- Method: GET
- Endpoint: 'news'
- Description: Un arreglo con datos de las noticias.
- Query parameter:

  - 'pageNumber' (optional): Cantidad de paginas (number).
  - 'newsPerPage' (optional): Cantidad de noticias por pagina (number).

- Successful response (simple):

  - Status code: 200 (OK)
  - Response body:

        {
                "news": [
                        {
                                "id": "3ef53e71-44ed-4d7b-bedb-b94557696f3a",
                                "title": "Evento para recaudar fondos  1",
                                "description": "El evento se va a realizar el dia...",
                                 "image": [
                                        {
                                                "public_id": "NEWS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                                ],
                                "createdAt": "2023-07-31T01:55:25.555Z",
                                "updatedAt": "2023-07-31T01:55:25.555Z"
                        },
                        {
                                "id": "0d9a636f-5ac0-426f-8617-32e2137c1e89",
                                "title": "Evento para recaudar fondos  2",
                                "description": "El evento se va a realizar el dia...",
                                 "image": [
                                        {
                                                "public_id": "NEWS/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                                ],
                                "createdAt": "2023-07-31T01:55:29.355Z",
                                "updatedAt": "2023-07-31T01:55:29.355Z"
                        }
                ],
                "status": "success"
        }

### Create news

- Method: POST
- Endpoint: 'news'
- Request parameters:

  - 'title' (obligatory): (string).
  - 'description' (obligatory): (string).
  - 'image' (obligatory): (FILES).

- Description: Create a new News.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newNews": {
                        "id": "03023fd0-f763-4f3e-8397-4c0accc9ae8e",
                        "title": "Evento para recaudar fondos",
                        "description": "El evento se va a realizar el dia...",
                         "image": [
                                {
                                        "public_id": "PUBLICATIONS/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                        ],
                        "updatedAt": "2023-07-31T02:32:12.870Z",
                        "createdAt": "2023-07-31T02:32:12.870Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "The image  has to be an array of strings",
                        "code": "INVALID_BODY"
                }
        }

### Update News

- Method: PUT
- Endpoint: 'news/:id'
- Request parameters:

  - 'title' (optionals): (string).
  - 'description' (optionals): (string).
  - 'newImage' (optionals): (files).
  - 'deleteImages' (optionals): (array of string) ['public_id'].

- Description: Update category.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newsUpdated": [
                        1
                ],
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "",
                        "code": "INVALID_BODY"
                }
        }

### Delete news

- Method: DELETE
- Endpoint: 'news/:id'
- Description: Removes the news related to the ID.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newsDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "News not found",
                        "code": "NEWS_NOT_FOUND"
                }
        }

## Advertising

### Get Advertising by id

- Method: GET
- Endpoint: 'advertising/:id'
- Description: Returns the Advertising related to the id.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "advertising": {
                        "id": "4100426c-17f7-4e0c-89c8-03067c8eb80b",
                        "contact": "https://www.spacex.com/",
                        "company": "SpaceX",
                        "image": [
                                {
                                        "public_id": "ADVERTISING/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                        ],
                        "createdAt": "2023-07-31T02:03:20.581Z",
                        "updatedAt": "2023-07-31T02:03:20.581Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Advertising not found",
                        "code": "ADVERTISING_NOT_FOUND"
                }
        }

### Get all Advertising

- Method: GET
- Endpoint: 'advertising'
- Description: Un arreglo con datos de las publicidades.
- Query parameter:

  - 'pageNumber' (optional): Cantidad de paginas (number).
  - 'advertisingPerPage' (optional): Cantidad de publicidades por pagina (number).

- Successful response (simple):

  - Status code: 200 (OK)
  - Response body:

        {
                "advertising": [
                        {
                                "id": "4100426c-17f7-4e0c-89c8-03067c8eb80b",
                                "contact": "https://www.spacex.com/",
                                "company": "SpaceX",
                                "image": [
                                        {
                                                "public_id": "ADVERTISING/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                                ],
                                "createdAt": "2023-07-31T02:03:20.581Z",
                                "updatedAt": "2023-07-31T02:03:20.581Z"
                        },
                        {
                                "id": "8bfb3b9a-f54c-4dd3-b98c-40d663c21eba",
                                "contact": "https://www.spacex.com/",
                                "company": "SpaceX 2",
                                "image": [
                                        {
                                                "public_id": "ADVERTISING/v6drdjidixamyj6z5aff",
                                                "secure_url": "https://res.cloudinary.com/.jpg"
                                        }
                                ],
                                "createdAt": "2023-07-31T02:03:24.819Z",
                                "updatedAt": "2023-07-31T02:03:24.819Z"
                        }
                ],
                "status": "success"
        }

### Create Advertising

- Method: POST
- Endpoint: 'advertising'
- Request parameters:

  - 'company' (obligatory): Company name (string).
  - 'contact' (obligatory): Company URL (string).
  - 'image' (obligatory): (files).

- Description: Create a new Advertising.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "newAdvertising": {
                        "id": "8bfb3b9a-f54c-4dd3-b98c-40d663c21eba",
                        "contact": "https://www.spacex.com/",
                        "company": "SpaceX 2",
                        "image": [
                                {
                                        "public_id": "ADVERTISING/v6drdjidixamyj6z5aff",
                                        "secure_url": "https://res.cloudinary.com/.jpg"
                                }
                        ],
                        "updatedAt": "2023-07-31T02:03:24.819Z",
                        "createdAt": "2023-07-31T02:03:24.819Z"
                },
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "The image  has to be an array of strings",
                        "code": "INVALID_BODY"
                }
        }

### Update Advertising

- Method: PUT
- Endpoint: 'advertising/:id'
- Request parameters:

  - 'company' (optionals): (string).
  - 'contact' (optionals): (string).
  - 'newImage' (optionals): (files).
  - 'deleteImages' (optionals): (array of string) ['public_id'].

- Description: Update Advertising.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "advertisingUpdated": [
                        1
                ],
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Advertising not found",
                        "code": "ADVERTISING_NOT_FOUND"
                }
        }

### Delete news

- Method: DELETE
- Endpoint: 'advertising/:id'
- Description: Removes the Advertising related to the ID.
- Successful response:

  - Status code: 200 (OK)
  - Response body:

        {
                "advertisingDeleted": 1,
                "status": "success"
        }

- Error response:

  - Status code: 404(Not Found)
  - Error body:

        {
                "status": "error",
                "error": {
                        "message": "Advertising not found",
                        "code": "ADVERTISING_NOT_FOUND"
                }
        }
