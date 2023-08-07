FROM node:18-alpine AS base

RUN npm i -g pnpm

USER CA005

# ---

FROM base AS dependencies

WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

# ---

FROM base AS build

WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm build
#RUN pnpm prune --prod

# ---

FROM base AS deploy

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/ ./dist/
COPY --from=build /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
