
FROM node:14-alpine 

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "serve"]
