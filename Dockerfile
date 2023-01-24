FROM node:18.13-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3333:3333
CMD [ "node", "server.js" ]
