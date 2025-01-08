from django.db import models
from django.contrib.auth.models import User
import openai

class Snippet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    code = models.TextField()
    language = models.CharField(max_length=100)
    tags = models.JSONField(blank=True, null=True, default=list)  # Store tags as a list
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    favorite = models.BooleanField(default=False)



    def __str__(self):
        return self.title

