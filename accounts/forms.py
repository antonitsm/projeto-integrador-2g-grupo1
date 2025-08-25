from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User

class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'meu-input-customizado',
        'placeholder': 'Digite seu e-mail ou usuário', 
        'id': 'email-login' 
    }))

    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'meu-input-customizado',
        'placeholder': 'Digite sua senha',
        'id': 'senha-login' 
    }))


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(
        label="E-mail",
        widget=forms.EmailInput(attrs={'id': 'email-cadastro'})
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('email',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.fields['username'].label = "Nome de usuário"
        self.fields['username'].widget.attrs.update({
            'id': 'nome-cadastro'
        })

        self.fields['password1'].label = "Senha"
        self.fields['password1'].widget.attrs.update({
            'id': 'senha-cadastro'
        })

        self.fields['password2'].label = "Confirmar Senha"
        self.fields['password2'].widget.attrs.update({
            'id': 'confirmar-senha'
        })