#!/bin/bash -xe

alembic upgrade head
python seed_db.py

exec "$@"