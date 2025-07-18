from rest_framework import serializers
from .models import Categoria, Post, LikePost
from django.conf import settings

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion']

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'titulo', 'contenido', 'blog', 'categoria', 'likes_count']
    
    def get_likes_count(self, obj):
        return obj.likes.count()

class LikePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikePost
        fields = ['id', 'usuario', 'post', 'fecha']
        read_only_fields = ['usuario', 'fecha']
    
    def create(self, validated_data):
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)