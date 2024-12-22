package crdt

import (
	"time"

	"github.com/google/uuid"
)

type NodeID string

type VersionVector map[NodeID]uint64

type Operation struct {
	ID        uuid.UUID
	NodeID    NodeID
	Timestamp time.Time
	Vector    VersionVector
	Type      OperationType
	Payload   []byte
}

type State struct {
	Vector    VersionVector
	Data      map[string]interface{}
	Tombstone map[string]time.Time
}

type OperationType string

const (
	OpInsert OperationType = "insert"
	OpUpdate OperationType = "update"
	OpDelete OperationType = "delete"
)
