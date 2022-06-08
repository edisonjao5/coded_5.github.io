# Instrucciones de Instalación:
## Django:
1. Copiar el repositorio ubicado en https://gitlab.com/ssilva-cyc/ssilva_backend
2. Copiar las variables de entorno en el archivo `.env` ubicado al interior del directorio `ssilva_backend/sgi_web_back_project/` (si no existe, es necesario crearlo):
```
EMAIL_USE_TLS=True
EMAIL_HOST=smtp.mailtrap.io
EMAIL_HOST_USER=3768cb9f29666e
EMAIL_HOST_PASSWORD=4d0b0811f726b5
EMAIL_PORT=2525
EMAIL_TIMEOUT=15

UF_AUTH_KEY='UFAuthKey'
PIPEDRIVE_API_TOKEN='apiToken'
```
3. Descargar un administrador de ambientes virtuales para Python como [virtualenv](https://pypi.org/project/virtualenv/) o [Conda](https://docs.conda.io/projects/conda/en/latest/index.html). En este caso se utiliza a `virtualenv` en los ejemplos.
4. Crear un ambiente virtual al interior del proyecto:
```
virtualenv venv
```
(**Importante:** Se debe utilizar la versión 3.8 de Python)

5. Iniciar el ambiente virtual:
```
source venv/bin/activate
```

6. Descargar dependencias con:
```
pip install -r requirements.txt
```

7. Cargar datos iniciales con:
```
python3 data.py
```

**Importante:** Podría ser necesario correr los comandos:
```
python3 manage.py makemigrations && python3 manage.py migrate
```


8. Iniciar el servidor con:
```
python3 manage.py runserver
```
