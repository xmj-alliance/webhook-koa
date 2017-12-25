# example building and running
# docker build . -t webhook-koa

# docker run -d -p 14546:14546 --name webhook-koa-c1 \
# -e EXEC_USER=$USER -e EXEC_USER_ID=$UID \
# -v /path/to/your/source/code:/src \
# -v /path/to/actions:/workspace/actions \
# webhook-koa

FROM alpine:latest
LABEL maintainer="Valroad <valorad@outlook.com>"

RUN echo " --- Software installation starts --- " \
 && apk update \
 && apk add nodejs nodejs-npm su-exec \
 && rm -rf /var/cache/apk/*

ADD . /workspace
# excluded ./actions now. That folder is mounted as a volume.

WORKDIR /workspace

VOLUME ["/src", "/workspace/actions"]

RUN echo " --- Node module collection starts --- " \
 # node module collection
 && npm install \
 && npm cache clean --force

ENV EXEC_USER=valorad
ENV EXEC_USER_ID=1000

ENTRYPOINT ["/workspace/index.sh"]
CMD npm start && /bin/sh