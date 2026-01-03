# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**React-PM** is a comprehensive airport passenger management simulation dashboard built with React, TypeScript, and Vite. It provides tools for analyzing and optimizing passenger flow through airport facilities including check-in counters, self-check-in kiosks, departure gates, and security checkpoints.

## Development Commands

```bash
# Start development server with HMR (port 5173)
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

The codebase follows a **feature-based module architecture** where all features are organized under `src/modules/pm/` (PM = Passenger Management):

```
src/modules/pm/
├── pages/                    # Page components
│   ├── daily-smlt/          # 기준시뮬레이션 (baseline simulation)
│   ├── user-smlt/           # 사용자시뮬레이션 (user-configured simulation)
│   └── monitoring/          # 시뮬레이션 모니터링
└── shared/components/       # Shared module components
```

### Core Features

#### 1. Daily Simulation (기준시뮬레이션)
**Route:** `/pm/daily-smlt/result`

Pre-configured baseline simulation with 5 facility view tabs:
- **Summary (요약)**: Overall metrics and KPIs
- **Map (지도)**: Visual layout of airport facilities
- **Check-in Counter (체크인카운터)**: Counter-specific analysis
- **Self Check-in (셀프체크인)**: Self-service kiosk analysis
- **Departure Gate (탑승구)**: Gate operations analysis

Each facility type provides 3 visualization modes:
- Map view with facility locations
- Table/Grid view with detailed metrics
- Chart view with time-series analysis

**Key Files:**
- [src/modules/pm/pages/daily-smlt/daily-smlt-result-page.tsx](src/modules/pm/pages/daily-smlt/daily-smlt-result-page.tsx): Main results page
- [src/modules/pm/shared/components/smlt-smry-rslt.tsx](src/modules/pm/shared/components/smlt-smry-rslt.tsx): Simulation summary (116KB - largest component)
- Facility views under [src/modules/pm/pages/daily-smlt/](src/modules/pm/pages/daily-smlt/):
  - `chkn/`: Check-in counter views (3 files)
  - `slfchkn/`: Self check-in views (4 files)
  - `dep/`: Departure gate views (4 files)
  - `map/`: Map visualization (2 files)

#### 2. User Simulation (사용자시뮬레이션)
**Config Routes:**
- `/pm/user-smlt/config` - Create new simulation
- `/pm/user-smlt/config/:key` - View existing simulation (read-only)

**Result Route:**
- `/pm/user-smlt/result/:key` - View simulation results

Allows users to configure custom simulations with 5 sections:
1. **Flight & Passenger Settings**: Arrival times, passenger counts
2. **Check-in Counter**: Counter allocation and processing times
3. **Self Check-in/Bag Drop**: Kiosk and bag drop configuration
4. **Departure Gate**: Gate assignments and boarding times
5. **Security Checkpoint**: Security line configuration

**Key Files:**
- [src/modules/pm/pages/user-smlt/user-smlt-config-page.tsx](src/modules/pm/pages/user-smlt/user-smlt-config-page.tsx): Configuration page
- [src/modules/pm/pages/user-smlt/user-smlt-result-page.tsx](src/modules/pm/pages/user-smlt/user-smlt-result-page.tsx): Results page
- Edit components in [src/modules/pm/pages/user-smlt/edit/](src/modules/pm/pages/user-smlt/edit/) (5 files)

**Author Info Feature:**
- Saved simulations display author name and department via [src/components/author-info.tsx](src/components/author-info.tsx)
- Uses `useUserInfo(key)` hook to fetch user data

#### 3. Monitoring (시뮬레이션 모니터링)
**Route:** `/pm/monitoring`

Real-time simulation monitoring dashboard:
- List of all simulations (baseline and user-configured)
- 7-step progress visualization
- User and department information
- "View Results" buttons for completed simulations
- Links to both config and results pages

**Key Files:**
- [src/modules/pm/pages/monitoring/monitoring-page.tsx](src/modules/pm/pages/monitoring/monitoring-page.tsx)

### Routing Structure

Defined in [src/App.tsx](src/App.tsx):

```typescript
/                           → User Simulation Config (default)
/pm/daily-smlt/result       → Daily Simulation Results
/pm/user-smlt/config        → User Simulation Config (new)
/pm/user-smlt/config/:key   → User Simulation Config (read-only)
/pm/user-smlt/result/:key   → User Simulation Results
/pm/monitoring              → Monitoring Page
```

## API Layer Architecture

### Data Flow Pattern

```
Component → Custom Hook → Service → API Client → Backend
                ↓ (on error or mock mode)
            Mock Data (from lib/mock-data.ts)
