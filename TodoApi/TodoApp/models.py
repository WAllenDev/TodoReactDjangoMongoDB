from django.db import models

class TodoItem(models.Model):
	TodoItemId = models.AutoField(primary_key = True)
	TodoTitle = models.CharField(max_length = 50)
	Description = models.TextField(max_length = 500)
	CreatedDate = models.DateField(auto_now = True)
	IsComplete = models.BooleanField(default = False )

	def _str_(self):
		return self.TodoTitle