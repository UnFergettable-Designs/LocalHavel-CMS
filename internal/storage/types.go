package storage

import (
	"context"
	"io"
	"time"
)

// Asset represents a stored file or content
type Asset struct {
	ID        string
	Name      string
	Type      string
	Size      int64
	Chunks    []string
	CreatedAt time.Time
	UpdatedAt time.Time
	Metadata  map[string]interface{}
}

// Chunk represents a piece of content data
type Chunk struct {
	ID       string
	Data     []byte
	Size     int
	Hash     string
	Position int
}

// Store defines the interface for content storage
type Store interface {
	// Asset operations
	CreateAsset(ctx context.Context, asset *Asset, reader io.Reader) error
	GetAsset(ctx context.Context, id string) (*Asset, error)
	UpdateAsset(ctx context.Context, asset *Asset) error
	DeleteAsset(ctx context.Context, id string) error

	// Chunk operations
	WriteChunk(ctx context.Context, chunk *Chunk) error
	ReadChunk(ctx context.Context, id string) (*Chunk, error)

	// Query operations
	ListAssets(ctx context.Context, filter map[string]interface{}) ([]*Asset, error)
}
