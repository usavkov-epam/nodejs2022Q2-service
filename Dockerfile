FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .

EXPOSE ${PORT}

CMD  ["yarn", "start:dev"]
