from django.shortcuts import render, redirect, get_object_or_404
from .forms import ColmeiaForm
from .models import Colmeia, Registro, Producao
from django.contrib.auth.decorators import login_required
from .forms import RegistroForm

def home_page_dashboard_view(request):
    return render(request, 'dashboard/paginainicialdashboard.html')


@login_required
def data_view(request): 
    return render(request, 'dashboard/dados.html')

@login_required
def production_view(request): 
    return render(request, 'dashboard/producao.html')

@login_required
def my_hives_view(request):
    colmeias = Colmeia.objects.filter(owner=request.user)
    return render(request, 'dashboard/minhas_colmeias.html', {"colmeias": colmeias})


@login_required
def hive_details(request, pk):
    pass

@login_required
def add_hive(request):
    pass

@login_required
def editar_colmeia(request, pk):
    colmeia = get_object_or_404(Colmeia, pk=pk, owner=request.user)
    
    if request.method == 'POST':
        form = ColmeiaForm(request.POST, instance=colmeia)
        if form.is_valid():
            form.save()
            return redirect('minhas_colmeias')  # ou para a página de detalhes
    else:
        form = ColmeiaForm(instance=colmeia)  # aqui os dados já vêm preenchidos

    return render(request, 'dashboard/dados.html', {'form': form, 'colmeia': colmeia})
    
@login_required
def excluir_colmeia(request, pk):
    colmeia = get_object_or_404(Colmeia, pk=pk, owner=request.user)

    if request.method == "POST":
        colmeia.delete()
        return redirect("minhas_colmeias")

    # Se for GET, mostra a tela de confirmação
    return render(request, "dashboard/confirmar_exclusao.html", {"colmeia": colmeia})

@login_required
def new_hive_view(request):
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
            owner=request.user,
        )

        try:
            # Valida usando o clean() do models
            colmeia.full_clean()
            colmeia.save()
            return redirect("minhas_colmeias")
        except ValidationError as e:
            erros = e.message_dict  # Captura os erros para mostrar no template

    return render(request, "dashboard/minhas_colmeias.html", {"erros": erros, "dados": dados})

@login_required
def editar_colmeia_view(request, colmeia_id):
    colmeia = get_object_or_404(Colmeia, id=colmeia_id, owner=request.user)
    if request.method == "POST":
        form = ColmeiaForm(request.POST, instance=colmeia)
        if form.is_valid():
            form.save()
            return redirect("minhas_colmeias")
    else:
        form = ColmeiaForm(instance=colmeia)
    return render(request, "dashboard/editar_colmeia.html", {"form": form, "colmeia": colmeia})




  # vamos criar um form para facilitar

@login_required
def all_registration_view(request):
    registros = Registro.objects.filter(owner=request.user)

    # Filtrar por colmeia se enviado
    colmeia_id = request.GET.get("colmeia")
    if colmeia_id:
        registros = registros.filter(colmeia_id=colmeia_id)

    # Ordenar por data
    ordem = request.GET.get("ordem", "desc")
    if ordem == "asc":
        registros = registros.order_by("data_observacao")
    else:
        registros = registros.order_by("-data_observacao")

    # Para popular o select de colmeias
    colmeias = Colmeia.objects.filter(owner=request.user)

    return render(request, "dashboard/tudo_registros.html", {
        "registros": registros,
        "colmeias": colmeias
    })

@login_required
def registration_detail(request, pk):
    registro = get_object_or_404(Registro, pk=pk)
    return render(request, "registros/detalhe.html", {"registro": registro})

@login_required
def observation_view(request, pk=None):
    if pk:
        registro = get_object_or_404(Registro, pk=pk, owner=request.user)  # Registro existente
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

@login_required
def observation_view(request, pk=None):
    if pk:
        # Registro existente (edição)
        registro = get_object_or_404(Registro, pk=pk, owner=request.user)
        if request.method == "POST":
            form = RegistroForm(request.POST, instance=registro, user=request.user)  # 🔹 passa o user
            if form.is_valid():
                registro = form.save(commit=False)
                registro.owner = request.user
                registro.save()
                return redirect("tudo_registros")
        else:
            form = RegistroForm(instance=registro, user=request.user)  # 🔹 passa o user
    else:
        # Novo registro (criação)
        if request.method == "POST":
            form = RegistroForm(request.POST, user=request.user)  # 🔹 passa o user
            if form.is_valid():
                registro = form.save(commit=False)
                registro.owner = request.user
                registro.save()
                return redirect("tudo_registros")
        else:
            form = RegistroForm(user=request.user)  # 🔹 passa o user

    return render(request, "dashboard/observacao.html", {"form": form, "registro": registro if pk else None})

@login_required
def delete_registration(request, pk):
    registro = get_object_or_404(Registro, pk=pk, owner=request.user)
    if request.method == "POST":
        registro.delete()
        return redirect("tudo_registros")
    return render(request, "registros/confirmar_exclusao.html", {"registro": registro})

@login_required
def production_view(request):
    if request.method == "POST":
        numero_abelhas = request.POST.get("numero_abelhas")
        quantidade_mel = request.POST.get("quantidade_mel")
        mes = request.POST.get("mes")

        Producao.objects.create(
            usuario=request.user,
            numero_abelhas=numero_abelhas,
            quantidade_mel=quantidade_mel,
            mes=mes
        )
        return redirect('producao')

    # Pega todas as produções do usuário
    producoes = request.user.producoes.all()
    return render(request, "dashboard/producao.html", {"producoes": producoes})