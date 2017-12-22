# example building and running
# docker build . -t webhook-koa --build-arg username=$USER
# docker run -d -p 14546:14546 --name webhook-koa-c1 -e EXEC_USER=$USER -v /path/to/your/source/code:/src webhook-koa

FROM node:alpine
LABEL maintainer="Valroad <valorad@outlook.com>"

RUN echo " --- Software installation starts --- " \
 && apk update \
 && apk add git sudo \
 && rm -rf /var/cache/apk/*

ARG username=valorad

VOLUME ["/src"]

ADD . /workspace

WORKDIR /workspace

RUN echo " --- Node module collection starts --- " \
 # node module collection
 && npm install \
 && cd actions \
 && npm install \
 && npm cache clean --force

RUN echo " --- User initialization starts --- " \
 # new normal user and his permission setup
 && adduser $username -D -H -s /bin/sh \
 && chmod -R 755 /workspace
#  && chmod -R 755 /src \
#  && chown -R $username /src

# USER $username

ENV EXEC_USER=valorad

ENTRYPOINT ["/workspace/index.sh"]
# CMD [ "npm", "start" ] # moved to bash shell