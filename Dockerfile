FROM node:16-alpine
ENV APP_ROOT /web
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
RUN npm ci
RUN npm run build
CMD ["npm", "run", "start"]

FROM nginx:1.23.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html
