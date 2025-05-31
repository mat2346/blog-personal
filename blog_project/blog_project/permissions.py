from rest_framework import permissions

class NoEstaSuspendido(permissions.BasePermission):
    """
    Permite acceso solo a usuarios que no están suspendidos.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and not getattr(request.user, 'suspendido', False)

class TienePermiso(permissions.BasePermission):
    """
    aqui verifica si el usuario tiene un permiso específico a través de sus roles.
    """
    def __init__(self, nombre_permiso):
        self.nombre_permiso = nombre_permiso
        
    def has_permission(self, request, view):
        # Si no está autenticado, denegar acceso
        if not request.user.is_authenticated:
            return False
            
        # Los administradores (is_staff) tienen todos los permisos
        if request.user.is_staff:
            return True
            
        # Verificar si el usuario tiene el permiso a través de sus roles
        for rol in request.user.roles.all():
            if rol.permisos.filter(nombre=self.nombre_permiso).exists():
                return True
                
        return False

class EsAdminOPropietario(permissions.BasePermission):
    """
    Permite acceso a administradores o al propietario del recurso.
    """
    def has_object_permission(self, request, view, obj):
        # Los administradores tienen acceso completo
        if request.user.is_staff:
            return True
            
        # El propietario del objeto tiene acceso
        return obj.id == request.user.id