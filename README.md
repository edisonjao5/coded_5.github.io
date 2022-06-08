# Introducción
Este proyecto está configurado con Docker para permitir un despliegue rápido tanto en una máquina local como remota (para su despliegue).

Es requisito previo el instalar tanto [Docker](https://docs.docker.com/get-docker/) como [Docker Compose](https://docs.docker.com/compose/install/).

# Prerequisitos:
- Instalar Docker Engine
- Instalar Docker Compose
- Instalar Git
- Acceso a Terminal (instrucciones están pensadas en Bash)

# Copiar el proyecto:
Este proyecto cuenta con submódulos tanto para el FrontEnd como el BackEnd de la aplicación. Para poder empezar a trabajar con el proyecto se debe:
1. Clonar desde Gitlab con el siguiente comando:
```shell
git clone git@gitlab.com:ssilva-cyc/ssilva-erp.git
```
2. Iniciar y actualizar los súbmodulos con los comandos:
```shell
cd ssilva-erp/
git submodule update --init
```
Una vez realizado esto, tendremos todos los archivos necesarios para empezar a trabajar.

# Ambiente de Desarrollo:
## Iniciar Contenedores Docker:
A través de Docker Compose, podemos recrear el ambiente de desarrollo necesario. Deberemos tipear el siguiente comando en la terminal:
```shell
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```
## Copiar Datos de Pruebas:
Para que la aplicación funcione correctamente, es necesario tipear los siguientes comandos (una vez los contenedores estén funcionando):
```shell
docker exec -it ssilva-backend python3 data.py
```
Lo anterior cargará los datos de prueba en el contenedor del BackEnd de la aplicación.
**Nota Importante**: Sin este paso, la aplicación no funcionará dado que requiere datos para iniciar.

## Visualizar el Proyecto:
Una vez iniciados los contenedores, estos debieran estar corriendo en [http://localhost](http://localhost)

## Detener los Contenedores:
Para detenerlos correctamente se debe escribir el comando:
```shell
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```
## Ingresar al bash dentro del contenedor y poder generar cambios:
para ingresar debes estar en la carpeta principal osea en ssilva-erp y ejecutar
```shell
docker exec -ti ssilva-backend bash
docker exec -ti ssilva-frontend bash
```