FROM node:latest


RUN npm install -g pnpm


WORKDIR /app

COPY package.json pnpm-lock.yaml* ./


RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "pnpm start:dev"]

