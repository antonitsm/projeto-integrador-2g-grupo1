from django.urls import path

from . import views

urlpatterns = [
    path("", views.paginainicialdashboard_view, name="paginainicialdashboard"),
    path("dados/", views.dados_view, name="dados"),
    path("observacao/", views.observacao_view, name="observacao"),
    path("producao/", views.producao_view, name="producao"),
]