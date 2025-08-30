from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from .forms import CustomLoginForm, CustomUserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponse


def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('minhas_colmeias')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = CustomLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('minhas_colmeias')
    else:
        form = CustomLoginForm()
    return render(request, 'accounts/login.html', {'form': form})


@login_required
def accounts_view(request):
    return render(request, 'accounts/accounts.html')


@login_required
def atualizar_perfil(request):
    if request.method == "POST":
        novo_username = request.POST.get("nome_usuario")
        email = request.POST.get("email")

        user = request.user
        mensagem = ""
        if novo_username and novo_username != user.username:
            if not User.objects.filter(username=novo_username).exists():
                user.username = novo_username
                mensagem = "Dados atualizados com sucesso!"
            else:
                mensagem = "Login já em uso."
        else:
            mensagem = "Dados atualizados com sucesso!"

        user.email = email
        user.save()

        # Retorna um alert e redireciona
        return HttpResponse(f"""
            <script>
                alert("{mensagem}");
                window.location.href = "{request.META.get('HTTP_REFERER', '/')}";
            </script>
        """)

    return HttpResponse("""
        <script>
            alert("Requisição inválida.");
            window.location.href = "/";
        </script>
    """)

@login_required
def excluir_conta(request):
    if request.method == "POST":
        user = request.user
        logout(request)  # desloga o usuário antes de excluir
        user.delete()    # exclui a conta
        return redirect('home')  # redireciona para a home ou página inicial
    return redirect('conta')  # se tentar GET, volta para a página de conta