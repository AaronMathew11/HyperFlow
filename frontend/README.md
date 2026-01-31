# Hypervision - Flowchart Tool

A professional flowchart tool for Solutions Architects to create client communication flows using predefined verification and validation modules.

## Features

- **Drag & Drop Interface**: Intuitive Lucidchart-style interface
- **11 Pre-built Modules**:
  1. ID Card Validation
  2. AML Search
  3. Selfie Liveness
  4. Face Match
  5. Field Match
  6. Bank Account Verification
  7. Nominee Collection
  8. Geo IP
  9. NSDL PAN Verification
  10. Account Aggregator
  11. Email and Mobile Verification

- **Interactive Canvas**: Pan, zoom, and connect modules
- **Export Functionality**: Save flowcharts as JSON
- **Professional Styling**: Clean, modern UI with color-coded modules

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Copy the environment example file and configure your variables:

```bash
cp .env.example .env
```

Key environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_AUTH_REDIRECT_URL`: Authentication redirect URL (defaults to current origin)
  - For local development: `http://localhost:5173`
  - For production: `https://hypervision.in`

### Development

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Select a Module**: Choose from the 11 verification modules in the left sidebar
2. **Drag to Canvas**: Drag the module onto the canvas area
3. **Connect Modules**: Click and drag from the bottom handle of one module to the top handle of another
4. **Organize**: Use toolbar controls to zoom, pan, and fit the view
5. **Export**: Save your flowchart using the Export button

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Flow** - Flowchart library
- **Tailwind CSS** - Styling
- **Zustand** - State management

## Project Structure

```
src/
├── components/
│   ├── Canvas.tsx          # Main flowchart canvas
│   ├── Sidebar.tsx         # Module selection sidebar
│   ├── ModuleNode.tsx      # Custom node component
│   └── Toolbar.tsx         # Control buttons
├── data/
│   └── modules.ts          # Module definitions
├── store/
│   └── flowStore.ts        # State management
├── types/
│   └── index.ts            # TypeScript types
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## License

Proprietary - Hypervision
