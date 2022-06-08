from django.core.management.base import BaseCommand

from .uf_scheduler import sched as uf_scheduler
from .quotations_scheduler import updateQuotations


class Command(BaseCommand):
    help = 'Inicia trabajos cronometrados de la aplicación.'

    def handle(self, *args, **options):
        #uf_scheduler.start()
        updateQuotations()
        #uf_scheduler.shutdown()