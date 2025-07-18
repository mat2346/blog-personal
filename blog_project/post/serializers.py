from rest_framework import serializers
from .models import Categoria, Post, LikePost, Comentario
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

class ComentarioSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    respuestas = serializers.SerializerMethodField()
    es_respuesta = serializers.SerializerMethodField()
    
    class Meta:
        model = Comentario
        fields = ['id', 'contenido', 'usuario', 'usuario_nombre', 'post', 'comentario_padre', 
                 'fecha_creacion', 'fecha_actualizacion', 'respuestas', 'es_respuesta']
        read_only_fields = ['usuario', 'fecha_creacion', 'fecha_actualizacion']
    
    def get_respuestas(self, obj):
        # Obtiene las respuestas del comentario (comentarios hijos)
        if obj.respuestas.exists():
            return ComentarioSerializer(obj.respuestas.all(), many=True, context=self.context).data
        return []
    
    def get_es_respuesta(self, obj):
        # Indica si este comentario es una respuesta a otro comentario
        return obj.comentario_padre is not None
    
    def create(self, validated_data):
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)