# Instrucciones de Instalación:
## React:
    
1. Copiar repositorio https://gitlab.com/ssilva-cyc/ssilva_frontend
2. Al interior copiar variables de entorno en el archivo `.env` ubicado al interior del proyecto (si no existe, es necesario crearlo):

```shell
NODE_ENV=development
API_ROOT=http://localhost:8000/api
```
    

3. Descargar [nodeenv](https://pypi.org/project/nodeenv/) (administrador de ambientes virtuales de node) de la forma:

```shell
$ sudo pip install nodeenv
```

4. Crear un ambiente virtual:
```
nodeenv --node=10.24.1 venv
```

5. Ingresar al ambiente virtual: 
```
. venv/bin/activate
```

6. Descargar dependencias con:
```
npm i
```

7. Correr la aplicación con:
```
npm run start
```

&nbsp;
