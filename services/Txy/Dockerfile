FROM golang:1.20.0-alpine3.16 AS builder
RUN apk add --no-cache git gcc musl-dev
WORKDIR /go/src/txy_content_service
COPY . .
RUN go mod download
RUN go build -o /go/bin/txy_content_service

FROM alpine:3.16.0
RUN apk add --no-cache ca-certificates
COPY --from=builder /go/bin/txy_content_service /txy_content_service
RUN mkdir /operation_data
ENTRYPOINT /txy_content_service
LABEL Name=txy_content_service Version=1.0
EXPOSE 6970
CMD ["txy_content_service"]