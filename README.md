# LocalHaven CMS

**LocalHaven CMS** is a local-first content management system designed for modern marketing teams, enabling seamless content creation, asset management, and client collaboration - whether online or offline. Built with Go and Astro/Svelte, it provides robust handling of various marketing assets while maintaining data consistency across all devices.

## Marketing Agency Use Cases

### Content Creation Teams
**Example: Boutique Digital Marketing Agency**
- Teams creating content for multiple clients simultaneously
- Need to maintain separate brand assets and guidelines
- Requires quick access to approved client assets
- Requirements:
  - Brand asset organization by client
  - Template management
  - Content approval workflows
  - Asset version tracking

### Social Media Management
**Example: Social Media Marketing Team**
- Managing multiple social campaigns
- Need to organize visual assets by platform
- Collaborative content calendar management
- Requirements:
  - Image/video asset management
  - Content scheduling interface
  - Platform-specific asset variants
  - Campaign organization tools

### Client Collaboration
**Example: Full-Service Marketing Agency**
- Client review and approval processes
- Shared access to specific project assets
- Real-time collaboration on campaigns
- Requirements:
  - Client access controls
  - Review/approval workflows
  - Comment and feedback system
  - Asset sharing capabilities

### Remote Creative Teams
**Example: Distributed Marketing Agency**
- Design teams working across locations
- Large file collaboration needs
- Asset version management
- Requirements:
  - Offline design file management
  - Large file synchronization
  - Version control for designs
  - Collaborative feedback tools

## Marketing-Specific Features

### Asset Management
- **Brand Organization:**
  - Separate workspaces per client/brand
  - Brand guideline documentation
  - Asset categorization by campaign
  - Quick-access asset libraries

### Workflow Management
- **Campaign Organization:**
  - Project-based asset grouping
  - Campaign timelines
  - Status tracking
  - Task assignment

### Collaboration Tools
- **Review & Approval:**
  - Client review portals
  - Approval workflows
  - Comment threading
  - Version comparison

### Content Creation
- **Template System:**
  - Reusable content templates
  - Brand-specific templates
  - Asset customization
  - Quick export options

## Features

### Core Functionality
- **Local-First Architecture:** Work offline with automatic synchronization when reconnected
- **Real-Time Collaboration:** Multiple users can edit content simultaneously with instant updates
- **CRDT-Based Synchronization:** Uses Automerge for conflict-free data synchronization
- **WebSocket Integration:** Provides efficient, real-time communication between frontend and backend

### Content Management
- **Multiple Document Types Support:**
  - Text documents with real-time collaborative editing
  - Image files with thumbnail generation
  - PDF documents with preview generation
- **Metadata Management:** CRDT-enabled metadata for all document types
- **Content-Addressed Storage:** Efficient blob storage for binary content
- **Thumbnail Generation:** Automatic thumbnail creation for images and PDFs

### Technical Architecture
- **Backend:** Go with Echo framework
- **Frontend:** Astro with Svelte islands
- **Storage:** 
  - CRDT-based metadata storage using Automerge
  - Local blob storage for binary content
  - Content-addressed storage system

## Installation

1. **Clone the Repository:**
```bash
git clone https://github.com/yourusername/localhaven-cms.git
cd localhaven-cms
```

2. **Install Backend Dependencies:**
```bash
go mod download
```

3. **Install Frontend Dependencies:**
```bash
cd web
npm install
```

## Development Setup

### Backend
1. **Start the Go server:**
```bash
go run main.go
```
The server will start on `localhost:8080`

### Frontend
1. **Start the Astro development server:**
```bash
cd web
npm run dev
```
The development server will start on `localhost:3000`

## Project Structure
```
.
├── api/
│   ├── handlers/      # HTTP and WebSocket handlers
│   ├── middleware/    # Authentication and request middleware
│   └── routes/        # API route definitions
├── internal/
│   ├── crdt/         # CRDT implementation
│   ├── storage/      # Blob storage implementation
│   └── types/        # Core type definitions
├── marketing/         # Marketing-specific features
│   ├── campaigns/    # Campaign management
│   ├── brands/       # Brand asset management
│   └── workflows/    # Approval workflows
├── web/              # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── pages/
│   └── public/
└── main.go           # Application entry point
```

## Project Structure
```
.
├── api/
│   ├── handlers/      # HTTP and WebSocket handlers
│   ├── middleware/    # Authentication and request middleware
│   └── routes/        # API route definitions
├── internal/
│   ├── crdt/         # CRDT implementation
│   ├── storage/      # Blob storage implementation
│   └── types/        # Core type definitions
├── marketing/         # Marketing-specific features
│   ├── campaigns/    # Campaign management
│   ├── brands/       # Brand asset management
│   └── workflows/    # Approval workflows
├── web/              # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── pages/
│   └── public/
└── main.go           # Application entry point
```
## Configuration

