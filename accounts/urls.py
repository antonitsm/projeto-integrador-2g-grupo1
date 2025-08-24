from django.urls import path

from . import views

urlpatterns = [
    path("", views.login_view, name="login"),
    path("cadastro/", views.cadastro_view, name="accounts:cadastro"),
    path("minha-conta/", views.conta_view, name="conta"),
    path('', views.paginainicialdashboard_view, name='paginainicialdashboard'),
    path('cadastro/', views.cadastro_view, name='cadastro'),
    path('login/', views.login_view, name='accounts:login'),
]