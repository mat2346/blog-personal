from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Categoria, Post, LikePost
from .serializers import CategoriaSerializer, PostSerializer, LikePostSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Post.objects.all()
        blog_id = self.request.query_params.get('blog_id')
        categoria_id = self.request.query_params.get('categoria_id')
        
        if blog_id:
            queryset = queryset.filter(blog_id=blog_id)
        if categoria_id:
            queryset = queryset.filter(categoria__id=categoria_id)
        
        return queryset
    
    @swagger_auto_schema(
        operation_description="Dar like o quitar like a un post",
        responses={
            200: openapi.Response(description='Like eliminado correctamente'),
            201: openapi.Response(description='Like agregado correctamente')
        }
    )
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        
        # Verifica si ya existe un like
        like_exists = LikePost.objects.filter(usuario=user, post=post).exists()
        
        if like_exists:
            # Si ya existe, elimina el like (toggle)
            LikePost.objects.filter(usuario=user, post=post).delete()
            return Response({'status': 'like removed'}, status=status.HTTP_200_OK)
        else:
            # Si no existe, crea un nuevo like
            like = LikePost(usuario=user, post=post)
            like.save()
            return Response({'status': 'like added'}, status=status.HTTP_201_CREATED)

class LikePostViewSet(viewsets.ModelViewSet):
    queryset = LikePost.objects.all()
    serializer_class = LikePostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return LikePost.objects.filter(usuario=self.request.user)
        
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)