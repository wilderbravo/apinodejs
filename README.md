# Taxi24 BE

El API de Taxi24 ha sido construida con diferentes tecnologías, las cuáles se listan a continuación:

- [Node Js](https://nodejs.org/en)
- [Nest Js](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeOrm](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Bitbucket](https://bitbucket.org/)
- [VsCode](https://code.visualstudio.com/)
- [Swagger](https://swagger.io/)

Adicionalmente se debe considerar un  cliente o plugin para ejecución y prueba de los endpoints del API, para este proyecto se utiliza [Postman](https://www.postman.com/).

## Instalación

Antes de empezar con el proyecto, se debe tener en cuenta que la la base de datos (Postgres) se está instanciando mediante un contenedor, por lo cual se debe instalar  [Docker](https://docs.docker.com/engine/install/).

Posteriormente se debe descargar el proyecto que se encuentra alojado en [Bitbucket](https://bitbucket.org/), elija la ruta donde va a estar localmente el proyecto y luego escriba el siguiente comando en la consola:

```bash
git clone https://wilderbravo@bitbucket.org/wilderbravo/taxi24.git
```

Una vez descargado el código fuente, ingrese a la carpeta del proyecto **taxi24** y luego actualice las dependencias ejecutando el comando:

```bash
npm install
```
Ahora es tiempo de hacer funcionar el motor de base de datos, para lo cual se debe ejecutar el comando:

```bash
docker-compose up -d
```
Para verificar que la base de datos se encuentra funcionando bien, se puede ejecutar el comando:
```bash
docker-compose ps
``` 
Lo cual debe presentar algo similar al siguiente resultado:
```bash
NAME                   IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
taxi24_postgresqik_1   postgres:latest     "docker-entrypoint.s…"   postgresqik         4 days ago          Up 37 minutes       0.0.0.0:5432->5432/tcp
``` 
Se debe tener en cuenta que el puerto **5432** no debe estar ocupado por otra instancia o aplicación.

Utilizando un cliente de Base de Datos es posible abrir la conexión a la base de datos **taxi24** y ejecutar el archivo con los datos iniciales ubicado en la ruta:
```bash
/src/database/script.sql
``` 

Ahora es momento de iniciar la aplicación, usando el siguiente comando:

```bash
npm run start:dev
``` 
Lo cual hará que la aplicación se ejecute en modo de desarrollo en el puerto 3000

```bash
http://localhost:3000
``` 

## Uso de la aplicación
Para poder verificar el buen funcionamiento del API se debe abrir la carpeta **test** un archivo en formato json llamado **QIK.postman_collection.json** que contiene los ejemplos de las peticiones a los diferentes endpoints del API. Este archivo es posible importarlo directamente en Postman. 

Si la importación no funciona, también se ha incorporado el uso de Swagger para la documentación del API, el cual se puede encontrar en la ruta:

```bash
http://localhost:3000/api
```

## Contribución

Para futuras contribuciones se pueden realizar pull request que agreguen nuevas funcionalidades al aplicativo

## Licencia

Nest is [MIT licensed](https://choosealicense.com/licenses/mit/).

## Contactos

- Autor - [Wilder Bravo](https://www.linkedin.com/in/wilderbravoc/)


