FROM node:latest as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN ls -al

COPY . .

RUN npm install

FROM node:latest
WORKDIR /app

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "dev"]
