from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', views.register_view, name='register'),
    path("", views.accounts_view, name="accounts"),
    path("atualizar-perfil/", views.atualizar_perfil, name="atualizar_perfil"),
    path('excluir-conta/', views.excluir_conta, name='excluir_conta'),
]