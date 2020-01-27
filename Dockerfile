FROM node:latest as builder

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist/ /usr/share/nginx/html

CMD nginx -g "daemon off;"