```

### API Components

#### 1. API Client ([src/api/client.ts](src/api/client.ts))
Centralized Axios instance with:
- Base URL: `/api` (proxied to `http://localhost:8080` in dev mode)
- 10 second timeout (configurable via `VITE_API_TIMEOUT`)
- Request/response interceptors for logging
- Automatic error normalization with Korean messages
- Comprehensive error handling

#### 2. Services ([src/api/services/](src/api/services/))
Type-safe service layer with 5 services:
- **counterService**: Check-in counter status (`getAll()`, `getById()`)
- **facilityService**: Facility status (`getAll()`, `getByIsland()`)
- **chartService**: Chart data (`getChartData()`)
- **timeslotService**: Time slot data (`getAll()`)
- **userService**: User information (`getByKey()`)

All services unwrap the `ApiResponse<T>` wrapper and return clean data types.

#### 3. API Endpoints ([src/api/endpoints.ts](src/api/endpoints.ts))
Centralized endpoint constants:
```typescript
/api/counters              # Counter status list
/api/counters/:id          # Single counter
/api/facilities            # Facility status
/api/facilities/:island    # By island/zone
/api/charts                # Chart data
/api/timeslots             # Time slot data
/api/users/:key            # User info by key
```

#### 4. Custom Hooks ([src/hooks/](src/hooks/))
7 custom hooks following a consistent pattern:
- `useCounterStatus()`: Counter data with mock fallback
- `useFacilityStatus()`: Facility data with mock fallback
- `useChartData()`: Chart data with mock fallback
- `useTimeSlotData()`: Time slot data with mock fallback
- `useUserInfo(key)`: User info with mock fallback
- `useMobile()`: Responsive breakpoint detection
- `useToast()`: Toast notification management

**Hook Pattern:**
- Initialize with mock data for immediate UI rendering
- Attempt API call (skipped if `VITE_ENABLE_MOCK=true`)
- Silent fallback to mock data on API errors (console warnings only)
- Return `{ data, loading, error, refetch }` interface

#### 5. Mock Data ([src/lib/mock-data.ts](src/lib/mock-data.ts))
**1,658 lines** of comprehensive mock data covering:
- Counter status (busy, available, warning, closed states)
- Facility status with zone/island grouping
- Chart data for all facility types
- Time slot data for timeline controls
- User information for author display

Enables full frontend development without backend dependency.

### Type Definitions

All API types defined in [src/types/api.types.ts](src/types/api.types.ts):
- `ApiResponse<T>`: Generic wrapper for all API responses
- `CounterStatus`: Check-in counter state and metrics
- `FacilityStatus`: Facility state with zone information
- `ChartDataPoint`: Time-series chart data
- `TimeSlot`: Timeline control data
- Status types: `'busy' | 'closed' | 'warning' | 'available'`

## Component Organization

### 1. UI Component Library ([src/components/ui/](src/components/ui/))
**50+ shadcn/ui components** (~5,800 lines) built on Radix UI primitives:

**Layout:**
- Card, Sheet, Dialog, Drawer, Tabs, Accordion, Collapsible

**Forms:**
- Input, Textarea, Select, Checkbox, Radio, Switch
- Calendar, DatePicker, Command, Combobox
- Form (React Hook Form integration)

**Data Display:**
- Table, Chart (Recharts wrapper), Badge, Avatar
- Progress, Skeleton, Carousel (Embla)

**Feedback:**
- Alert, Toast (Sonner), AlertDialog, Tooltip, Popover

**Navigation:**
- Breadcrumb, Menubar, Pagination, Sidebar

**Styling:**
- All components use Tailwind CSS with `class-variance-authority` (CVA)
- Accessible by default (WCAG compliant via Radix UI)

### 2. Layout Components ([src/components/layout/](src/components/layout/))

