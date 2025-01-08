from rest_framework import serializers
from .models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['id', 'title', 'description', 'code', 'language', 'tags', 'favorite', 'created_at', 'updated_at']
        extra_kwargs = {
            'tags': {'required': False},  # Tags are optional; generated if not provided
        }
    def validate(self, data):
        if not data.get('code'):
            raise serializers.ValidationError({"error": "Code snippet is required"})
        return data
