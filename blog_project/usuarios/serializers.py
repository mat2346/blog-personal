from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from .models import Usuario

class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=50)  # Removido unique=True
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    suspendido = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'  # Cambiado de 'nombre' a 'email'
    REQUIRED_FIELDS = ['nombre']  # Cambiado de ['email'] a ['nombre']

    def __str__(self):
        return self.email  # Cambiado de self.nombre a self.email

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'password', 'suspendido', 'is_active', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            email=validated_data['email'],  # Cambiado el orden: email primero
            nombre=validated_data['nombre'],
            password=validated_data['password'],
            suspendido=validated_data.get('suspendido', False)
        )
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # Cambiado de 'nombre' a 'email'

    def validate(self, attrs):
        # Ya no necesitas mapear 'nombre' a 'username'
        # Django usará directamente el email
        return super().validate(attrs)

class UsuarioCreationForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('nombre', 'email', 'password', 'suspendido')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class UsuarioChangeForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('nombre', 'email', 'password', 'suspendido', 'is_active', 'is_staff', 'is_superuser')

class UsuarioAdmin(UserAdmin):
    add_form = UsuarioCreationForm
    form = UsuarioChangeForm
    model = Usuario
    list_display = ['id', 'email', 'nombre', 'suspendido', 'is_active', 'is_staff']  # email primero
    fieldsets = (
        (None, {'fields': ('email', 'nombre', 'password', 'suspendido')}),  # email primero
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nombre', 'password', 'suspendido', 'is_active', 'is_staff', 'is_superuser')}  # email primero
        ),
    )
    search_fields = ('email', 'nombre')  # email primero
    ordering = ('email',)  # ordenar por email
    filter_horizontal = ('groups', 'user_permissions')

admin.site.register(Usuario, UsuarioAdmin)



