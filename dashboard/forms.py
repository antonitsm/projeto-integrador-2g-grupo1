from django import forms
from .models import Colmeia
from .models import Registro

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

class ColmeiaForm(forms.ModelForm):
    class Meta:
        model = Colmeia
        fields = ['nome', 'temperatura', 'peso', 'umidade']