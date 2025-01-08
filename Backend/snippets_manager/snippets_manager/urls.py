
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Simple view function for demonstration
def home(request):
    return HttpResponse("Welcome to the Snippets Manager!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('snippets.urls')),
    path('', home), 
]
