from django.urls import path
from . import views

urlpatterns = [
    path('colmeia/cadastrar/', views.new_hive_view, name='nova_colmeia'), 
    path("paginainicialdashboard/", views.home_page_dashboard_view, name="paginainicialdashboard"),
    path("dados/", views.data_view, name="dados"),
    path("observacao/", views.observation_view, name="observacao"),
    path("producao/", views.production_view, name="producao"),
    path("registros/", views.all_registration_view, name="tudo_registros"),

    # URLs para Colmeias

    path("minhas_colmeias/", views.my_hives_view, name="minhas_colmeias"),
    path("colmeias/adicionar/", views.add_hive, name="adicionar_colmeia"),
    path("colmeias/dados/<int:pk>/", views.edit_hive, name="editar_colmeia"), 
    path("colmeias/<int:pk>/", views.hive_details, name="detalhes_colmeia"),
    path("colmeias/<int:pk>/excluir/", views.delete_hive, name="excluir_colmeia"), 


    # Registros
    path("registros/<int:pk>/", views.registration_detail, name="detalhe_registro"),
    path('observacao/<int:pk>/', views.observation_view, name='editar_registro'),
    path("observacao/<int:pk>/excluir/", views.delete_registration, name="excluir_registr"),
]