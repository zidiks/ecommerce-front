#FROM node:16-alpine
#ENV APP_ROOT /web
#WORKDIR ${APP_ROOT}
#ADD . ${APP_ROOT}
#RUN npm ci
#RUN npm run build
#CMD ["npm", "run", "start"]

FROM node:16-alpine
RUN mkdir -p /var/www/dockerize-nuxt/nuxt-app
WORKDIR /var/www/dockerize-nuxt/nuxt-app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=5000

CMD [ "npm", "start" ]
