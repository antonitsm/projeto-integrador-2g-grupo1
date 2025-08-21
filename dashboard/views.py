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

def tudo_registros_view(request):
    # Aqui você pode enviar registros reais do banco mais tarde
    registros = [
        {"id": 1, "titulo": "Inspeção Inicial", "data_inspecao": "2025-08-21", "colmeia": {"nome": "Colmeia A"}, "tipo_inspecao": "Rotina"},
        {"id": 2, "titulo": "Checagem de Mel", "data_inspecao": "2025-08-20", "colmeia": {"nome": "Colmeia B"}, "tipo_inspecao": "Produção"}
    ]
    return render(request, 'dashboard/tudo_registros.html', {"registros": registros})
