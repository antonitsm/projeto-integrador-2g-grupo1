from django.shortcuts import render, redirect
from django.contrib.auth import login, logout

from .templates.accounts.forms import CustomLoginForm, CustomUserCreationForm


def cadastro_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) 
            return redirect('paginainicialdashboard') 
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/cadastro.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = CustomLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('paginainicialdashboard')
    else:
        form = CustomLoginForm()
    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('landing:home') 
    

def conta_view(request):
    return render(request, 'accounts/conta.html')

def paginainicialdashboard_view(request):
    return render(request, "dashboard/paginainicialdashboard.html")

