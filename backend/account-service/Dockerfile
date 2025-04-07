FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install express sequelize pg pg-hstore ioredis dotenv
COPY . .
EXPOSE 4002
CMD ["node", "--max-http-header-size=65536", "server.js"]
