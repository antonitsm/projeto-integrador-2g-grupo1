from django.shortcuts import render, redirect, get_object_or_404
from .forms import ColmeiaForm
from .models import Colmeia, Registro


from .forms import RegistroForm

# Página inicial do dashboard
def paginainicialdashboard_view(request):
    return render(request, 'dashboard/paginainicialdashboard.html')


# ---- COLMEIAS ----
def dados_view(request): 
    return render(request, 'dashboard/dados.html')

def producao_view(request): 
    return render(request, 'dashboard/producao.html')

# Listar colmeias cadastradas
def minhas_colmeias_view(request):
    colmeias = Colmeia.objects.all()
    return render(request, 'dashboard/minhas_colmeias.html', {"colmeias": colmeias})



def detalhes_colmeia(request, pk):
    pass

def adicionar_colmeia(request):
    pass

def editar_colmeia(request, pk):
    colmeia = get_object_or_404(Colmeia, pk=pk)
    
    if request.method == 'POST':
        form = ColmeiaForm(request.POST, instance=colmeia)
        if form.is_valid():
            form.save()
            return redirect('minhas_colmeias')  # ou para a página de detalhes
    else:
        form = ColmeiaForm(instance=colmeia)  # aqui os dados já vêm preenchidos

    return render(request, 'dashboard/dados.html', {'form': form, 'colmeia': colmeia})
    

def excluir_colmeia(request, pk):
    colmeia = get_object_or_404(Colmeia, pk=pk)

    if request.method == "POST":
        colmeia.delete()
        return redirect("minhas_colmeias")

    # Se for GET, mostra a tela de confirmação
    return render(request, "dashboard/confirmar_exclusao.html", {"colmeia": colmeia})


# Criar nova colmeia
def nova_colmeia_view(request):
    erros = {}
    dados = {}

    if request.method == "POST":
        # Pega os dados enviados pelo formulário
        dados = {
            "nome": request.POST.get("nome"),
            "temperatura": request.POST.get("temperatura"),
            "peso": request.POST.get("peso"),
            "umidade": request.POST.get("umidade"),
        }

        # Cria o objeto Colmeia
        colmeia = Colmeia(
            nome=dados["nome"],
            temperatura=dados["temperatura"],
            peso=dados["peso"],
            umidade=dados["umidade"],
        )

        try:
            # Valida usando o clean() do models
            colmeia.full_clean()
            colmeia.save()
            return redirect("minhas_colmeias")
        except ValidationError as e:
            erros = e.message_dict  # Captura os erros para mostrar no template

    return render(request, "dashboard/minhas_colmeias.html", {"erros": erros, "dados": dados})

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




  # vamos criar um form para facilitar

# --- LISTAR REGISTROS ---
def tudo_registros_view(request):
    registros = Registro.objects.all().order_by("-data_observacao")
    return render(request, "dashboard/tudo_registros.html", {"registros": registros})

# --- DETALHE ---
def detalhe_registro(request, pk):
    registro = get_object_or_404(Registro, pk=pk)
    return render(request, "registros/detalhe.html", {"registro": registro})

# --- CRIAR ---
def observacao_view(request, pk=None):
    if pk:
        registro = get_object_or_404(Registro, pk=pk)  # Registro existente
    else:
        registro = None  # Novo registro

    if request.method == "POST":
        form = RegistroForm(request.POST, instance=registro)
        if form.is_valid():
            form.save()
            return redirect("tudo_registros")
    else:
        form = RegistroForm(instance=registro)  # Preenche se for edição

    return render(request, "dashboard/observacao.html", {"form": form})

# --- EDITAR ---
from django.shortcuts import render, get_object_or_404, redirect
from .forms import RegistroForm
from .models import Registro

def observacao_view(request, pk=None):
    if pk:
        # Registro existente (edição)
        registro = get_object_or_404(Registro, pk=pk)
        if request.method == "POST":
            form = RegistroForm(request.POST, instance=registro)
            if form.is_valid():
                form.save()
                return redirect("tudo_registros")
        else:
            form = RegistroForm(instance=registro)
    else:
        # Novo registro (criação)
        if request.method == "POST":
            form = RegistroForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect("tudo_registros")
        else:
            form = RegistroForm()

    return render(request, "dashboard/observacao.html", {"form": form, "registro": registro if pk else None})

# --- EXCLUIR ---
def excluir_registro(request, pk):
    registro = get_object_or_404(Registro, pk=pk)
    if request.method == "POST":
        registro.delete()
        return redirect("tudo_registros")
    return render(request, "registros/confirmar_exclusao.html", {"registro": registro})
