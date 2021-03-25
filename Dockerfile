FROM node:14-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN npm run build

FROM base as prod
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN ./node_modules/.bin/nest build
CMD ["node", "dist/main"]