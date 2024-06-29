# Use uma imagem Node.js oficial como a imagem de base
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto usando Yarn
RUN yarn install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Baixe o script wait-for-it.sh e torne-o executável
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
  chmod +x /usr/local/bin/wait-for-it.sh

# Compile o TypeScript para JavaScript
RUN yarn build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação com o wait-for-it.sh
CMD ["wait-for-it.sh", "mysql:3306", "--", "yarn", "start"]
