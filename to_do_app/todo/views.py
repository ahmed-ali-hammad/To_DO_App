from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect



# @login_required	
# def add_todo(request):
# 	todo_content = request.POST['content']
# 	new_todo = Todo()
# 	new_todo.content=todo_content
# 	new_todo.save()
# 	return redirect ('home_page')

# @login_required	
# def delete_todo(request, todo_id):
# 	todo_delete = Todo.objects.get(id=todo_id)
# 	todo_delete.delete()
# 	return redirect ('home_page')


@login_required	
def home(request):
	return render (request, 'todo/home.html')