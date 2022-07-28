FROM node:16.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD  ["npm", "run", "start:dev"]
