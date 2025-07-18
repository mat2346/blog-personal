from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, PostViewSet, LikePostViewSet, ComentarioViewSet

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'posts', PostViewSet)
router.register(r'likes', LikePostViewSet)
router.register(r'comentarios', ComentarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]