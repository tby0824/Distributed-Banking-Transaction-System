FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install express bcryptjs jsonwebtoken sequelize pg pg-hstore dotenv
COPY . .
EXPOSE 4001
CMD ["node", "--max-http-header-size=65536", "server.js"]
