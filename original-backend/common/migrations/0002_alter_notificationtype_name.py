# Generated by Django 4.0.2 on 2022-02-15 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificationtype',
            name='Name',
            field=models.CharField(max_length=60, unique=True),
        ),
    ]
