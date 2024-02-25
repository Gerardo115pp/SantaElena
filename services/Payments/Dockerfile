FROM golang:1.20.0-alpine3.16 AS builder
RUN apk add --no-cache git gcc musl-dev
WORKDIR /go/src/payments_service
COPY . .
RUN go mod download
RUN go build -o /go/bin/payments_service

FROM alpine:3.16.0
RUN apk add --no-cache ca-certificates
COPY --from=builder /go/bin/payments_service /payments_service
RUN mkdir /operation_data
ENTRYPOINT /payments_service
LABEL Name=payments_service Version=1.0
EXPOSE 6970
CMD ["payments_service"]