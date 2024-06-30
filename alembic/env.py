from sqlalchemy.orm import declarative_base
from distutils.command.config import config
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config

from alembic import context
import os
import contextlib

name = "shift_service"

Base = declarative_base()

DEFAULT_URI = "sqlite:///local.db"


target_metadata = Base.metadata

config_ = context.config

fileConfig(config_.config_file_name)  # type: ignore


def _create_uri(name, driver, host, username, password):
    database = name or os.environ["DATABASE_NAME"]
    driver = driver or os.environ["DATABASE_DRIVER"]
    host = host or os.environ.get("DATABASE_HOST", "db")
    username = username or os.environ["DATABASE_USERNAME"]
    password = password or os.environ["DATABASE_PASSWORD"]
    return f"{driver}://{username}:{password}@{host}/{database}"


def create_uri(default=DEFAULT_URI, raise_exception=False, **kwargs):
    database = kwargs.get("name")
    driver = kwargs.get("driver", "postgresql+psycopg2")
    host = kwargs.get("host")
    username = kwargs.get("username")
    password = kwargs.get("password")
    uri = None

    with contextlib.suppress(Exception):
        uri = _create_uri(database, driver, host, username, password)

    if uri is None and raise_exception:
        raise ValueError("Unable to create database uri")

    return uri or default or DEFAULT_URI


def get_version_table(name):
    return f"{name}_migration_version"


def run_migrations_offline(name, target_metadata=None):
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = str(create_uri())
    context.configure(
        url=url,
        target_metadata=target_metadata,
        version_table=get_version_table(name),
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online(name, target_metadata=None):
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    config_.set_main_option("sqlalchemy.url", create_uri()),
    connectable = engine_from_config(
        config_.get_section(config_.config_ini_section, {}),
        prefix="sqlalchemy.",
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            version_table=get_version_table(name),
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline(name, target_metadata)
else:
    run_migrations_online(name, target_metadata)
