from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class TodoSerializer(serializers.ModelSerializer):
	user = serializers.SerializerMethodField()

	class Meta:
		model = Todo
		fields = '__all__'

	def get_user(self, obj):
		return obj.user.username

