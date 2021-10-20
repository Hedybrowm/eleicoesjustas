CREATE TABLE assembleias(
	codigo_assembleia int auto_increment PRIMARY KEY,
    numero int,
    nome varchar(50),
    foto varchar(32),
    codigo_localidade int
);

CREATE TABLE mesas_eleitorais(
    codigo_mesa int auto_increment PRIMARY KEY,
    numero int,
    nome varchar(50),
    codigo_assembleia int,
    acta varchar(32),
    foto varchar(32),
    FOREIGN KEY (codigo_assembleia) REFERENCES assembleias(codigo_assembleia)
);

CREATE TABLE partidos(
    codigo_partido int auto_increment PRIMARY KEY,
    numero int,
    nome varchar(50),
    bandeira varchar(32),
    codigo_candidato int
);

CREATE TABLE presidentes_candidatos(
    codigo_candidato int auto_increment PRIMARY KEY,
    numero int,
    nome varchar(50),
    foto varchar(32),
    codigo_partido int,
    FOREIGN KEY (codigo_partido) REFERENCES partidos(codigo_partido)
);

alter table partidos add FOREIGN KEY (codigo_candidato) REFERENCES presidentes_candidatos(codigo_candidato);

CREATE TABLE delegados(
	codigo_delegado int auto_increment PRIMARY KEY,
    nome_completo varchar(50),
    nome_utilizador varchar(20),
    palavra_passe varchar(50),
    tipo char(1),
    BI varchar(15),
    copia_acta varchar(32),
    telemovel varchar(12),
    email varchar(50),
    foto varchar(32),
    codigo_mesa int,
    codigo_partido int,
    FOREIGN KEY (codigo_mesa) REFERENCES mesas_eleitorais(codigo_mesa),
    FOREIGN KEY (codigo_partido) REFERENCES partidos(codigo_partido)
);

CREATE TABLE votos_presidentes(
    codigo_delegado int,
    codigo_mesa int,
    codigo_candidato int,
    quantidade int,
    PRIMARY KEY (codigo_delegado, codigo_mesa, codigo_candidato),
    FOREIGN KEY (codigo_delegado) REFERENCES delegados(codigo_delegado),
    FOREIGN KEY (codigo_mesa) REFERENCES mesas_eleitorais(codigo_mesa),
    FOREIGN KEY (codigo_candidato) REFERENCES presidentes_candidatos(codigo_candidato)
);

CREATE TABLE votos_partidos(
    codigo_delegado int,
    codigo_mesa int,
    codigo_partido int,
    quantidade int,
    PRIMARY KEY (codigo_delegado, codigo_mesa, codigo_partido),
    FOREIGN KEY (codigo_delegado) REFERENCES delegados(codigo_delegado),
    FOREIGN KEY (codigo_mesa) REFERENCES mesas_eleitorais(codigo_mesa),
    FOREIGN KEY (codigo_partido) REFERENCES partidos(codigo_partido)
);
