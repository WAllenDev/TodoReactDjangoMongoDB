from rest_framework import serializers
from TodoApp.models import TodoItem

class TodoItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = TodoItem
		fields = ('TodoItemId', 'TodoTitle', 'Description', 'CreatedDate', 'IsComplete')