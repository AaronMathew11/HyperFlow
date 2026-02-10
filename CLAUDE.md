# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hypervision is a full-stack professional flowchart tool designed for Solutions Architects to create client communication flows using predefined verification and validation modules. The application consists of a React frontend with TypeScript and a Go backend API.

## Development Commands

### Frontend (React/TypeScript)
Navigate to `/frontend` directory:
- `npm run dev` - Start development server (localhost:5173)
- `npm run dev:localhost` - Development with explicit localhost mode  
- `npm run dev:domain` - Development with staging environment
- `npm run build` - Type check and build for production
- `npm run build:prod` - Build with production mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with TypeScript support

### Backend (Go)
Navigate to `/hyperverge_backend` directory:
- `go run cmd/server/main.go` - Start Go server
- `go build cmd/server/main.go` - Build server binary
- `go mod tidy` - Clean up module dependencies
- `go test ./...` - Run tests

## Architecture Overview

### Full-Stack Structure
```
Hypervision/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── store/              # Zustand state management
│   │   ├── types/              # TypeScript definitions
│   │   └── lib/                # Utilities (Supabase, API)
│   └── package.json
└── hyperverge_backend/         # Go backend API
    ├── cmd/server/             # Main server entry
    ├── internal/               # Internal packages
    │   ├── auth/              # Auth middleware
    │   ├── boards/            # Board management
    │   ├── collaborators/     # Collaboration features
    │   ├── snapshot/          # Flow snapshots
    │   └── db/                # Database connection
    ├── routes/                 # API routes
    └── go.mod
```

### Technology Stack

#### Frontend
- **React 18** with TypeScript for type-safe UI development
- **React Flow** for the flowchart canvas and node management
- **Zustand** for centralized state management
- **Tailwind CSS** for utility-first styling
- **Vite** as the build tool and dev server
- **Supabase** for authentication and data persistence

#### Backend
- **Go 1.23** with Gin web framework
- **Supabase Go client** for database operations
- **CORS middleware** for cross-origin requests
- **JWT authentication** via Supabase Auth

### State Management Architecture

The frontend uses Zustand stores for state management:
- **Flow Store** (`store/flowStore.ts`) - Manages nodes, edges, canvas operations
- **Board Store** (`store/boardStore.ts`) - Handles board management and persistence
- **Auth Context** (`contexts/AuthContext.tsx`) - Supabase authentication state

### API Architecture

#### Backend Routes (`hyperverge_backend/routes/routes.go`)
All routes require authentication:
- `POST /api/boards` - Create new board
- `GET /api/boards` - List user's boards
- `GET /api/boards/:id` - Get specific board
- `DELETE /api/boards/:id` - Delete board
- `POST /api/boards/:id/share` - Share board with collaborators
- `GET /api/boards/:id/collaborators` - List board collaborators  
- `GET /api/boards/:id/snapshot` - Get board snapshot

#### Frontend API Integration (`lib/api.ts`)
Uses Supabase client for:
- User authentication and session management
- Board CRUD operations
- Real-time collaboration features

### Component Architecture

#### Core Layout Components
- `App.tsx` - Root component with auth provider and routing
- `HomePage.tsx` - Landing page with board management
- `Canvas.tsx` - Main React Flow canvas with toolbar integration
- `Sidebar.tsx` - Module selection and flow configuration
- `Toolbar.tsx` - Canvas controls (zoom, export, view modes)

#### Node Types (React Flow)
- `ModuleNode.tsx` - Standard verification/validation modules
- `ApiModuleNode.tsx` - API-specific nodes with endpoint details
- `ConditionNode.tsx` - Conditional flow logic
- `EndStatusNode.tsx` - Flow termination with status
- `SdkInputsNode.tsx` - SDK configuration inputs
- `StartNode.tsx` - Flow initiation points

#### Feature Components
- `CreateBoardModal.tsx` - Board creation interface
- `BoardCard.tsx` - Board display and management
- `ApiModal.tsx` - API documentation viewer
- `InteractiveExporter.tsx` - Export functionality

### Data Structure

#### Module Definitions (`frontend/src/data/apiData.json`)
Each module contains:
- **Basic Info**: id, label, description, color, icon
- **Security**: CSP URLs, IP addresses for whitelisting
- **API Details**: endpoint, method, input/output variables, cURL examples
- **Integration**: success criteria, next step recommendations

#### Flow Persistence
Boards are stored in Supabase with:
- **Metadata**: title, description, created/updated timestamps
- **Flow Data**: serialized nodes and edges from React Flow
- **Permissions**: owner and collaborator access control

### Environment Configuration

#### Frontend (`.env` in `/frontend`)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_AUTH_REDIRECT_URL` - Authentication redirect URL

#### Backend (`.env` in `/hyperverge_backend`)  
- `PORT` - Server port (defaults to 8080)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase service role key

### Authentication Flow

1. **Frontend**: Supabase Auth with email/password
2. **Backend**: JWT validation via Supabase Auth middleware
3. **Protected Routes**: Both frontend and backend enforce authentication
4. **Session Management**: Persistent sessions with automatic token refresh

### Development Workflow

#### Starting the Application
1. Start backend: `cd hyperverge_backend && go run cmd/server/main.go`
2. Start frontend: `cd frontend && npm run dev`
3. Access at `http://localhost:5173`

#### Code Quality Checks
```bash
# Frontend
cd frontend
npm run lint
npm run build  # Includes TypeScript compilation

# Backend  
cd hyperverge_backend
go vet ./...
go fmt ./...
```

### Important Implementation Notes

#### CORS Configuration
Backend allows origins: `localhost:3000`, `localhost:5173`, `localhost:5174`

#### Module System
- All modules loaded from `frontend/src/data/apiData.json`
- Icon system with color-coded categories
- Strict TypeScript typing via `types/index.ts`

#### Export Features
- JSON export with base64 encoding
- URL-based flowchart sharing
- PDF generation via html2canvas and jsPDF

#### State Synchronization
- React Flow nodes/edges synchronized with Zustand
- Real-time collaboration via Supabase subscriptions
- Optimistic UI updates with conflict resolution

### Testing and Quality

Run comprehensive checks before commits:
```bash
# Frontend
cd frontend && npm run build && npm run lint

# Backend
cd hyperverge_backend && go vet ./... && go fmt ./...
```

The project uses:
- **TypeScript strict mode** with comprehensive linting
- **Go standard formatting** and vet checks  
- **ESLint rules** for React Hooks and React Refresh
- **CORS security** for cross-origin protection