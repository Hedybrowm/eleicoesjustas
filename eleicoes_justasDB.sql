CREATE TABLE assembleias(
	codigo_assembleia int not null auto_increment,
    numero int,
    nome varchar(50),
    codigo_localidade int,
    PRIMARY KEY (codigo_assembleia)
);

CREATE TABLE votos_presidentes(
    codigo_delegado int,
    codigo_mesa int,
    codigo_PR_candidato int,
    quantidade int,
    PRIMARY KEY (codigo_delegado, codigo_mesa, codigo_PR_candidato),
    FOREIGN KEY (codigo_delegado) REFERENCES delegados(codigo_delegado),
    FOREIGN KEY (codigo_mesa) REFERENCES mesas_eleitorais(codigo_mesa),
    FOREIGN KEY (codigo_PR_candidato) REFERENCES presidentes_candidatos(codigo_PR_candidato)
);

CREATE TABLE mesas_eleitorais(
    codigo_mesa int not null auto_increment,
    numero int,
    nome varchar(50),
    codigo_assembleia int,
    acta varchar(50),
    PRIMARY KEY (codigo_mesa),
    FOREIGN KEY (codigo_assembleia) REFERENCES assembleias(codigo_assembleia)
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

CREATE TABLE delegados(
	codigo_delegado int not null auto_increment,
    nome_completo varchar(50),
    nome_utilizador varchar(50),
    palavra_passe varchar(50),
    tipo char(1),
    BI varchar(15),
    copia_acta varchar(50),
    telemovel varchar(13),
    email varchar(50),
    codigo_mesa int,
    codigo_partido int,
    PRIMARY KEY (codigo_delegado),
    FOREIGN KEY (codigo_mesa) REFERENCES mesas_eleitorais(codigo_mesa),
    FOREIGN KEY (codigo_partido) REFERENCES partidos(codigo_partido)
);

CREATE TABLE presidentes_candidatos(
    codigo_PR_candidato int not null auto_increment,
    numero int,
    nome varchar(50),
    codigo_partido int,
    PRIMARY KEY (codigo_PR_candidato),
    FOREIGN KEY (codigo_partido) REFERENCES partidos(codigo_partido)
);

CREATE TABLE partidos(
    codigo_partido int not null auto_increment,
    numero int,
    nome varchar(50),
    bandeira varchar(50),
    codigo_PR_candidato int,
    PRIMARY KEY (codigo_partido),
    FOREIGN KEY (codigo_PR_candidato) REFERENCES presidentes_candidatos(codigo_PR_candidato)
);