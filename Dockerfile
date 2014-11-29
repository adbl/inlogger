FROM ubuntu:12.04

RUN apt-get update && \
    apt-get -y install python-pip && \
    pip install --upgrade pip==1.5.6 && \
    `which pip` install Flask==0.10.1
ADD https://deb.nodesource.com/setup /
RUN bash setup && \
    apt-get -y install nodejs && \
    npm install -g npm@2.1.10
ADD . /opt/inlogger
WORKDIR /opt/inlogger
RUN npm install
RUN npm run build
# TODO should use gulp or something
RUN ln -s bundle.min.js inlogger/static/bundle.js
VOLUME ["/opt/inlogger"]
VOLUME ["/mnt/db"]
ENTRYPOINT ["python", "server.py"]