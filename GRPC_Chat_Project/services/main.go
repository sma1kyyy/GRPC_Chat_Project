package main

import (
	"grpc-chat/internal/proxyproto"
	"log"
	"net"

	"google.golang.org/grpc"
)

func main() {
	listener, err := net.Listen("tcp4", "127.0.0.1:10000")
	if err != nil {
		log.Fatalln(err)
	}
	defer listener.Close()

	srv := grpc.NewServer()

	svc := NewService()

	proxyproto.RegisterCentrifugoProxyServer(srv, svc)

	if err := srv.Serve(listener); err != nil {
		log.Fatalln(err)
	}
}
