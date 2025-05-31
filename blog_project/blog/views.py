from django.shortcuts import render

from rest_framework import viewsets, permissions
from .models import Blog
from .serializers import BlogSerializer
from rest_framework.permissions import DjangoModelPermissions
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated,DjangoModelPermissions()]

    def get_queryset(self):
        # Filtra los blogs para que cada usuario solo vea los suyos
        return Blog.objects.filter(usuario=self.request.user)