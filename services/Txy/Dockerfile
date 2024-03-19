FROM golang:1.20.0-alpine3.16 AS builder
RUN apk add --no-cache git gcc musl-dev
WORKDIR /go/src/txy_content_service
COPY . .
RUN go mod download
RUN go build -o /go/bin/txy_content_service

FROM alpine:3.16.0

WORKDIR /app

# Alpine:3.16.0 is not POSIX compliant, so we need to install bash.
RUN set -eux ; \ 
    apk add --no-cache \
    bash \
    ca-certificates \
    tzdata \
    ;

COPY --from=builder /go/bin/txy_content_service /app/txy_content_service
COPY --from=schemas ./sqlite_schema.sql /tmp/sqlite_schema.sql
COPY --from=content ./* /tmp/content/
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN mkdir /app/operation_data
ENTRYPOINT ["docker-entrypoint.sh"]
LABEL Name=txy_content_service Version=1.0
EXPOSE 6001
CMD ["/app/txy_content_service"]