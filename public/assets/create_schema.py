# Importar librerias
import psycopg2
import os

# Definir variables de conexión
bbdd = 'postgres'
usuario = 'postgres.srovhuplehjiwrumfenw'
contrasenya = 'SKdksnSDOVENDL234'
maquina = 'aws-0-sa-east-1.pooler.supabase.com'
puerto = '6543'

# Conectar a la base de datos
conexion = psycopg2.connect(dbname=bbdd,
                            user=usuario,
                            password=contrasenya,
                            host=maquina,
                            port=puerto
)

# Abrir un cursor para poder realizar operaciones sobre la base de datos.
cursor = conexion.cursor()

#Create Schema
# Crear tablas, procedimientos y triggers de la db_app_noticias
cursor.execute("""
CREATE SCHEMA IF NOT EXISTS db_app_noticias;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE db_app_noticias.USUARIOS (
  id uuid PRIMARY KEY,
  correo VARCHAR(50) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  nombre_usuario VARCHAR(100) NOT NULL,
  nombre_completo VARCHAR(255) NOT NULL,
  sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
  fecha_nacimiento DATE NOT NULL,
  CONSTRAINT chk_sexo CHECK (sexo IN ('M', 'F'))
);
--
--
CREATE TABLE db_app_noticias.ADMINISTRADORES (
  id uuid NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_administradores_usuario FOREIGN KEY (id)
    REFERENCES db_app_noticias.USUARIOS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
--
--
CREATE TABLE db_app_noticias.PUBLICIDAD (
  id uuid PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  multimedia VARCHAR(255),
  fecha_activacion DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  fecha_publicacion DATE NOT NULL,
  id_administrador uuid NOT NULL,
  CONSTRAINT fk_publicidad_administrador FOREIGN KEY (id_administrador)
    REFERENCES db_app_noticias.ADMINISTRADORES(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
--
--
CREATE TABLE db_app_noticias.CATEGORIAS (
  id uuid PRIMARY KEY,
  categoria VARCHAR(100) UNIQUE CHECK (categoria IN ('cientificas', 'culturales', 'deportivas','económicas','farándula','política','sociales','sucesos')),
  CONSTRAINT chk_categoria CHECK (categoria IN ('cientificas', 'culturales', 'deportivas','económicas','farándula','política','sociales','sucesos'))
);
--
--
CREATE TABLE db_app_noticias.NOTICIAS (
  id uuid,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  multimedia TEXT,
  pais VARCHAR(20),
  autor VARCHAR(255),
  url VARCHAR(255),
  vistas INT DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_usuarios uuid NOT NULL,
  id_categorias uuid NOT NULL,
  CONSTRAINT fk_noticias_usuarios FOREIGN KEY (id_usuarios)
  REFERENCES db_app_noticias.USUARIOS (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_noticias_categorias FOREIGN KEY (id_categorias)
  REFERENCES db_app_noticias.CATEGORIAS (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT id_unico PRIMARY KEY (id)
);
--
--
CREATE TABLE db_app_noticias.COMENTARIOS (
  id uuid,
  fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  texto TEXT NOT NULL,
  id_usuarios uuid NOT NULL,
  id_noticias uuid NOT NULL,
  CONSTRAINT id_unico_comentarios PRIMARY KEY (id),
  CONSTRAINT fk_comentarios_usuarios FOREIGN KEY (id_usuarios)
    REFERENCES db_app_noticias.USUARIOS (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_comentarios_noticias FOREIGN KEY (id_noticias)
    REFERENCES db_app_noticias.NOTICIAS (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
--
--
CREATE TABLE db_app_noticias.SUSCRIBIRSE (
  id_usuarios uuid,
  id_categorias uuid,
  PRIMARY KEY (id_usuarios, id_categorias),
  CONSTRAINT fk_suscribirse_usuarios FOREIGN KEY (id_usuarios)
    REFERENCES db_app_noticias.USUARIOS (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_suscribirse_categorias FOREIGN KEY (id_categorias)
    REFERENCES db_app_noticias.CATEGORIAS (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
--
--
CREATE TABLE db_app_noticias.CALIFICAR (
  id_usuarios uuid,
  id_noticias uuid,
  valor INT CHECK (valor BETWEEN 1 AND 5),
  PRIMARY KEY (id_usuarios, id_noticias),
  CONSTRAINT fk_calificar_usuarios FOREIGN KEY (id_usuarios)
    REFERENCES db_app_noticias.USUARIOS (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_calificar_noticias FOREIGN KEY (id_noticias)
    REFERENCES db_app_noticias.NOTICIAS (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- PROCEDIMIENTOS

-- Registrar una suscripción validando que exista usuario, categoría y que no este suscrito (procedimiento 1)
CREATE OR REPLACE PROCEDURE db_app_noticias.registrar_suscripcion(
      _id_usuario UUID,
      _id_categoria UUID
  )
  LANGUAGE plpgsql
  AS $$
  BEGIN
      -- Validación de usuario
      IF NOT EXISTS (SELECT 1 FROM db_app_noticias.USUARIOS WHERE id = _id_usuario) THEN
          RAISE EXCEPTION 'El usuario con id % no existe.', _id_usuario;
      END IF;

      -- Validación de categoría
      IF NOT EXISTS (SELECT 1 FROM db_app_noticias.CATEGORIAS WHERE id = _id_categoria) THEN
          RAISE EXCEPTION 'La categoría con id % no existe.', _id_categoria;
      END IF;

      -- Validación si el usuarios ya estaba inscrito en la categoría
      IF EXISTS (SELECT 1 FROM db_app_noticias.SUSCRIBIRSE WHERE id_usuarios = _id_usuario AND id_categorias = _id_categoria) THEN
          RAISE EXCEPTION 'El usuario ya está suscrito a esta categoría.';
      END IF;

      -- Registrar la suscripción
      INSERT INTO db_app_noticias.SUSCRIBIRSE (id_usuarios, id_categorias)
      VALUES (_id_usuario, _id_categoria);
  END;
  $$;

-- Obtener las estadisticas de las noticias (procedimiento 2)

CREATE OR REPLACE PROCEDURE db_app_noticias.estadisticas_calificaciones(
    _id_noticia UUID,
    OUT promedio NUMERIC,
    OUT total_calificaciones INTEGER,
    OUT total_usuarios INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Validar que la noticia existe
    IF NOT EXISTS (SELECT 1 FROM db_app_noticias.NOTICIAS WHERE id = _id_noticia) THEN
        RAISE EXCEPTION 'La noticia con id % no existe.', _id_noticia;
    END IF;

    -- Obtener las estadísticas
    SELECT
        AVG(valor)::NUMERIC(10,2),
        COUNT(valor),
        COUNT(DISTINCT id_usuarios)
    INTO promedio, total_calificaciones, total_usuarios
    FROM db_app_noticias.CALIFICAR
    WHERE id_noticias = _id_noticia;
END;
$$;

-- TRIGGERS

-- Verificar que la fecha de fin no sea anterior a fecha_activacion o fecha_publicacion (trigger 1)
CREATE OR REPLACE FUNCTION db_app_noticias.verificar_fechas_publicidad()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar que la fecha_fin no sea anterior a fecha_activacion o fecha_publicacion
    IF NEW.fecha_fin IS NOT NULL THEN
        IF NEW.fecha_fin < NEW.fecha_activacion THEN
            RAISE EXCEPTION 'La fecha de fin (%), no puede ser anterior a la fecha de activación (%).',
                NEW.fecha_fin, NEW.fecha_activacion;
        END IF;
        IF NEW.fecha_fin < NEW.fecha_publicacion THEN
            RAISE EXCEPTION 'La fecha de fin (%), no puede ser anterior a la fecha de publicación (%).',
                NEW.fecha_fin, NEW.fecha_publicacion;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el Trigger
CREATE TRIGGER trigger_verificar_fechas_publicidad
BEFORE INSERT OR UPDATE ON db_app_noticias.PUBLICIDAD
FOR EACH ROW EXECUTE FUNCTION db_app_noticias.verificar_fechas_publicidad();

-- Incrementar las vistas de una noticia cuando se crea un comentario (trigger 2)
CREATE OR REPLACE FUNCTION db_app_noticias.incrementar_vistas_noticia()
RETURNS TRIGGER AS $$
BEGIN
UPDATE db_app_noticias.NOTICIAS
SET vistas = vistas + 1
WHERE id = NEW.id_noticias;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_incrementar_vistas
AFTER INSERT ON db_app_noticias.COMENTARIOS
FOR EACH ROW EXECUTE FUNCTION db_app_noticias.incrementar_vistas_noticia();
""")
conexion.commit()