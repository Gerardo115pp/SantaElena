FROM golang:1.20.0-alpine3.16 AS builder
RUN apk add --no-cache git gcc musl-dev
WORKDIR /go/src/payments_service
COPY . .
RUN go mod download
RUN go build -o /go/bin/payments_service

FROM alpine:3.16.0

WORKDIR /app

# Alpine:3.16.0 is not POSIX compliant, so we need to install bash.
RUN set -eux ; \ 
    apk add --no-cache \
        bash \
        ca-certificates \
        tzdata \
        ;
COPY --from=builder /go/bin/payments_service /app/payments_service

RUN mkdir /app/operation_data

COPY --from=ssl ./rootCA.pem /app/ssl/rootCA.pem

COPY --from=operation_data ./email/* /tmp/email/
COPY --from=operation_data ./schemas/* /tmp/schemas/

ENV SSL_CA_PATH=/app/ssl/rootCA.pem

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

LABEL Name=LiberyPaymentsService Version=1.0

EXPOSE 6002

CMD ["/app/payments_service"]