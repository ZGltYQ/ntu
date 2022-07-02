FROM node:14-alpine as BUILDER

WORKDIR /app
COPY . .
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --prod

FROM node:14-alpine
WORKDIR /app
COPY --from=BUILDER /app .


RUN apk update && apk add libreoffice
RUN apk add --no-cache msttcorefonts-installer fontconfig
RUN update-ms-fonts

# Here you can copy all additional data and commands to be added to image
# For example: configuration for crontabs:
# COPY crontabs/busybox.conf /etc/busybox.conf
# RUN chmod 600 /etc/busybox.conf

ENV DB_HOST=percona

ENV PORT=8000
EXPOSE 8000

ENTRYPOINT []