FROM python:3.10.14-slim-bookworm as build
ARG POETRY_VERSION

# set poetry and build environment variables:
ENV POETRY_VERSION=${POETRY_VERSION} \
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry' \
  PYSETUP_PATH="/opt/pysetup" \
  POETRY_HOME="/opt/poetry" \
  POETRY_VIRTUALENVS_IN_PROJECT=true 

ENV PATH="$POETRY_HOME/bin:$PATH"

#install necessary packages
RUN apt-get update \
  && apt-get install --no-install-recommends -y \
  curl


RUN curl -sSL https://install.python-poetry.org | python3 - --version ${POETRY_VERSION}

# building base image for project
FROM build as base-project
ARG PROJECT_DIR

# copy necessary files to build the project
WORKDIR ${PYSETUP_PATH}
COPY libs ./libs
COPY alembic ./alembic
COPY alembic.ini ./alembic.ini
COPY seed_db.py ./seed_db.py

COPY ${PROJECT_DIR} ./${PROJECT_DIR}
COPY pyproject.toml .
COPY poetry.lock .

#Project initialization
RUN poetry install --only main

FROM base-project as dev
ARG PROJECT_DIR

WORKDIR /${PYSETUP_PATH}
EXPOSE 8000

CMD ["./libs/scripts/docker_exec.sh","uvicorn", "--host", "0.0.0.0", "shift_service.server:app", "--port", "8000"]
