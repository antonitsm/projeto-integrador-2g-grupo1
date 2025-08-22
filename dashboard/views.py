from django.shortcuts import render
from django.http import JsonResponse

# Views originais do dashboard
def paginainicialdashboard_view(request):
    return render(request, 'dashboard/paginainicialdashboard.html')

def dados_view(request):
    return render(request, 'dashboard/dados.html')

def producao_view(request):
    return render(request, 'dashboard/producao.html')

def observacao_view(request):
    return render(request, 'dashboard/observacao.html')

def tudo_registros_view(request):
    # Dados de exemplo para a página de registros
    registros = [
        {"id": 1, "titulo": "Inspeção Inicial", "data_inspecao": "2025-08-21", "colmeia": {"nome": "Colmeia A"}, "tipo_inspecao": "Rotina"},
        {"id": 2, "titulo": "Checagem de Mel", "data_inspecao": "2025-08-20", "colmeia": {"nome": "Colmeia B"}, "tipo_inspecao": "Produção"},
        {"id": 3, "titulo": "Manutenção Geral", "data_inspecao": "2025-08-19", "colmeia": {"nome": "Colmeia A"}, "tipo_inspecao": "Manutenção"},
        {"id": 4, "titulo": "Verificação de Saúde", "data_inspecao": "2025-08-18", "colmeia": {"nome": "Colmeia C"}, "tipo_inspecao": "Saúde"},
        {"id": 5, "titulo": "Coleta de Pólen", "data_inspecao": "2025-08-17", "colmeia": {"nome": "Colmeia B"}, "tipo_inspecao": "Produção"},
    ]
    return render(request, 'dashboard/tudo_registros.html', {"registros": registros})

# Views simplificadas para Registros (sem necessidade de login ou DB)
def registros_view(request):
    # Dados de exemplo para a página de registros
    registros = [
        {"id": 1, "titulo": "Inspeção Inicial", "data_inspecao": "2025-08-21", "colmeia": {"nome": "Colmeia A"}, "tipo_inspecao": "Rotina"},
        {"id": 2, "titulo": "Checagem de Mel", "data_inspecao": "2025-08-20", "colmeia": {"nome": "Colmeia B"}, "tipo_inspecao": "Produção"},
        {"id": 3, "titulo": "Manutenção Geral", "data_inspecao": "2025-08-19", "colmeia": {"nome": "Colmeia A"}, "tipo_inspecao": "Manutenção"},
        {"id": 4, "titulo": "Verificação de Saúde", "data_inspecao": "2025-08-18", "colmeia": {"nome": "Colmeia C"}, "tipo_inspecao": "Saúde"},
        {"id": 5, "titulo": "Coleta de Pólen", "data_inspecao": "2025-08-17", "colmeia": {"nome": "Colmeia B"}, "tipo_inspecao": "Produção"},
    ]
    return render(request, 'dashboard/tudo_registros.html', {"registros": registros})

