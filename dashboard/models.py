from django.db import models


class Colmeia(models.Model):
    nome = models.CharField(max_length=100)
    temperatura = models.DecimalField(max_digits=5, decimal_places=2, help_text="Temperatura em °C")
    peso = models.DecimalField(max_digits=6, decimal_places=2, help_text="Peso em kg")
    umidade = models.DecimalField(max_digits=5, decimal_places=2, help_text="Umidade em %")

    def __str__(self):
        return self.nome


class Registro(models.Model):
    titulo = models.CharField(max_length=200)
    data_observacao = models.DateField()
    colmeia = models.ForeignKey(Colmeia, on_delete=models.CASCADE, related_name="registros")
    observacoes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.titulo} - {self.colmeia.nome}"