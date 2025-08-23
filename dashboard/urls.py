from django.urls import path
from . import views

urlpatterns = [
    path("paginainicialdashboard/", views.paginainicialdashboard_view, name="paginainicialdashboard"),
    path("dados/", views.dados_view, name="dados"),
    path("observacao/", views.observacao_view, name="observacao"),
    path("producao/", views.producao_view, name="producao"),
    path("registros/", views.tudo_registros_view, name="tudo_registros"),

    # URLs para Registros
    path("registros/detalhes/<int:registro_id>/", views.detalhes_registro_ajax, name="detalhes_registro"),
    path("registros/novo/", views.novo_registro_view, name="novo_registro"),

    # URLs para Colmeias
    path("minhas_colmeias/", views.minhas_colmeias_view, name="minhas_colmeias"),
    path("colmeias/nova/", views.nova_colmeia_view, name="nova_colmeia"),
    path("colmeias/editar/<int:colmeia_id>/", views.editar_colmeia_view, name="editar_colmeia"),
    path("colmeias/producao/<int:colmeia_id>/", views.editar_producao_view, name="editar_producao"),
    path(" colmeias/registro/<int:colmeia_id>/", views.adicionar_registro_view, name="adicionar_registro"),
    
]