ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION} AS base

RUN mkdir -p /home/node/app && chown node:node /home/node/app
RUN mkdir -p /home/node/drive && chown node:node /home/node/drive

WORKDIR /home/node/app

USER node

COPY --chown=node:node package*.json ./

FROM base AS development-dependencies

RUN npm install

FROM base AS development

COPY --from=development-dependencies /home/node/app/node_modules ./node_modules
COPY --chown=node:node . ./

# Install dependencies and generate Prisma client
FROM base AS production-dependencies

RUN npm install
COPY --chown=node:node prisma ./prisma

RUN npx prisma generate

# Build the application
FROM base AS production-build

COPY --from=production-dependencies /home/node/app/node_modules ./node_modules
COPY --from=production-dependencies /home/node/app/prisma ./prisma
COPY --chown=node:node . .

RUN npm run build:prod --omit=dev

# Final production stage
FROM base AS production

COPY --from=production-dependencies /home/node/app/node_modules ./node_modules
COPY --from=production-build /home/node/app/build ./build
COPY --from=production-build /home/node/app/prisma ./prisma
