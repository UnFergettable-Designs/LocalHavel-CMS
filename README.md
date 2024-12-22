**LocalHaven CMS** is a local-first content management system that enables seamless content creation, asset management, and collaboration across devices—even offline. Built with Go and Astro/Svelte, it provides robust handling of digital assets while maintaining data consistency across all devices.

[![License](https://img.shields.io/badge/license-BSD--3-blue.svg)](LICENSE)
[![Go Version](https://img.shields.io/badge/go-1.21%2B-blue.svg)](https://golang.org/doc/devel/release.html)
[![Node Version](https://img.shields.io/badge/node-22.0.0%2B-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.15.0%2B-orange.svg)](https://pnpm.io/)

## Why LocalHaven CMS?

### Key Benefits
- **Work Anywhere:** True offline-first architecture ensures work continues without interruption
- **Real-Time Collaboration:** Simultaneous editing with instant updates when connected
- **Asset-Focused:** Built for teams working with diverse digital content
- **Stakeholder-Friendly:** Easy-to-use review and approval systems
- **Performance-First:** Lightning-fast local operations with efficient syncing

### Perfect For
- **Creative Teams**
  - Manage digital assets efficiently
  - Organize projects and timelines
  - Streamline review workflows
  
- **Content Teams**
  - Coordinate multi-channel content
  - Manage assets across platforms
  - Collaborate on content calendars
  
- **Distributed Teams**
  - Work effectively across time zones
  - Handle large media files
  - Maintain version control
  
- **Client Services**
  - Streamlined review processes
  - Clear approval workflows
  - Secure asset sharing

## Features

### Core Capabilities
- **Local-First Architecture**
  - Offline work capabilities
  - Automatic synchronization
  - Conflict-free data management
  
- **Real-Time Collaboration**
  - Simultaneous editing
  - Presence awareness
  - Change tracking
  
- **Asset Management**
  - Multi-format support
  - Version control
  - Smart categorization
  - Quick-access libraries

### Team-Focused Features
- **Workspace Management**
  - Team workspaces
  - Resource libraries
  - Asset organization
  - Template management

- **Project Tools**
  - Resource grouping
  - Timeline management
  - Status tracking
  - Task assignment

- **Collaboration Tools**
  - Stakeholder review portals
  - Approval workflows
  - Comment threading
  - Version comparison

## Technical Architecture

### CRDT Implementation
```go
type NodeID string

type VersionVector map[NodeID]uint64

type Operation struct {
    ID        uuid.UUID
    NodeID    NodeID
    Timestamp hlc.Timestamp
    Vector    VersionVector
    Type      OperationType
    Payload   []byte
}

type State struct {
    Vector    VersionVector
    Data      map[string]interface{}
    Tombstone map[string]hlc.Timestamp
}
```

Key CRDT Features:
- Hybrid logical clocks for causality tracking
- Per-node version vectors for conflict resolution
- Operation-based CRDT for efficient network usage
- Tombstone management for deletions
- Automatic conflict resolution

### Storage Management
```go
type Chunk struct {
    Hash     []byte
    Size     int64
    Encoding ChunkEncoding
    Data     []byte
}

type Asset struct {
    ID          uuid.UUID
    ChunkHashes [][]byte
    Metadata    AssetMetadata
    Version     uint64
    Priority    SyncPriority
}
```

Storage Features:
- Content-addressed storage for deduplication
- Variable-sized chunking for efficient updates
- Progressive loading support
- Prioritized sync queue
- Local caching with LRU eviction
- Bandwidth-aware synchronization

### Security Architecture
```go
type EncryptionKey struct {
    ID        uuid.UUID
    Algorithm string
    Key       []byte
    Version   uint64
}

type Permission struct {
    ResourceID uuid.UUID
    RoleID     uuid.UUID
    Actions    []Action
    Conditions []Condition
}
```

Security Features:
- End-to-end encryption for sensitive data
- Role-based access control (RBAC)
- Granular permission system
- Comprehensive audit logging
- Secure key management
- Zero-knowledge proof capabilities

## Project Structure
```
.
├── api/                    # Backend API handlers
│   ├── assets/            # Asset management endpoints
│   ├── collaboration/     # Real-time collaboration
│   ├── workflows/         # Workflow management
│   └── security/          # Authentication & authorization
├── internal/              # Core backend logic
│   ├── crdt/             # CRDT implementation
│   │   ├── clock/        # Hybrid logical clock
│   │   ├── operation/    # CRDT operations
│   │   └── store/        # State management
│   ├── storage/          # Storage handlers
│   │   ├── chunk/        # Chunk management
│   │   ├── sync/         # Sync coordination
│   │   └── cache/        # Caching system
│   └── security/         # Security implementation
├── content/              # Content management
│   ├── projects/         # Project management
│   ├── workspaces/       # Workspace management
│   └── workflows/        # Workflow definitions
└── web/                  # Frontend application
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── stores/       # State management
    │   └── utils/        # Utility functions
    └── public/           # Static assets
```

## Prerequisites

- Go 1.21+
- Node.js 22.0.0+ (LTS)
- pnpm 8.15.0+
- SQLite 3.39+ (for development)

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/localhaven-cms.git
cd localhaven-cms
```

2. Install backend dependencies:
```bash
go mod download
```

3. Install frontend dependencies:
```bash
cd web
pnpm install
```

4. Configure development environment:
```bash
cp .env.example .env
# Edit .env with your settings:
# - NODE_ENV=development
# - STORAGE_PATH=./data
# - ENCRYPTION_KEY=your-dev-key
# - JWT_SECRET=your-jwt-secret
```

5. Initialize the development database:
```bash
go run cmd/migrate/main.go up
```

6. Start development servers:
```bash
# Terminal 1 - Backend
go run main.go

# Terminal 2 - Frontend
cd web
pnpm dev
```

## Implementation Roadmap

### Phase 1: Core Infrastructure (Weeks 1-6)
- [ ] CRDT Implementation
  - [ ] Hybrid logical clock
  - [ ] Operation-based CRDT
  - [ ] Version vectors
- [ ] Storage System
  - [ ] Content-addressed store
  - [ ] Chunking system
  - [ ] Basic sync

### Phase 2: Basic Features (Weeks 7-12)
- [ ] Asset Management
  - [ ] Upload/download
  - [ ] Basic versioning
  - [ ] Simple search
- [ ] Collaboration
  - [ ] Real-time editing
  - [ ] Presence awareness

### Phase 3: Advanced Features (Weeks 13-18)
- [ ] Enhanced Sync
  - [ ] Priority queues
  - [ ] Bandwidth awareness
- [ ] Advanced Security
:wq  - [ ] E2E encryption
  - [ ] Key management

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a pull request

### Code Style
- Go: Follow the official Go style guide
- TypeScript/JavaScript: ESLint + Prettier
- Commit messages: Conventional Commits

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024, LocalHaven CMS Contributors
All rights reserved.

## Support

- Documentation: [docs.localhavencms.com](https://docs.localhavencms.com)
- Issues: GitHub Issues
- Community: [Discord](https://discord.gg/localhavencms)
- Email: support@localhavencms.com

---

Built with ❤️ for teams who value efficiency and collaboration.

