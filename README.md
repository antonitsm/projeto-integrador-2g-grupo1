# pi2-site
NOME: Ecolmeia

DESCRIÇÃO: Esse projeto foi criado com o intuito de auxiliar os apicultores a cuidar de sua criação de abelhas, "guardando" informações sobre o bem estar delas. Para acessar o projeto é necessário cadastro do usuário, após isso o usuário é direcionado á página de "Dados da colmeia", aqui é solicitado o nome das colmeias e informações como Temperatura, peso, umidade e problemas. Ná pagina de produção o usuário coloca dados de quantidade de mel retirado e quantidade de abelhas, além de selecionar um mês para isso, gerando assim um gráfico. Na página de registro o usuário coloca o que observou nas colmeias naquele dia. Além disso o Django (framework) foi usado nesse projeto.

TECNOLOGIAS UTILIZADAS:

Python 3.x

Django

HTML5, CSS3, JAVASCRIPT

Banco de dados configurável (SQLite por padrão, compatível com PostgreSQL/MySQL)


1. instale git no seu computador pelo google
após instalar digite os seguintes codigos no terminal do VScode:
```
git --version
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

2. instale Django
digite no terminal git bash:
```
pip install django
django-admin --version
```

3. instale o PSQL pelo site oficial para Windows: : https://www.postgresql.org/download/windows/
o psql se for windows deve vir com pgadmin4


4. no PGAdmin4 crie o banco de dados a seguir
```
CREATE DATABASE mysite_db;
CREATE USER mysite_user WITH PASSWORD '123456';
ALTER ROLE mysite_user SET client_encoding TO 'utf8';
ALTER ROLE mysite_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE mysite_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE mysite_db TO mysite_user;
```

5. va no terminal bash e coloque esses comandos
```
python manage.py makemigrations
python manage.py migrate
```

6. rode o servidor no terminal bash
```
python manage.py runserver












