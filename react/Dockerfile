# Node.jsイメージをベースにReactアプリケーションをビルド
FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

