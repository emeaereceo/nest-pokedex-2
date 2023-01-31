# Install dependencies only when needed
# Esta primera imagen instala las dependencias y las guarda en cache,
# la primera vez instala todo, pero en las veces posteriores instalara solo las nuevas dependencias
# esto significa que no tiene que descargar todo desde cero cada vez que levanto el docker file
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile



# Build the app with cache dependencies
# Una vez que se determinan las dependencias necesarias en el punto anterior, esta nueva imagen toma esas dependencias
# que quedan en el node_modules y las pega en el node_modules del workdir de esta imagen y ejecuta el build
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build



# Production image, copy all the files and run next
#esta es una nueva imagen en la cual copia el archivo de configuracion del paso anterior BUILDER
# instala solo las dependencias de produccion y copia el dist de la imagen anterior al dist de esta imagen
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]