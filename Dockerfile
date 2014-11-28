FROM ubuntu:12.04

RUN apt-get update && \
    apt-get -y install python-pip && \
    pip install --upgrade pip==1.5.6 && \
    `which pip` install Flask
ADD . /opt/inlogger
VOLUME ["/opt/inlogger"]
WORKDIR /opt/inlogger
