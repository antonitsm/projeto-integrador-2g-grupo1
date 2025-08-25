from django.db import models
from django.contrib.auth.models import User

class Colmeia(models.Model):
    nome = models.CharField(max_length=100)
    temperatura = models.DecimalField(max_digits=5, decimal_places=2, help_text="Temperatura em °C")
    peso = models.DecimalField(max_digits=6, decimal_places=2, help_text="Peso em kg")
    umidade = models.DecimalField(max_digits=5, decimal_places=2, help_text="Umidade em %")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    def clean(self):
        # Validação da temperatura
        if self.temperatura < 0 or self.temperatura > 50:
            raise ValidationError({'temperatura': "A temperatura deve estar entre 0°C e 50°C."})
        
        # Validação do peso
        if self.peso <= 0:
            raise ValidationError({'peso': "O peso deve ser maior que 0 kg."})
        
        # Validação da umidade
        if self.umidade < 0 or self.umidade > 100:
            raise ValidationError({'umidade': "A umidade deve estar entre 0% e 100%."})
        
        

class Registro(models.Model):
    titulo = models.CharField(max_length=200)
    data_observacao = models.DateField()
    colmeia = models.ForeignKey(Colmeia, on_delete=models.CASCADE, related_name="registros")
    observacoes = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.titulo} - {self.colmeia.nome}"