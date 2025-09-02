from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.exceptions import ValidationError

class Colmeia(models.Model):
    nome = models.CharField(max_length=100)
    temperatura = models.DecimalField(max_digits=5, decimal_places=2, help_text="Temperatura em °C")
    peso = models.DecimalField(max_digits=6, decimal_places=2, help_text="Peso em kg")
    umidade = models.DecimalField(max_digits=5, decimal_places=2, help_text="Umidade em %")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    ativo = models.BooleanField(default=True)  # 🔹 novo campo

    def __str__(self):
        return self.nome

    def clean(self):
        # Temperatura
        if self.temperatura is None or self.temperatura < 0 or self.temperatura > 50:
            raise ValidationError({'temperatura': "A temperatura deve estar entre 0°C e 50°C."})
        
        # Peso
        if self.peso is None or self.peso <= 0:
            raise ValidationError({'peso': "O peso deve ser maior que 0 kg."})
        
         # Umidade
        if self.umidade is None or self.umidade < 0 or self.umidade > 100:
            raise ValidationError({'umidade': "A umidade deve estar entre 0% e 100%."})
                
        

class Registro(models.Model):
    titulo = models.CharField(max_length=200)
    data_observacao = models.DateField()
    colmeia = models.ForeignKey(Colmeia, on_delete=models.CASCADE, related_name="registros")
    observacoes = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return f"{self.titulo} - {self.colmeia.nome}"
    
class Producao(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="producoes")
    numero_abelhas = models.IntegerField(default=0)
    quantidade_mel = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    mes = models.CharField(max_length=20)
    criado_em = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.usuario.username} - {self.mes} ({self.quantidade_mel}L)"