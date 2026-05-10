FROM golang:1.23 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o bootstrap ./cmd/server/main.go

FROM public.ecr.aws/lambda/provided:al2023
# This line is the magic — injects the web adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 \
     /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder /app/bootstrap ${LAMBDA_TASK_ROOT}/bootstrap
CMD ["bootstrap"]