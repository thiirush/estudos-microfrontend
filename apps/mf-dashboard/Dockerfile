FROM node:20.19.0-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./package.json
COPY apps/mf-dashboard/package.json ./apps/mf-dashboard/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/zustand/package.json ./packages/zustand/package.json

RUN npm install

COPY . .

RUN npm run build -w mf-dashboard

EXPOSE 3002

CMD ["npm", "run", "start", "-w", "mf-dashboard"]
