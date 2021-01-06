from django.urls import path
from . import views, utls

urlpatterns = [
	path('', views.home, name = 'home_page'),
    path('api/list/todo/', utls.get_todo, name = 'api_list'),
    path('api/add/todo/', utls.TodoCreate.as_view(), name = 'api_add'),
    path('api/detail/todo/<int:pk>/', utls.detail_todo, name = 'api_detail'),
    path('api/update/todo/<int:pk>/', utls.update_todo, name = 'api_update'),
    path('api/delete/todo/<int:pk>/', utls.delete_todo, name = 'api_delete'),
    
    
]
