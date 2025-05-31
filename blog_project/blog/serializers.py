from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'titulo', 'descripcion', 'url_foto_portada', 'usuario']
        read_only_fields = ['usuario']

    def create(self, validated_data):
        # Asigna automáticamente el usuario autenticado al crear un blog
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)