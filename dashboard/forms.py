from django import forms
from .models import Colmeia, Registro

class RegistroForm(forms.ModelForm):
    class Meta:
        model = Registro
        fields = ["titulo", "data_observacao", "colmeia", "observacoes"]
        widgets = {
            "titulo": forms.TextInput(attrs={
                "class": "input-titulo",
                "placeholder": "Digite o título da observação..."
            }),
            "data_observacao": forms.DateInput(attrs={
                "type": "date",
                "class": "input-data"
            }),
            "colmeia": forms.Select(attrs={
                "class": "input-colmeia"
            }),
            "observacoes": forms.Textarea(attrs={
                "class": "areaRegistro",
                "placeholder": "Digite suas observações detalhadas aqui..."
            }),
        }

    def __init__(self, *args, **kwargs):
        # Recebe o usuário da view
        user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)

        # Mostra apenas colmeias ativas
        qs = Colmeia.objects.filter(ativo=True)

        # Se o usuário foi passado, mostra só as colmeias dele
        if user:
            qs = qs.filter(owner=user)

        self.fields["colmeia"].queryset = qs


class ColmeiaForm(forms.ModelForm):
    class Meta:
        model = Colmeia
        fields = ['nome', 'temperatura', 'peso', 'umidade']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'input-titulo', 'placeholder': 'Digite o nome da colmeia'}),
            'temperatura': forms.NumberInput(attrs={'class': 'input-numero', 'step': '0.01', 'placeholder': '0 - 50 °C'}),
            'peso': forms.NumberInput(attrs={'class': 'input-numero', 'step': '0.01', 'placeholder': 'Maior que 0 kg'}),
            'umidade': forms.NumberInput(attrs={'class': 'input-numero', 'step': '0.01', 'placeholder': '0 - 100 %'}),
        }
        error_messages = {
            'temperatura': {
                'max_digits': 'A temperatura deve ter no máximo 3 dígitos antes da vírgula.',
                'max_decimal_places': 'A temperatura deve ter no máximo 2 casas decimais.',
                'required': 'Por favor, informe a temperatura da colmeia.',
                'invalid': 'Informe um número válido para a temperatura.',
            },
            'peso': {
                'max_digits': 'O peso deve ter no máximo 4 dígitos antes da vírgula.',
                'max_decimal_places': 'O peso deve ter no máximo 2 casas decimais.',
                'required': 'Por favor, informe o peso da colmeia.',
                'invalid': 'Informe um número válido para o peso.',
            },
            'umidade': {
                'max_digits': 'A umidade deve ter no máximo 3 dígitos antes da vírgula.',
                'max_decimal_places': 'A umidade deve ter no máximo 2 casas decimais.',
                'required': 'Por favor, informe a umidade da colmeia.',
                'invalid': 'Informe um número válido para a umidade.',
            },
            'nome': {
                'required': 'Por favor, informe o nome da colmeia.',
                'max_length': 'O nome da colmeia deve ter no máximo 100 caracteres.',
            }
        }