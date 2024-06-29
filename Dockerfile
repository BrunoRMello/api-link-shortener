# Estágio de build
FROM node:18 as build

# Diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos package.json e yarn.lock
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o restante dos arquivos da aplicação
COPY . .

# Compila a aplicação
RUN yarn build

# Estágio de produção
FROM node:18

# Diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos compilados do estágio de build
COPY --from=build /app/dist ./dist

# Copia os arquivos de dependências e instala somente as dependências de produção
COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production

# Porta em que a aplicação será exposta
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["node", "dist/shared/infra/http/server.js"]
