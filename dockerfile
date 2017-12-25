# example building and running
# docker build . -t webhook-koa
# docker run -d -p 14546:14546 --name webhook-koa-c1 -e EXEC_USER=$USER -e EXEC_USER_ID=$UID -v /path/to/your/source/code:/src webhook-koa

FROM alpine:edge
LABEL maintainer="Valroad <valorad@outlook.com>"

RUN echo " --- Software installation starts --- " \
 && apk update \
 && apk add nodejs nodejs-npm su-exec \
 && rm -rf /var/cache/apk/*

# ARG username=valorad

VOLUME ["/src"]

ADD . /workspace

WORKDIR /workspace

RUN echo " --- Node module collection starts --- " \
 # node module collection
 && npm install \
 && cd actions \
 && npm install \
 && npm cache clean --force

# RUN echo " --- User initialization starts --- " \
#  # new normal user and his permission setup
#  && adduser $username -D -H -s /bin/sh \
#  && chmod -R 755 /workspace
#  && chmod -R 755 /src \
#  && chown -R $username /src

# USER $username

ENV EXEC_USER=valorad
ENV EXEC_USER_ID=1000

ENTRYPOINT ["/workspace/index.sh"]
CMD npm start