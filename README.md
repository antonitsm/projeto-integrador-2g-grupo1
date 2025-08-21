# pi2-site

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
```