def detalhes_registro_ajax(request, registro_id):
    # Dados de exemplo para detalhes de registro
    dados_exemplo = {
        1: {
            'id': 1,
            'titulo': 'Inspeção Inicial',
            'data_inspecao': '21/08/2025',
            'colmeia': 'Colmeia A',
            'tipo_inspecao': 'Rotina',
            'condicao_colmeia': 'Excelente',
            'populacao_abelhas': 'Alta',
            'presenca_rainha': 'Sim',
            'producao_mel': '10 kg',
            'estado_favos': 'Bem construídos',
            'temperatura': '35°C',
            'umidade': '60%',
            'observacoes': 'Primeira inspeção após instalação. Tudo ok.',
            'proxima_inspecao': '28/08/2025',
            'tratamento_aplicado': 'Nenhum',
            'acao_requerida': 'Nenhuma',
        },
        2: {
            'id': 2,
            'titulo': 'Checagem de Mel',
            'data_inspecao': '20/08/2025',
            'colmeia': 'Colmeia B',
            'tipo_inspecao': 'Produção',
            'condicao_colmeia': 'Boa',
            'populacao_abelhas': 'Média',
            'presenca_rainha': 'Sim',
            'producao_mel': '5 kg',
            'estado_favos': 'Favos cheios',
            'temperatura': '32°C',
            'umidade': '65%',
            'observacoes': 'Produção de mel dentro do esperado.',
            'proxima_inspecao': '27/08/2025',
            'tratamento_aplicado': 'Nenhum',
            'acao_requerida': 'Nenhuma',
        },
        3: {
            'id': 3,
            'titulo': 'Manutenção Geral',
            'data_inspecao': '19/08/2025',
            'colmeia': 'Colmeia A',
            'tipo_inspecao': 'Manutenção',
            'condicao_colmeia': 'Excelente',
            'populacao_abelhas': 'Alta',
            'presenca_rainha': 'Sim',
            'producao_mel': 'Não informado',
            'estado_favos': 'Limpos e organizados',
            'temperatura': '34°C',
            'umidade': '62%',
            'observacoes': 'Limpeza e substituição de alguns quadros antigos.',
            'proxima_inspecao': '26/08/2025',
            'tratamento_aplicado': 'Nenhum',
            'acao_requerida': 'Nenhuma',
        },
        4: {
            'id': 4,
            'titulo': 'Verificação de Saúde',
            'data_inspecao': '18/08/2025',
            'colmeia': 'Colmeia C',
            'tipo_inspecao': 'Saúde',
            'condicao_colmeia': 'Regular',
            'populacao_abelhas': 'Baixa',
            'presenca_rainha': 'Não',
            'producao_mel': 'Não informado',
            'estado_favos': 'Alguns favos com sinais de doença',
            'temperatura': '30°C',
            'umidade': '70%',
            'observacoes': 'Sinais de doença e rainha não encontrada. Necessário tratamento e busca pela rainha.',
            'proxima_inspecao': '20/08/2025',
            'tratamento_aplicado': 'Tratamento para ácaros',
            'acao_requerida': 'Encontrar e substituir rainha',
        },
        5: {
            'id': 5,
            'titulo': 'Coleta de Pólen',
            'data_inspecao': '17/08/2025',
            'colmeia': 'Colmeia B',
            'tipo_inspecao': 'Produção',
            'condicao_colmeia': 'Boa',
            'populacao_abelhas': 'Média',
            'presenca_rainha': 'Sim',
            'producao_mel': 'Não informado',
            'estado_favos': 'Favos com pólen',
            'temperatura': '33°C',
            'umidade': '68%',
            'observacoes': 'Coleta de pólen bem sucedida.',
            'proxima_inspecao': '24/08/2025',
            'tratamento_aplicado': 'Nenhum',
            'acao_requerida': 'Nenhuma',
        },
    }
    return JsonResponse(dados_exemplo.get(registro_id, {}))

def novo_registro_view(request):
    return render(request, 'dashboard/novo_registro.html', {})

# Views simplificadas para Colmeias (sem necessidade de login ou DB)
def minhas_colmeias_view(request):
    # Dados de exemplo para a página de colmeias
    colmeias = [
        {"id": 1, "nome": "Colmeia A"},
        {"id": 2, "nome": "Colmeia B"},
        {"id": 3, "nome": "Colmeia C"},
        {"id": 4, "nome": "Colmeia D"},
        {"id": 5, "nome": "Colmeia E"},
    ]
    return render(request, 'dashboard/minhas_colmeias.html', {"colmeias": colmeias})

def nova_colmeia_view(request):
    return render(request, 'dashboard/nova_colmeia.html', {})

def editar_colmeia_view(request, colmeia_id):
    return render(request, 'dashboard/editar_colmeia.html', {})

def editar_producao_view(request, colmeia_id):
    return render(request, 'dashboard/editar_producao.html', {})

def adicionar_registro_view(request, colmeia_id):
    return render(request, 'dashboard/novo_registro.html', {})

