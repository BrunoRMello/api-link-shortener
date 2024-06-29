# Use uma imagem base Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto usando Yarn
RUN yarn install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compile o TypeScript para JavaScript
RUN yarn build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