**LNB (Left Navigation Bar)** - [lnb.tsx](src/components/layout/lnb.tsx):
- Collapsible with smooth animations
- Resizable (64px - 400px width)
- Active route highlighting
- User info footer section
- 3 main menu items:
  - 기준시뮬레이션 (Daily Simulation)
  - 사용자시뮬레이션 (User Simulation)
  - 시뮬레이션 모니터링 (Monitoring)

### 3. Business Components ([src/components/](src/components/))

**AuthorInfo** - [author-info.tsx](src/components/author-info.tsx):
- Displays user name and department for simulations
- Uses `useUserInfo(key)` hook
- Shows loading skeleton during fetch

**Icons** - [icons/index.tsx](src/components/icons/index.tsx):
- SVG components exported via `vite-plugin-svgr`
- 9 SVG icons from [src/assets/svg/](src/assets/svg/)

### 4. Module Shared Components ([src/modules/pm/shared/components/](src/modules/pm/shared/components/))

**AirportDashboard** - [airport-dashboard.tsx](src/modules/pm/shared/components/airport-dashboard.tsx):
- Main container with tab switching logic
- Manages active tab state

**DashboardTabs** - [dashboard-tabs.tsx](src/modules/pm/shared/components/dashboard-tabs.tsx):
- Tab navigation for 5 facility views
- Integrated with routing

**SmltSmryRslt** - [smlt-smry-rslt.tsx](src/modules/pm/shared/components/smlt-smry-rslt.tsx):
- **Largest component (116KB)**
- Comprehensive simulation summary view
- KPI cards, charts, tables

**TimelinePlayer** - [timeline-player.tsx](src/modules/pm/shared/components/timeline-player.tsx):
- Time control UI for simulation playback
- Uses `useTimeSlotData()` hook

### 5. Feature-Specific Components

Each facility type has a consistent set of components:
- **DashboardHeader**: Facility type header
- **MapView**: Visual map with facility locations
- **TableView/GridView**: Detailed metrics in table format
- **ChartView**: Time-series analysis charts

## Build Tools and Configuration

### Vite 7.2.4
**Config:** [vite.config.ts](vite.config.ts)

**Plugins:**
- `@vitejs/plugin-react-swc`: Fast Refresh with SWC compilation
- `@tailwindcss/vite`: Tailwind CSS v4 integration
- `vite-plugin-svgr`: SVG imports as React components

**Path Alias:**
- `@/*` → `src/*`

**Dev Server:**
- Port: 5173
- HMR enabled
- Proxy: `/api` → `http://localhost:8080`

### TypeScript 5.9.3
**Configs:**
- [tsconfig.app.json](tsconfig.app.json): App source configuration
- [tsconfig.node.json](tsconfig.node.json): Build tools configuration

**Features:**
- Strict mode enabled
- `noUnusedLocals`, `noUnusedParameters` enforced
- Path mapping: `@/*` → `./src/*`
- Latest ECMAScript features

### Tailwind CSS 4.1.18
**Config:** [postcss.config.js](postcss.config.js)

