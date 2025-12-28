# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (type-checks first, then builds)
npm run build

# Lint all files
npm run lint

# Preview production build locally
npm run preview
```

## Architecture Overview

### Module-Based Structure

This is an airport management dashboard application built with React, TypeScript, and Vite. The codebase follows a **module-based architecture** where features are organized under `src/modules/`:

- **`src/modules/pm/daily-smlt/`**: Primary module containing the daily simulation dashboard
  - `daily-smlt-page.tsx`: Main page component with tab-based navigation
  - `smlt-smry-rslt.tsx`: Simulation summary results view
  - Routes to `/` and `/pm` via [App.tsx](src/App.tsx)

### API Layer Architecture

The API layer uses a **centralized Axios instance with interceptors**:

1. **Client** ([src/api/client.ts](src/api/client.ts)):
   - Configured Axios instance with `/api` base URL
   - Proxied to `http://localhost:8080` in dev mode (see [vite.config.ts](vite.config.ts))
   - Request/response interceptors for logging and error handling
   - Automatic error normalization with Korean messages

2. **Services** ([src/api/services/](src/api/services/)):
   - Type-safe service layer (e.g., `counterService.getAll()`)
   - Returns unwrapped data from `ApiResponse<T>` wrapper

3. **Hooks** ([src/hooks/](src/hooks/)):
   - React Query-style hooks with loading/error states
   - **Automatic fallback to mock data** when API fails
   - Mock data enabled via `VITE_ENABLE_MOCK` env var
   - Example: `useCounterStatus()` provides counter data with graceful degradation

### Data Flow Pattern

```
Component → Custom Hook → Service → API Client → Backend
                ↓ (on error)
            Mock Data (from lib/mock-data.ts)
```

All custom data hooks follow this pattern:
- Initialize with mock data for immediate UI rendering
- Attempt API call (unless `VITE_ENABLE_MOCK=true`)
- Silently fall back to mock data on API errors
- Provide `{ data, loading, error, refetch }` interface

### Component Organization

- **`src/components/`**: Shared business components
  - Dashboard components: `dashboard-header.tsx`, `map-view.tsx`, `chart-view.tsx`, etc.
  - These are domain-specific, not generic UI components

- **`src/components/ui/`**: Radix UI + shadcn/ui components
  - Pre-built accessible components (accordion, alert, button, card, etc.)
  - Styled with Tailwind CSS using `class-variance-authority`

### Key Technical Patterns

1. **Path Aliases**: `@/*` maps to `src/*` (configured in [tsconfig.app.json](tsconfig.app.json) and [vite.config.ts](vite.config.ts))

2. **Styling**:
   - Tailwind CSS v4 with PostCSS
   - `cn()` utility from [src/lib/utils.ts](src/lib/utils.ts) for conditional classes

3. **Type Safety**:
   - All API types defined in [src/types/api.types.ts](src/types/api.types.ts)
   - Strict TypeScript configuration with `noUnusedLocals` and `noUnusedParameters`

4. **Environment Variables**:
   - `VITE_API_BASE_URL`: Backend URL (default: `http://localhost:8080`)
   - `VITE_API_TIMEOUT`: Request timeout in ms (default: `10000`)
   - `VITE_ENABLE_MOCK`: Use mock data instead of API calls (default: `false`)

## Development Notes

- **No test framework configured**: No test files exist in the codebase
- **Backend dependency**: The app expects a backend at `localhost:8080` (configurable via proxy)
- **Mock data**: Extensive mock data in [src/lib/mock-data.ts](src/lib/mock-data.ts) allows frontend development without backend
- **SWC for Fast Refresh**: Uses `@vitejs/plugin-react-swc` for faster builds
- **Korean UI messages**: Error messages and UI text are in Korean
