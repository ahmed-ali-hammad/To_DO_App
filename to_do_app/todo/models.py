from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	content = models.CharField(max_length=100)
	completed = models.BooleanField(default=False, blank=True, null=True)
