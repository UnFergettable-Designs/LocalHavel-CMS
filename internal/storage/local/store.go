package local

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sync"

	"github.com/yourusername/localhaven-cms/internal/storage"
)

type LocalStore struct {
	mu          sync.RWMutex
	rootPath    string
	chunkSize   int
	indexPath   string
	assetsIndex map[string]*storage.Asset
}

func NewLocalStore(rootPath string, chunkSize int) (*LocalStore, error) {
	if err := os.MkdirAll(rootPath, 0755); err != nil {
		return nil, fmt.Errorf("creating root directory: %w", err)
	}

	store := &LocalStore{
		rootPath:    rootPath,
		chunkSize:   chunkSize,
		indexPath:   filepath.Join(rootPath, "index.json"),
		assetsIndex: make(map[string]*storage.Asset),
	}

	// Load existing index
	if err := store.loadIndex(); err != nil {
		return nil, err
	}

	return store, nil
}

func (s *LocalStore) CreateAsset(ctx context.Context, asset *storage.Asset, reader io.Reader) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Create chunks directory for asset
	chunksDir := filepath.Join(s.rootPath, "chunks", asset.ID)
	if err := os.MkdirAll(chunksDir, 0755); err != nil {
		return fmt.Errorf("creating chunks directory: %w", err)
	}

	// Split content into chunks
	buffer := make([]byte, s.chunkSize)
	chunkPosition := 0

	for {
		n, err := reader.Read(buffer)
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("reading content: %w", err)
		}

		chunk := &storage.Chunk{
			ID:       fmt.Sprintf("%s-%d", asset.ID, chunkPosition),
			Data:     buffer[:n],
			Size:     n,
			Position: chunkPosition,
		}

		if err := s.WriteChunk(ctx, chunk); err != nil {
			return fmt.Errorf("writing chunk: %w", err)
		}

		asset.Chunks = append(asset.Chunks, chunk.ID)
		chunkPosition++
	}

	// Update index
	s.assetsIndex[asset.ID] = asset
	return s.saveIndex()
}

func (s *LocalStore) loadIndex() error {
	data, err := os.ReadFile(s.indexPath)
	if os.IsNotExist(err) {
		return nil
	}
	if err != nil {
		return fmt.Errorf("reading index: %w", err)
	}

	return json.Unmarshal(data, &s.assetsIndex)
}

func (s *LocalStore) saveIndex() error {
	data, err := json.Marshal(s.assetsIndex)
	if err != nil {
		return fmt.Errorf("marshaling index: %w", err)
	}

	return os.WriteFile(s.indexPath, data, 0644)
}
