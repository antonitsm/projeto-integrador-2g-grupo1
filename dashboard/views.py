from django.shortcuts import render, redirect, get_object_or_404
from .models import Colmeia
from .forms import ColmeiaForm

# Página inicial do dashboard
def paginainicialdashboard_view(request):
    return render(request, 'dashboard/paginainicialdashboard.html')


# ---- COLMEIAS ----
def dados_view(request): 
    return render(request, 'dashboard/dados.html')

def observacao_view(request): 
    return render(request, 'dashboard/observacao.html')

def producao_view(request): 
    return render(request, 'dashboard/producao.html')

# Listar colmeias cadastradas
def minhas_colmeias_view(request):
    colmeias = Colmeia.objects.all()
    return render(request, 'dashboard/minhas_colmeias.html', {"colmeias": colmeias})


# Criar nova colmeia
def nova_colmeia_view(request):
    if request.method == "POST":
        print("if")
        form = ColmeiaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("minhas_colmeias")
    else:
        print("else")
        form = ColmeiaForm()
    return render(request, "dashboard/minhas_colmeias.html", {"form": form})


# Editar colmeia
def editar_colmeia_view(request, colmeia_id):
    colmeia = get_object_or_404(Colmeia, id=colmeia_id)
    if request.method == "POST":
        form = ColmeiaForm(request.POST, instance=colmeia)
        if form.is_valid():
            form.save()
            return redirect("minhas_colmeias")
    else:
        form = ColmeiaForm(instance=colmeia)
    return render(request, "dashboard/editar_colmeia.html", {"form": form, "colmeia": colmeia})
