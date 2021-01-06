from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Todo
from .serializers import *


@api_view(['GET'])
def get_todo(request):
	todo_list = Todo.objects.all().order_by("id").reverse()
	serializer = TodoSerializer(todo_list, many = True)
	return Response(serializer.data)


@api_view(['GET'])
def detail_todo(request, pk):
	todo_list = Todo.objects.get(id=pk)
	serializer = TodoSerializer(todo_list, many = False)
	return Response(serializer.data)


class TodoCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    



# @api_view(['POST'])
# def post_todo(request):
# 	serializer = TodoSerializer(data=request.data)
# 	print(request.user)
# 	if serializer.is_valid():
# 		serializer.save()
# 	else:
# 		return Response("Data entered isn't valid")
# 	return Response(request.data)


@api_view(['POST'])
def update_todo(request, pk):
	instance = Todo.objects.get(id=pk)
	serializer = TodoSerializer(instance= instance, data=request.data)
	if serializer.is_valid():
		serializer.save()
	else:
		return Response("Data entered isn't valid")
	return Response(request.data)


@api_view(['DELETE'])
def delete_todo(request, pk):
	instance = Todo.objects.get(id=pk)
	instance.delete()
	return Response('item deleted')




