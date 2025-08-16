CREATE DATABASE apicultura;
\c apicultura


CREATE TABLE colmeia(
    id_colmeia INT PRIMARY KEY,
    nome VARCHAR(100),
    peso FLOAT,
    quantidade_de_abelhas INT,
    quantidade_de_mel FLOAT,
    hora TIME,
    dia DATE,
    mes INT,
    ano INT,
    problemas TEXT
);

CREATE TABLE agricultor(
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    id_usuario INT PRIMARY KEY,
    fk_colmeia_id_colmeia INT REFERENCES (id_colmeia)
);

CREATE TABLE registros(
    id_resgistro INT PRIMARY KEY,
    dia DATE,
    mes INT,
    ano INT,
    fk_colmeia_id_colmeia INT REFERENCES (id_colmeia)
);

-- dados para inserir

INSERT INTO colmeia (id_colmeia, nome, peso, quantidade_de_abelhas, quantidade_de_mel, hora, dia, mes, ano, problemas) VALUES
();

INSERT INTO agricultor (email, senha, nome , id_usuario, fk_colmeia_id_colmeia) VALUES
();

INSERT INTO registros (id_resgistro, dia, mes, ano, fk_colmeia_id_colmeia) VALUES
();