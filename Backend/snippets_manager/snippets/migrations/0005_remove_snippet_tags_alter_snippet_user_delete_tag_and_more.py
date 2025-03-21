# Generated by Django 5.1.3 on 2024-11-30 18:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0004_alter_snippet_user_alter_tag_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='snippet',
            name='tags',
        ),
        migrations.AlterField(
            model_name='snippet',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
        migrations.AddField(
            model_name='snippet',
            name='tags',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]
