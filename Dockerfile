FROM node:16.14.2-alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]