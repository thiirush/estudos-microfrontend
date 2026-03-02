FROM node:20.19.0-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./package.json
COPY apps/mf-products/package.json ./apps/mf-products/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/zustand/package.json ./packages/zustand/package.json

RUN npm install

COPY . .

RUN npm run build -w mf-products

EXPOSE 3003

CMD ["npm", "run", "start", "-w", "mf-products"]
