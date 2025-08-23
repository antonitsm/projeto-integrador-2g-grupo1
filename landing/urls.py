from django.urls import path

from . import views

urlpatterns = [
    path("", views.home_view, name="home"),
    path("termos/", views.termo_view, name="termos"),
    path("politica/", views.politica_view, name="politica"),
]