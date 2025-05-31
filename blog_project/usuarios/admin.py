from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from .models import Usuario

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
    list_display = ['id', 'nombre', 'email', 'suspendido', 'is_active', 'is_staff']
    fieldsets = (
        (None, {'fields': ('nombre', 'email', 'password', 'suspendido')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('nombre', 'email', 'password', 'suspendido', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )
    search_fields = ('nombre', 'email')
    ordering = ('nombre',)
    filter_horizontal = ('groups', 'user_permissions')

admin.site.register(Usuario, UsuarioAdmin)
