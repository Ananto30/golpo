FROM node:14.13-alpine3.10 as builder

WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client/public public
COPY client/src src
RUN npm run build

FROM node:14.13-alpine3.10

WORKDIR /usr/src/app/server
COPY --from=builder /usr/src/app/client/build /usr/src/app/client/build
COPY package*.json ./
RUN npm install
COPY server .

EXPOSE 8080
USER node
CMD ["node", "./bin/www"]
