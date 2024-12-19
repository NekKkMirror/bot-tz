ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION} AS base

RUN mkdir -p /app && chown node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package*.json ./

# Production dependencies stage
# Install only production dependencies to minimize the final image size
FROM base AS production-dependencies
RUN npm install --omit=dev

# Development dependencies stage
# Install all dependencies (including devDependencies) for development mode
FROM base AS dev-dependencies
RUN npm install

# Build stage for production
# Copies the source code and builds the app for production
FROM base AS build-prod
COPY --chown=node:node . .
RUN npm run build:prod

# Development environment
# Includes all dependencies and starts the application in development mode
FROM base AS development
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY --chown=node:node . ./
CMD ["npm", "run", "start:dev"]

# Testing environment
# Includes all dependencies and sets up the container for running tests
FROM base AS testing
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY --chown=node:node . ./
CMD ["npm", "run", "test"]

# Production environment
# Includes only production dependencies and the prebuilt application
FROM base AS production
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build-prod /app/build ./build
CMD ["npm", "run", "start:prod"]
