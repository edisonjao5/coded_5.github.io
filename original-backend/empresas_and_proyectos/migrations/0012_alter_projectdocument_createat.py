# Generated by Django 4.0.2 on 2022-02-16 13:32

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('empresas_and_proyectos', '0011_alter_projectdocument_createat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectdocument',
            name='CreateAt',
            field=models.DateTimeField(default=datetime.datetime(2022, 2, 16, 13, 32, 1, 578491, tzinfo=utc)),
        ),
    ]