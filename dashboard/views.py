from django.shortcuts import render

from django.http import HttpResponse


def paginainicialdashboard_view(request):
    return render(request, 'dashboard/paginainicialdashboard.html')

def dados_view(request):
    return render(request, 'dashboard/dados.html')

def producao_view(request):
    return render(request, 'dashboard/producao.html')

def observacao_view(request):
    return render(request, 'dashboard/observacao.html')