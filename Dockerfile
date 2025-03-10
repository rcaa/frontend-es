FROM nginx:alpine

COPY ./dist/seu-projeto /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]