FROM nginx:1.15.0-alpine

# Removendo o arquivo default do nginx
RUN rm /etc/nginx/conf.d/default.conf 

# Copiando o arquivo de configuração modificado para a pasta
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

# ENTRYPOINT [ "/docker-entrypoint.sh" ]

# CMD ["nginx", "-g", "daemon off;"]