# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hypervision is a professional flowchart tool designed for Solutions Architects to create client communication flows using predefined verification and validation modules. The application provides a Lucidchart-style interface with 11 pre-built modules for creating both SDK integration and API documentation flowcharts.

## Development Commands

- `npm run dev` - Start development server (localhost:5173)
- `npm run dev:localhost` - Development with explicit localhost mode
- `npm run dev:domain` - Development with staging environment
- `npm run build` - Type check and build for production
- `npm run build:prod` - Build with production mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with TypeScript support

## Architecture Overview

### Core Technology Stack
- **React 18** with TypeScript for type-safe UI development
- **React Flow** for the flowchart canvas and node management
- **Zustand** for centralized state management
- **Tailwind CSS** for utility-first styling
- **Vite** as the build tool and dev server
- **Supabase** for authentication and data persistence

### State Management (Zustand)
The application uses a single Zustand store (`src/store/flowStore.ts`) that manages:
- **Flow State**: nodes, edges, and canvas operations
- **View Modes**: 'business' vs 'tech' perspectives
- **Flow Types**: 'sdk' vs 'api' flowchart modes
- **SDK Modes**: 'general' vs 'advanced' complexity levels
- **Selection State**: currently selected modules and nodes
- **Flow Metadata**: inputs, outputs, and configuration

### Component Architecture

#### Core Layout Components
- `App.tsx` - Root component with auth provider and route protection
- `Canvas.tsx` - Main React Flow canvas with toolbar integration
- `Sidebar.tsx` - Module selection and flow configuration panel
- `Toolbar.tsx` - Canvas controls (zoom, export, view modes)

#### Node Types
- `ModuleNode.tsx` - Standard verification/validation module nodes
- `ApiModuleNode.tsx` - API-specific nodes with endpoint details
- `ConditionNode.tsx` - Conditional flow logic nodes
- `EndStatusNode.tsx` - Flow termination nodes with status
- `SdkInputsNode.tsx` - SDK configuration input nodes
- `StartNode.tsx` - Flow initiation nodes

#### Modal Components
- `ApiModal.tsx` - API documentation and details viewer
- `InteractiveExporter.tsx` - Export functionality with format options

#### Authentication
- `AuthContext.tsx` - Supabase authentication context
- `ProtectedRoute.tsx` - Route protection wrapper
- `Login.tsx` - Authentication interface

### Data Structure

#### Module Definition (`src/data/apiData.json`)
Modules are defined with:
- **Basic Info**: id, label, description, color, icon
- **Technical Details**: CSP URLs, IP addresses for whitelisting
- **API Information**: endpoint, method, input/output variables, documentation

#### Flow Node Structure
Nodes contain:
- **Position**: x, y coordinates on canvas
- **Type**: module type identifier
- **Data**: module-specific configuration and display information
- **Connections**: edge relationships between nodes

### Key Features

#### Dual View Modes
- **Business View**: Client-facing flowchart presentation
- **Technical View**: Implementation details and API specifications

#### Flow Types
- **SDK Mode**: Integration flowcharts with code examples
- **API Mode**: Documentation-focused with endpoint details

#### Export Functionality
- JSON export with base64 encoding for sharing
- URL-based flowchart sharing with automatic loading
- PDF export capabilities via html2canvas and jsPDF

## Environment Configuration

Required environment variables:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key  
- `VITE_AUTH_REDIRECT_URL` - Authentication redirect URL

## Important Implementation Notes

### Module Integration
- All modules are loaded from `src/data/apiData.json`
- Module types are strictly typed via `src/types/index.ts`
- Icons use a custom icon system with color-coded categories

### State Synchronization
- React Flow nodes and edges are synchronized with Zustand store
- Canvas operations (zoom, pan, fit view) are handled through React Flow
- Node selection triggers sidebar panel updates

### Authentication Flow
- Uses Supabase Auth with email/password
- Protected routes redirect to login when unauthenticated
- Auth state is managed via React Context

### TypeScript Configuration
- Strict mode enabled with comprehensive linting rules
- Vite types included for environment variables
- JSON modules enabled for data imports

## Testing and Quality

Run type checking before commits:
```bash
npm run build  # Includes TypeScript compilation
npm run lint   # ESLint with TypeScript rules
```

The project uses strict TypeScript configuration with:
- `noUnusedLocals` and `noUnusedParameters` for clean code
- `noFallthroughCasesInSwitch` for switch statement safety
- ESLint rules for React Hooks and React Refresh