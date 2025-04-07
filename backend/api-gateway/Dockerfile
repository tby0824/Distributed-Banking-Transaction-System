FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT_API_GATEWAY}
CMD ["node", "server.js"]
