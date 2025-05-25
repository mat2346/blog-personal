from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from .models import Usuario, Rol, Permiso

class UsuarioCreationForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('nombre', 'email', 'password', 'suspendido', 'roles')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
            self.save_m2m()
        return user

class UsuarioChangeForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('nombre', 'email', 'password', 'suspendido', 'roles', 'is_active', 'is_staff', 'is_superuser')

class UsuarioAdmin(UserAdmin):
    add_form = UsuarioCreationForm
    form = UsuarioChangeForm
    model = Usuario
    list_display = ['id', 'nombre', 'email', 'suspendido', 'is_active', 'is_staff']
    fieldsets = (
        (None, {'fields': ('nombre', 'email', 'password', 'suspendido', 'roles')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('nombre', 'email', 'password', 'suspendido', 'roles', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )
    search_fields = ('nombre', 'email')
    ordering = ('nombre',)

class RolAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'descripcion']

class PermisoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'descripcion']

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Rol, RolAdmin)
admin.site.register(Permiso, PermisoAdmin)