The application can be configured through environment variables:

```env
PORT=8080                    # API server port
STORAGE_PATH="./data"        # Path for blob storage
MAX_UPLOAD_SIZE=10000000     # Maximum upload size in bytes
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /ws` - WebSocket connection for real-time updates
- `POST /api/documents` - Create new document
- `GET /api/documents/:id` - Retrieve document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents` - List documents with filtering

## Contributing

We welcome contributions! Please read our Contributing Guidelines (coming soon) for more 
 
## Roadmap

### Phase 1: Core Marketing Features
- [ ] Brand asset management
- [ ] Basic campaign organization
- [ ] Client access controls
- [ ] Template system
- [ ] Basic PDF viewing and organization

### Phase 2: Collaboration & Review
- [ ] Review and approval workflows
- [ ] Client feedback system
- [ ] Team collaboration tools
- [ ] Version control
- [ ] Basic PDF annotation (comments and highlights)

### Phase 3: Advanced PDF Collaboration
- [ ] Real-time multiplayer PDF editing
  - [ ] Simultaneous user editing
  - [ ] Cursor presence and user awareness
  - [ ] Advanced annotation tools (drawings, shapes)
  - [ ] Page synchronization between users
- [ ] PDF Performance Optimization
  - [ ] Smart page caching
  - [ ] Binary diff updates
  - [ ] Bandwidth optimization
  - [ ] Large file handling
- [ ] PDF Workflow Integration
  - [ ] Proof review system
  - [ ] Design approval workflows
  - [ ] Change tracking
  - [ ] Version comparison
- [ ] PDF Asset Management
  - [ ] Template-based generation
  - [ ] Batch processing
  - [ ] Asset organization
  - [ ] Quick proof generation

### Phase 4: Advanced Marketing Features
- [ ] Campaign analytics integration
- [ ] Advanced asset transformations
- [ ] AI-powered asset tagging
- [ ] Automated brand compliance
- [ ] Social media scheduling
- [ ] Performance reporting
- [ ] Advanced PDF Features
  - [ ] Digital signatures
  - [ ] Form field handling
  - [ ] PDF merging and splitting
  - [ ] Automated PDF processing

### Phase 5: Enterprise Marketing
- [ ] Multi-brand management
- [ ] Advanced workflows
- [ ] Asset performance tracking
- [ ] Integration with marketing tools
- [ ] Custom branded portals
- [ ] Enterprise PDF Features
  - [ ] PDF accessibility compliance
  - [ ] Advanced security controls
  - [ ] Audit logging for PDF changes
  - [ ] PDF archiving and retention policies

### Future Considerations
- [ ] Mobile PDF editing
- [ ] Offline PDF processing
- [ ] AI-powered PDF analysis
- [ ] PDF automation APIs
- [ ] Integration with design tools
- [ ] Advanced compression algorithms
- [ ] PDF form workflow automation

## Implementation Priorities

### Near-term PDF Goals
1. **Basic PDF Management**
   - Secure storage and organization
   - Basic viewing capabilities
   - Simple annotation tools
   - Version tracking

2. **Collaboration Foundation**
   - User presence system
   - Real-time sync architecture
   - Basic concurrent editing
   - Comment system

3. **Performance Groundwork**
   - Caching system
   - Page-by-page loading
   - Network optimization
   - Storage efficiency

### Marketing-Driven PDF Features
1. **Review Efficiency**
   - Quick markup tools
   - Approval status tracking
   - Change visualization
   - Client access portal

2. **Asset Management**
   - PDF template system
   - Batch processing
   - Asset categorization
   - Version management

3. **Workflow Integration**
   - Status tracking
   - Task automation
   - Notification system
   - Analytics integration

- [ ] Integration with marketing tools
- [ ] Custom branded portals

## Marketing-Specific Configuration

```env
PORT=8080                    # API server port
STORAGE_PATH="./data"        # Path for blob storage
MAX_UPLOAD_SIZE=10000000     # Maximum upload size in bytes
MAX_CLIENTS=50              # Maximum number of client workspaces
ENABLE_CLIENT_PORTAL=true   # Enable client review portal
```

## Example Marketing Workflows

1. **Content Creation Flow:**
```
Draft → Internal Review → Client Review → Revisions → Approval → Publication
```

2. **Asset Management Flow:**
```
Upload → Auto-tagging → Brand Validation → Distribution → Usage Tracking
```

3. **Campaign Flow:**
```
Planning → Asset Creation → Review → Scheduling → Execution → Analysis
```

## License

This project is licensed under the BSD 3-Clause License. See the LICENSE file for details.

Copyright (c) 2024, LocalHaven CMS Contributors
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
