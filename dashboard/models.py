from django.db import models

class Colmeia(models.Model):
    nome = models.CharField(max_length=100)
    temperatura = models.DecimalField(max_digits=5, decimal_places=2, help_text="Temperatura em °C")
    peso = models.DecimalField(max_digits=6, decimal_places=2, help_text="Peso em kg")
    umidade = models.DecimalField(max_digits=5, decimal_places=2, help_text="Umidade em %")

    def __str__(self):
        return f"{self.nome} - {self.temperatura}°C | {self.peso}kg | {self.umidade}%"