from apscheduler.schedulers.background import BackgroundScheduler

from ventas.models.cotizaciones import Cotizacion, CotizacionState
from empresas_and_proyectos.models.proyectos import Proyecto

from common.constants import COTIZATION_STATE

def updateQuotations():
    activeState = CotizacionState.objects.filter(Name=COTIZATION_STATE[0]).first()
    activeQuotations = Cotizacion.objects.filter(CotizacionStateID=activeState)
    
    for quotation in activeQuotations:
        print(f'{quotation} está {quotation.CotizacionStateID}')
