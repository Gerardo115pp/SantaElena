FROM node:21-alpine3.18 AS builder
WORKDIR /app_src
COPY . .

ENV WP_API=https://dev-santa-elena.mx/wordpress/wp-json
ENV TXY_API=https://dev-santa-elena.mx/txy-api
ENV BASE_DOMAIN=dev-santa-elena.mx
ENV PAYMENTS_API=/payments-api

# Check if npm is installed and install it if not
RUN which npm ; \
    if [ $? -ne 0 ]; then \
        apk add --no-cache npm; \
    fi

RUN sed -i '/out: /a\    envPrefix: "LIBERY_"' ./svelte.config.js
RUN sed -i '/"@app_modules"/d' ./vite.config.js

RUN npm install . ; \
    npm run build



FROM node:21-alpine3.18 
WORKDIR /app
RUN apk add --no-cache \
    ca-certificates \
    tzdata

COPY --from=builder /app_src/build /app
COPY --from=builder /app_src/package.json /app
COPY --from=builder /app_src/package-lock.json /app

RUN which npm ; \
    if [ $? -ne 0 ]; then \
        apk add --no-cache npm; \
    fi

RUN npm ci --omit dev

ENV LIBERY_PORT=5005
ENV LIBERY_HOST=0.0.0.0

EXPOSE 5005

CMD ["node", "."]