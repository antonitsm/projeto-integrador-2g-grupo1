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