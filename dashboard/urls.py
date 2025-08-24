from django.urls import path
from . import views

urlpatterns = [
    path('colmeia/cadastrar/', views.nova_colmeia_view, name='nova_colmeia'), 
    path("paginainicialdashboard/", views.paginainicialdashboard_view, name="paginainicialdashboard"),
    path("dados/", views.dados_view, name="dados"),
    path("observacao/", views.observacao_view, name="observacao"),
    path("producao/", views.producao_view, name="producao"),
    path("registros/", views.tudo_registros_view, name="tudo_registros"),

    # URLs para Colmeias

    path("minhas_colmeias/", views.minhas_colmeias_view, name="minhas_colmeias"),
    path("colmeias/adicionar/", views.adicionar_colmeia, name="adicionar_colmeia"),
    path("colmeias/dados/<int:pk>/", views.editar_colmeia, name="editar_colmeia"), 
    path("colmeias/<int:pk>/", views.detalhes_colmeia, name="detalhes_colmeia"),
    path("colmeias/<int:pk>/excluir/", views.excluir_colmeia, name="excluir_colmeia"), 
]