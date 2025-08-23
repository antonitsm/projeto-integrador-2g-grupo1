from django import forms
from .models import Colmeia

class ColmeiaForm(forms.ModelForm):
    class Meta:
        model = Colmeia
        fields = ['nome', 'temperatura', 'peso', 'umidade']