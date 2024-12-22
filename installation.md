# Installation Guide

## Prerequisites

- Go 1.21+
- Node.js 22.0.0+
- pnpm 8.15.0+
- SQLite 3.39+ (for development)

## System Requirements

- OS: Linux, macOS, or Windows
- RAM: 4GB minimum, 8GB recommended
- Storage: 1GB for installation, additional space for assets
- CPU: 2 cores minimum, 4 cores recommended

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/localhaven-cms.git
   cd localhaven-cms
   ```

2. **Install Backend Dependencies**
   ```bash
   go mod download
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd web
   pnpm install
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

   Required settings:
   ```env
   STORAGE_PATH=./data
   MAX_STORAGE_GB=10
   MAX_FILE_SIZE_MB=100
   CHUNK_SIZE_KB=512
   CACHE_TTL_HOURS=24
   ```

5. **Initialize Storage**
   ```bash
   go run cmd/init/main.go
   ```

6. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   go run main.go

   # Terminal 2 - Frontend
   cd web
   pnpm dev
   ```

## Configuration Options

### Storage Configuration
- `STORAGE_PATH`: Base path for asset storage
- `MAX_STORAGE_GB`: Maximum storage quota per installation
- `CHUNK_SIZE_KB`: Size of chunks for large file handling

### Security Configuration
- `JWT_SECRET`: Secret key for JWT token generation
- `TOKEN_EXPIRY`: JWT token expiration time
- `ALLOWED_ORIGINS`: CORS allowed origins

### Performance Configuration
- `CACHE_TTL_HOURS`: Cache retention period
- `MAX_CONCURRENT_UPLOADS`: Maximum simultaneous uploads
- `SYNC_BATCH_SIZE`: Number of items per sync batch

## Troubleshooting

### Common Issues

1. **Permission Errors**
   ```bash
   # Fix storage directory permissions
   chmod 755 data
   ```

2. **Port Conflicts**
   ```bash
   # Check port usage
   lsof -i :3000
   lsof -i :8080
   ```

3. **Memory Issues**
   ```bash
   # Adjust Go garbage collection
   export GOGC=50
   ```

# Development Setup

## Development Environment

1. **IDE Setup**
   - VSCode with recommended extensions:
     - Go
     - Svelte for VS Code
     - ESLint
     - Prettier

2. **Debug Configuration**
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug Backend",
         "type": "go",
         "request": "launch",
         "mode": "auto",
         "program": "${workspaceFolder}/main.go"
       }
     ]
   }
   ```

3. **Environment Configuration**
   ```bash
   # Development specific settings
   cp .env.example .env.development
   ```

## Development Workflow

1. **Branch Management**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   ```

2. **Code Style**
   ```bash
   # Format Go code
   go fmt ./...
   
   # Format frontend code
   pnpm lint
   pnpm format
   ```

3. **Testing**
   ```bash
   # Run backend tests
   go test ./...
   
   # Run frontend tests
   pnpm test
   ```

## Local Development

### Backend Development
```bash
# Run with hot reload
air -c .air.toml
```

### Frontend Development
```bash
# Run with hot reload
pnpm dev
```

### Database
```bash
# Reset development database
go run cmd/db/reset.go
```

## Testing Environment

1. **Unit Tests**
   ```bash
   go test -v ./...
   ```

2. **Integration Tests**
   ```bash
   go test -tags=integration ./...
   ```

3. **E2E Tests**
   ```bash
   pnpm test:e2e
   ```
