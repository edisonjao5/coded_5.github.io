# Generated by Django 4.0.2 on 2022-02-15 18:40

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('empresas_and_proyectos', '0004_alter_projectdocument_createat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectdocument',
            name='CreateAt',
            field=models.DateTimeField(default=datetime.datetime(2022, 2, 15, 18, 40, 9, 642317, tzinfo=utc)),
        ),
    ]