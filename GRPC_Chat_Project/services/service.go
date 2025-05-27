package main

import (
	"context"
	"encoding/json"
	"grpc-chat/internal/proxyproto"
)

// Service ...
type Service struct {
	proxyproto.UnimplementedCentrifugoProxyServer
}

// NewService ...
func NewService() *Service {
	return &Service{}
}

// Connect ...
func (s *Service) Connect(ctx context.Context, req *proxyproto.ConnectRequest) (*proxyproto.ConnectResponse, error) {
	type AuthRequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	authRequest := &AuthRequest{}

	if err := json.Unmarshal(req.Data, authRequest); err != nil {
		return respondError(107, "bad request"), nil
	}

	if authRequest.Username == "alex" && authRequest.Password == "qwerty" {
		return respondResult(authRequest.Username), nil
	}

	return respondError(101, "unauthorized"), nil
}
