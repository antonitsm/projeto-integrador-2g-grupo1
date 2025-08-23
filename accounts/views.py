from django.shortcuts import render

from django.http import HttpResponse


def login_view(request):
    return render(request, 'accounts/login.html')

def cadastro_view(request):
    return render(request, 'accounts/cadastro.html')

def conta_view(request):
    return render(request, 'accounts/conta.html')



