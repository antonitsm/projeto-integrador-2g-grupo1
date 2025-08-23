from django.shortcuts import render

from django.http import HttpResponse


def home_view(request):
    return render(request, 'landing/home.html')

def termo_view(request):
    return render(request, 'landing/termos-de-uso.html')

def politica_view(request):
    return render(request, 'landing/politica.html')