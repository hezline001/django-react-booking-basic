FROM python:3.11.3-slim-bullseye

ENV PYTHONUNBUFFERED 1

RUN apt-get update

WORKDIR /booking

COPY ./src .

RUN pip install -r req.txt

# RUN python manage.py migrate