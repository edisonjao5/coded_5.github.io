# Generated by Django 4.0.2 on 2022-02-16 13:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('empresas_and_proyectos', '0018_alter_projectdocument_createat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectdocument',
            name='CreateAt',
            field=models.DateTimeField(default=datetime.datetime(2022, 2, 16, 13, 59, 11, 573961, tzinfo=utc)),
        ),
    ]
