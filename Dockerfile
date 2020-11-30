FROM node:14 AS builder

WORKDIR /app
RUN apt update && apt install -y --no-install-recommends zopfli brotli && rm -rf /var/lib/apt/lists/*

COPY package.json /app
COPY yarn.lock /app
RUN yarn

COPY src /app/src
COPY public /app/public
RUN yarn build

RUN find build -regextype posix-egrep -regex '.*(\.js|\.css|\.svg|\.webp|\.jpg|\.png|\.html|\.mp4)' -exec zopfli -i1000 {} \;
RUN find build -regextype posix-egrep -regex '.*(\.js|\.css|\.svg|\.webp|\.jpg|\.png|\.html|\.mp4)' -exec brotli --quality 10 --input {} --output {}.br \;

FROM fholzer/nginx-brotli:v1.16.0

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html
