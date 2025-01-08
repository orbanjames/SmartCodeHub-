from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet, suggest_code, search_snippets, generate_tags
from .views import SnippetListCreateView, SnippetDetailView

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet, basename='snippet')

urlpatterns = [
    path('', include(router.urls)),
    path('api/snippets/', SnippetListCreateView.as_view(), name='snippet-list-create'),
    path('api/snippets/<int:pk>/', SnippetDetailView.as_view(), name='snippet-detail'),
    path('snippets/<int:pk>/generate_tags/', SnippetViewSet.as_view({'post': 'generate_tags'}), name='generate-tags'),
    path('suggest_code/', suggest_code, name="suggest_code"),
    path('api/snippets/search/', search_snippets, name='search_snippets'),
]

