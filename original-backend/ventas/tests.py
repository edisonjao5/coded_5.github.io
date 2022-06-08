# from sgi_web_back_project import settings
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.template.loader import render_to_string
import smtplib
from users.models import User
from django.conf import settings
settings.configure()


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'cyccomputo@gmail.com'
EMAIL_HOST_PASSWORD = 'CyClasCondes201'
EMAIL_USE_TLS = True

def send_email():
    try:
        mailServer = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.login(EMAIL_HOST_USER,
                         EMAIL_HOST_PASSWORD)

        myemail = 'edisonjao51@gmail.com'
        # construimos el mensaje simple
        msg = MIMEMultipart('Hola, esto es un mensaje de prueba')
        msg['From'] = EMAIL_HOST_USER
        msg['To'] = myemail
        msg['Subject'] = 'Esta es tu Cotizacion'

        content = render_to_string('cotizacion_add.html', {
                                   'user': User.objects.get(id=1)})
        msg.attach(MIMEText(content, 'html'))
        # enviamos el mensaje
        mailServer.sendmail(EMAIL_HOST_USER,
                            myemail,
                            msg.as_string())

    except Exception as e:
        print(e)


send_email()
