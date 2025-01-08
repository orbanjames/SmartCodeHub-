import openai
from django.db.models import Q
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Snippet
from .serializers import SnippetSerializer
from rest_framework.permissions import AllowAny
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SnippetSerializer
 

openai.api_key = "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"

class SnippetListCreateView(APIView):
    """
    Handles listing and creating snippets.
    """
    def get(self, request):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SnippetDetailView(APIView):
    """
    Handles retrieving, updating, and deleting a single snippet.
    """
    def get_object(self, pk):
        try:
            return Snippet.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            return None

    def get(self, request, pk):
        try:
            snippet = Snippet.objects.get(pk=pk)
            serializer = SnippetSerializer(snippet)
            return Response(serializer.data)
        except Snippet.DoesNotExist:
            return Response({"error": "Snippet not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            snippet = Snippet.objects.get(pk=pk)
            serializer = SnippetSerializer(snippet, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Snippet.DoesNotExist:
            return Response({"error": "Snippet not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        snippet = self.get_object(pk)
        if snippet is None:
            return Response({"error": "Snippet not found"}, status=status.HTTP_404_NOT_FOUND)
        snippet.delete()
        return Response({"message": "Snippet deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class SnippetViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    

    def get_queryset(self):
        query = self.request.query_params.get("query", None)
        if query:
            return self.queryset.filter(
                Q(title__icontains=query) |
                Q(tags__icontains=query) |
                Q(language__icontains=query)
            )
        return self.queryset

    def perform_create(self, serializer):
        code = serializer.validated_data.get("code")
        if code:
            snippet = serializer.save(user=self.request.user)
            tags = generate_tags(snippet)  
            snippet.tags = tags  
            snippet.save()  
        else:
            serializer.save(user=self.request.user, tags=[])
    
    
def generate_tags(snippet):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  
            messages=[
                {"role": "system", "content": "You are an assistant that generates tags for code snippets."},
                {"role": "user", "content": f"Generate relevant tags for the following code:\n\n{snippet.code}\n\nTags:"}
            ],
            max_tokens=50,
            temperature=0.7,
        )
        tags_string = response['choices'][0]['message']['content'].strip()
        
        # Convert the string to a list of tags (assuming they are comma-separated)
        tags = [tag.strip() for tag in tags_string.split(',') if tag.strip()]
        return tags
    except Exception as e:
        print(f"Error generating tags: {e}")
        return []


@api_view(['POST'])
def search_snippets(request):
    """
    Search for code snippets based on a query using TF-IDF and cosine similarity.
    """
    query = request.data.get('query', '')
    if not query:
        return Response({"error": "Search query is required"}, status=400)

    try:
        snippets = Snippet.objects.all()
        documents = [snippet.code for snippet in snippets]
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(documents)
        query_vec = vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()

        results = [
            {"id": snippets[idx].id, "title": snippets[idx].title, "code": snippets[idx].code}
            for idx in similarities.argsort()[::-1] if similarities[idx] > 0
        ]
        return Response({"results": results}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
def suggest_code(request):
    """
    Suggest completions for a partial code snippet.
    """
    partial_code = request.data.get('partial_code', '')
    if not partial_code:
        return Response({"error": "Partial code snippet is required"}, status=400)

    try:
        # # Log the received partial code
        # print(f"Received partial code: {partial_code}")

        # # Make OpenAI API call
        # print("Making OpenAI API call...")
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Suggest completions for the following partial code snippet:\n\n{partial_code}"}
            ],
            max_tokens=50
        )
        print(f"OpenAI API response: {response}")

        # Validate response
        if 'choices' in response and response['choices']:
            suggestion = response['choices'][0]['message']['content'].strip()
            return Response({"suggestion": suggestion}, status=200)
        else:
            return Response({"error": "Invalid response from OpenAI API"}, status=500)

    except openai.error.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        return Response({"error": f"OpenAI API error: {str(e)}"}, status=500)
    except Exception as e:
        print(f"Unexpected error: {e}")
        return Response({"error": f"Unexpected error: {str(e)}"}, status=500)

    