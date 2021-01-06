from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm as as_form
from django.contrib.auth.forms import UserCreationForm as uc_form

def login_view(request):
	if request.method == 'POST':
			username = request.POST['username']
			password = request.POST['password']
			user = authenticate(request, username = username, password= password)
			if user is not None:
				login (request, user)
				return redirect ('home_page')
			else:
				form = as_form(data= request.POST)
	else:
		form = as_form()
	return render (request, 'users/login.html', {"form":form})



def register_view(request):
	if request.method == 'POST':
		form = uc_form(request.POST)
		if form.is_valid:
			user = form.save()
			login(request, user)
			return redirect ('home_page')
		else:
			form = uc_form(data= request.POST)
	else:
		form = uc_form()
	return render (request, 'users/register.html', {"form":form})


