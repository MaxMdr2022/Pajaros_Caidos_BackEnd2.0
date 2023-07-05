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
Realiza tus cambios y commitea las modificaciones: git commit -m 'cambios'.
Realiza un push a tu rama: git push origin mi-nueva-rama.
Abre una pull request en este repositorio.

## Cualquier duda al grupo de wp :D
