FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install express multer sequelize pg pg-hstore dotenv @azure/storage-blob
COPY . .
EXPOSE 4005
CMD ["node", "--max-http-header-size=65536", "server.js"]
