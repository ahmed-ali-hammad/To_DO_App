from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home_page'),
    path('add/todo/', views.add_todo, name = 'add_todo'),
    path('delete/todo/<int:todo_id>/', views.delete_todo, name = 'delete_todo'),
    
]
