from django.urls import path
from . import views

urlpatterns = [
    # Dashboard / Página principal
    path("dados/", views.dados_view, name="dados"),
    path("producao/", views.producao_view, name="producao"),

    # Colmeias
    path("minhas_colmeias/", views.minhas_colmeias_view, name="minhas_colmeias"),
    path("colmeia/cadastrar/", views.nova_colmeia_view, name="nova_colmeia"),
    path("colmeias/adicionar/", views.adicionar_colmeia, name="adicionar_colmeia"),
    path("colmeias/dados/<int:pk>/", views.editar_colmeia, name="editar_colmeia"), 
    path("colmeias/<int:pk>/", views.detalhes_colmeia, name="detalhes_colmeia"),
    path("colmeias/<int:pk>/excluir/", views.excluir_colmeia, name="excluir_colmeia"),

    # Registros / Observações
    path("registros/", views.tudo_registros_view, name="tudo_registros"),
    path("registros/<int:pk>/", views.detalhe_registro, name="detalhe_registro"),
    path("observacao/", views.observacao_view, name="observacao"),
    path("observacao/<int:pk>/", views.observacao_view, name="editar_registro"),
    path("observacao/<int:pk>/excluir/", views.excluir_registro, name="excluir_registro"),
]
