from datetime import datetime
import requests

from apscheduler.schedulers.background import BackgroundScheduler

from common.constants import API_UF_URL
from common.models import UF, APIUpdate
from common.services import get_or_none

# La llamada al API retorna los valores de UF de los últimos 31 días.

def getUF():
    print('Getting UF values')
    req = requests.get(API_UF_URL)
    data = req.json()

    series = data['serie'][::-1]
    for uf in series:
        date = uf['fecha'][:10]
        value = uf['valor']
        if not get_or_none(UF, Date=date):
            UF.objects.create(Date=date, Value=value)
            print(f'Saving UF {value} {date}')

    today = datetime.now().date()
    last_api_update = APIUpdate.objects.get(Name='UF')
    if last_api_update:
        last_api_update.Date = today
        last_api_update.save()
    else:
        last_api_update = APIUpdate.objects.create(Name='UF')

    print(UF.objects.last())
    print(APIUpdate.objects.get(Name='UF'))


# Creación del cron job con APScheduler

sched = BackgroundScheduler()

# Se da inicio al cronómetro el 10 de abril de 2022.

sched.add_job(getUF, 'cron', day=10, hour=22, minute=0, second=0, start_date='2022-04-10')


