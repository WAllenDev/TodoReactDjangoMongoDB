from rest_framework import viewsets

from TodoApp.models import TodoItem
from TodoApp.serializers import TodoItemSerializer

class TodoView(viewsets.ModelViewSet):
	serializer_class = TodoItemSerializer
	queryset = TodoItem.objects.all()