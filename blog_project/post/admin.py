
from django.contrib import admin
from .models import Categoria, Post, LikePost

admin.site.register(Categoria)
admin.site.register(Post)
admin.site.register(LikePost)