**Features:**
- PostCSS plugin architecture
- Custom theme with CSS variables (OKLCH color space)
- Navy blue primary (#2563EB)
- Custom chart colors, radius variables
- Dark mode support (class-based)

**Plugins:**
- `tailwindcss-animate`: Animation utilities
- `tw-animate-css`: Additional animations

**Global Styles:** [src/index.css](src/index.css)
- CSS custom properties for theming
- Pretendard font family for Korean text

### ESLint
**Config:** [eslint.config.js](eslint.config.js)

**Rules:**
- TypeScript ESLint recommended
- React hooks validation
- React Fast Refresh enforcement
- Prettier integration

### Prettier
**Config:** [prettier.config.js](prettier.config.js)

**Settings:**
- 100 character line width
- 4 space indentation
- Single quotes
- Trailing commas

## Key Technical Patterns

### 1. Import Path Aliases
Use `@/` instead of relative paths:
```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

### 2. Styling Utilities
**cn() Function** ([src/lib/utils.ts](src/lib/utils.ts)):
```typescript
import { cn } from '@/lib/utils'

<div className={cn('base-class', condition && 'conditional-class')} />
```

Combines `clsx` and `tailwind-merge` for conditional className merging.

### 3. Form Handling
**React Hook Form + Zod:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
```

Forms use the `Form` component from [src/components/ui/form.tsx](src/components/ui/form.tsx).

### 4. Data Visualization
**Recharts 2.15.4:**
- Custom chart wrapper: [src/components/ui/chart.tsx](src/components/ui/chart.tsx)
- Theming via CSS custom properties
- Responsive charts with tooltips

### 5. Asset Handling
**SVG Imports:**
```typescript
import Logo from '@/assets/svg/logo.svg?react'  // As React component
```

**Static Images:**
- Place in `/public` directory
- Organized by feature (dep/, slfchkn/, user-smlt/)

### 6. Error Handling
**Graceful Degradation:**
- API failures silently fall back to mock data
- Console warnings for debugging
- Korean error messages in UI

### 7. State Management
**No Global State Library:**
- Local state with `useState`, `useEffect`
- Custom hooks for data fetching
- URL state for routing (`useParams`, `useSearchParams`)

### 8. Component Patterns
**Functional Components:**
```typescript
interface Props {
    title: string
    onSubmit: () => void
}

export function MyComponent({ title, onSubmit }: Props) {
    // Component logic
}
```

**Controlled Components:**
- All form inputs are controlled
- State lifted to parent when needed

## Environment Variables

Create a `.env` file in the root directory:

```bash
# Backend API URL
VITE_API_BASE_URL=http://localhost:8080

# Request timeout in milliseconds
VITE_API_TIMEOUT=10000

# Force mock data mode (skip API calls)
VITE_ENABLE_MOCK=false
```

## Development Notes

### Testing
- **No test framework configured**
- No test files exist in the codebase
- Manual testing required

### Backend Dependency
- App expects a backend at `localhost:8080`
- Configurable via `VITE_API_BASE_URL`
- Full functionality available with mock data

### Mock Data Development
- Set `VITE_ENABLE_MOCK=true` to skip all API calls
- Extensive mock data in [src/lib/mock-data.ts](src/lib/mock-data.ts)
- Enables frontend-only development

### Performance
- SWC compilation for fast builds
- Vite HMR for instant updates
- Lazy loading potential (not currently implemented)

### Internationalization
- **UI Language:** Korean only
- Error messages in Korean
- No i18n library configured

### Accessibility
- Built on Radix UI primitives (WCAG compliant)
- Keyboard navigation support
- Screen reader friendly

### Browser Support
- Modern browsers (ES2020+)
- No IE11 support
- Responsive design for mobile/tablet

## Project Statistics

- **Total TypeScript Files:** 106
- **Total Lines of Code:** ~25,000+
- **Largest Component:** [smlt-smry-rslt.tsx](src/modules/pm/shared/components/smlt-smry-rslt.tsx) (116KB)
- **UI Components:** 50+
- **Custom Hooks:** 7
- **API Services:** 5
- **Routes:** 6

## Common Tasks

### Adding a New Feature
1. Create feature directory under `src/modules/pm/pages/`
2. Create page component with routing in [src/App.tsx](src/App.tsx)
3. Add shared components to `src/modules/pm/shared/components/`
4. Create service if API needed in `src/api/services/`
5. Create custom hook in `src/hooks/`
6. Add mock data to [src/lib/mock-data.ts](src/lib/mock-data.ts)

### Adding a UI Component
1. Use shadcn/ui CLI if available
2. Or manually create in `src/components/ui/`
3. Follow Radix UI + CVA pattern
4. Add to [src/components/ui/index.ts](src/components/ui/index.ts) if needed

### Debugging API Issues
1. Check browser DevTools Network tab
2. Check console for API client warnings
3. Verify backend is running on correct port
4. Test with `VITE_ENABLE_MOCK=true` to isolate issue

### Modifying Mock Data
1. Edit [src/lib/mock-data.ts](src/lib/mock-data.ts)
2. Ensure data matches TypeScript types in [src/types/api.types.ts](src/types/api.types.ts)
3. Refresh browser (Vite HMR may not catch mock data changes)

## Additional Resources

- **React Documentation:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Vite:** https://vite.dev
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Recharts:** https://recharts.org
- **React Hook Form:** https://react-hook-form.com
