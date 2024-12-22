package store

import (
	"sync"
	"time"

	"github.com/yourusername/localhaven-cms/internal/crdt"
)

type Store struct {
	mu     sync.RWMutex
	nodeID crdt.NodeID
	state  crdt.State
	ops    []crdt.Operation
}

func NewStore(nodeID crdt.NodeID) *Store {
	return &Store{
		nodeID: nodeID,
		state: crdt.State{
			Vector:    make(crdt.VersionVector),
			Data:      make(map[string]interface{}),
			Tombstone: make(map[string]time.Time),
		},
	}
}

func (s *Store) Apply(op crdt.Operation) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Verify operation hasn't been applied
	if !s.shouldApply(op) {
		return nil
	}

	// Apply operation
	switch op.Type {
	case crdt.OpInsert:
		return s.applyInsert(op)
	case crdt.OpUpdate:
		return s.applyUpdate(op)
	case crdt.OpDelete:
		return s.applyDelete(op)
	}

	return nil
}
