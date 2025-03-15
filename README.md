# Rutpoint

A South African platform revolutionizing public transportation through intelligent route optimization, crowd-sourced management, and seamless multimodal integration. Built for South Africa's diverse transport landscape, Rutpoint connects minibus taxis, buses (Rea Vaya, Metrobus), trains (Gautrain, Metrorail), and future transport modes into a unified network—enabling efficient, safe, and user-driven journeys across the country.

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Development](#development)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Timeline](#timeline)

## Overview

### Core Features

#### For Passengers
- Real-time transport hub discovery and occupancy
- Multimodal journey planning and fare calculation
- Interactive route visualization with 500m tracking
- Turn-by-turn navigation to stations and stops
- Community-driven service improvements
- Flexible transfer points between transport modes

#### For Community
- Service improvement proposals with geofencing
- Fare adjustment suggestions based on economic factors
- Schedule optimization for all transport modes
- Facility updates and safety ratings
- Integration with transport authorities
- Accessibility feedback for stations and vehicles

### Project Components

#### 1. Mobile App (Expo)
The passenger-facing mobile application built with Expo SDK 52, featuring:
- Multimodal journey planning
- Real-time service availability
- Interactive route visualization with landmarks
- Navigation in multiple languages
- Universal fare calculation and payments
- Offline station and schedule data
- Real-time service disruption alerts

#### 2. Optimization Engine (Go)
High-performance route calculator featuring:
- Multimodal journey optimization
- Real-time traffic integration
- Geofenced service areas
- Dynamic transfer point calculation
- Universal fare estimation
- Service disruption rerouting
- Historical usage pattern analysis

#### 3. Backend (Node.js/Hono)
- Universal authentication system
- Route and schedule management
- Service status tracking
- Real-time position tracking
- Integration with transport operators
- GTFS and GTFS-RT processing
- Historical data analytics

#### 4. Community Module
- Service improvement proposals
- Fare and schedule adjustments
- Accessibility reporting
- Safety incident tracking
- Integration with authorities
- Public transport advocacy tools

## Getting Started

### Prerequisites
- Node.js v22.14 (LTS)
- PNPM v10.6.3
- Go v1.24.0 or later
- [Expo Go](https://expo.dev) app (compatible with SDK 52)
- Docker Desktop

> Note: We use Expo managed workflow, so no native development tools (Xcode, Android Studio) are required.

### Quick Start

1. **Clone and Install**
   ```bash
   # Clone repository
   git clone https://github.com/rutpoint/rutpoint.git
   cd rutpoint

   # Install package manager and dependencies
   npm install -g pnpm@10.6.3
   pnpm install

   # Install Expo CLI
   pnpm install -g expo@52.0.37
   ```

2. **Set Up Environment**
   ```bash
   # Copy environment files
   cp apps/mobile/.env.example apps/mobile/.env
   cp apps/backend/.env.example apps/backend/.env
   cp apps/engine/.env.example apps/engine/.env
   ```

3. **Configure Environment**

   a. **Mobile App (.env)**
   ```bash
   EXPO_PUBLIC_API_URL=http://192.168.x.x:3000  # Your machine's IP
   ```

   b. **Backend (.env)**
   ```bash
   PORT=3000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/local
   AWS_REGION=af-south-1  # South Africa region
   AWS_ACCESS_KEY_ID=your_key_id
   AWS_SECRET_ACCESS_KEY=your_secret
   ```

   c. **Engine (.env)**
   ```bash
   PORT=8080
   DATABASE_URL=postgresql://postgres:password@localhost:5432/local
   ```

4. **Start PostgreSQL**
   ```bash
   docker run --rm -p 5432:5432 \
     -v $(pwd)/.sst/storage/postgres:/var/lib/postgresql/data \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=local \
     postgres:16.4
   ```
   > For Windows, replace `$(pwd)` with `%cd%`

5. **Start Development**
   ```bash
   pnpm dev  # Starts all services
   ```

## Development

### Project Structure
```
rutpoint/
├── apps/
│   ├── mobile/          # React Native (Expo) app
│   │   ├── app/        # Pages (Expo Router)
│   │   ├── components/ # UI components
│   │   └── utils/      # Helpers
│   ├── backend/        # Node.js API server
│   │   ├── src/       # Source code
│   │   └── tests/     # API tests
│   └── engine/        # Go optimization engine
│       ├── cmd/       # Entry points
│       └── internal/  # Core logic
└── packages/
    └── shared/        # Shared utilities
```

### Common Commands
```bash
# Development
pnpm dev                 # Start all services
pnpm --filter @rutpoint/mobile dev  # Start mobile only
pnpm --filter @rutpoint/backend dev # Start backend only
pnpm --filter @rutpoint/engine dev  # Start engine only

# Testing
pnpm test               # All tests
pnpm lint               # Lint code

# Maintenance
pnpm clean:all          # Clean everything
pnpm clean:cache        # Clean cache
```

### Mobile Development
- Use your device's camera (iOS) or Expo Go (Android) to scan QR code
- Press 'i' for iOS simulator or 'a' for Android emulator
- Maps work out of the box with Expo development keys
- Supports offline mode for areas with poor connectivity
- Multiple language support (English, isiZulu, Sesotho, Afrikaans)

### API Endpoints

#### Taxi Ranks
- `GET /api/v1/taxi-ranks`: List taxi ranks with optional filters
  - Query params:
    - Bounds: `ne_lat`, `ne_lng`, `sw_lat`, `sw_lng` (for map view)
    - Nearby: `lat`, `lng`, `radius` (in meters)
    - Search: `destination` (for destination-based search)
- `GET /api/v1/taxi-ranks/:id`: Get detailed information about a specific taxi rank
- `GET /api/v1/taxi-ranks/:id/connections`: Get connecting ranks and routes

#### Journey Planning (Coming Soon)
- `POST /api/v1/journeys/plan`: Calculate multimodal journey
  - Supports: Taxi, Rea Vaya, Gautrain, Metrorail
  - Returns: Route options, fare estimates, transfer points

#### Service Status (Coming Soon)
- `GET /api/v1/services/status`: Get real-time status of transport services
  - Covers: Service disruptions, delays, temporary changes
  - Supports: Push notifications for subscribed routes

#### Community Features (Coming Soon)
- `POST /api/v1/community/proposals`: Submit service improvement proposals
- `GET /api/v1/community/proposals`: List community proposals
- `POST /api/v1/community/reports`: Submit incident or safety reports
- `GET /api/v1/community/reports`: List verified community reports

#### Infrastructure (Coming Soon)
- `GET /api/v1/facilities/nearby`: Find nearby transport facilities
- `GET /api/v1/facilities/:id/accessibility`: Get facility accessibility information
- `GET /api/v1/facilities/:id/occupancy`: Get real-time facility occupancy

All endpoints return JSON responses with the following structure:
```json
{
  "data": T | T[],           // Success response
  "error": string,           // Error message (if applicable)
  "meta": {                  // Optional metadata
    "total": number,
    "page": number,
    "limit": number
  }
}
```

## Architecture

### System Components
- **Client Layer:** React Native (Expo v52), React Admin Dashboard
- **Backend Layer:** Node.js (Hono), Go Engine, AWS Cognito
- **Data Layer:** PostgreSQL/PostGIS, Redis, TimescaleDB
- **Integration Layer:** 
  - Transport: GTFS, GTFS-RT, SIRI
  - Safety: JMPD API, Railway Police
  - Infrastructure: JITI Systems, Station Management
  - Weather: SA Weather Service
  - Traffic: TomTom, Google Traffic

### Key Integrations
- Maps: Google Maps, Apple Maps (with offline support)
- Authentication: AWS Cognito (with phone verification)
- Payment: Stripe, SnapScan, Cash, Card, Transit Cards
- Monitoring: AWS CloudWatch
- Safety: JMPD, Railway Police, Station Security
- Traffic: TomTom Traffic API, Google Traffic
- Weather: South African Weather Service
- Transport: 
  - Gautrain API
  - Rea Vaya GTFS
  - Metrorail Status
  - Taxi Association Systems
  - Bus Operator APIs

## Contributing

### Code Style
- TypeScript: Use types, no any, functional React components
- Go: Follow official style guide, use gofmt
- Git: Use conventional commits
- Documentation: Include English and local language examples

### Pull Request Process
1. Fork and create feature branch
2. Write tests and documentation
3. Follow PR template
4. Get review and approval

### Testing
```bash
# Run workspace tests
pnpm --filter @rutpoint/mobile test
pnpm --filter @rutpoint/backend test
pnpm --filter @rutpoint/engine test
```

## Timeline

### Phase 1: Pilot
- Taxi ranks listing and details 
- Taxi navigation
- Taxi route navigation
- Route dropoff finder
- Basic community features
- Multimodal journey planning

### Phase 2: Transport Integration
- Integration with JITI systems
- Rea Vaya real-time integration
- Initial Gautrain connection points
- Gautrain live status
- Metrorail basic integration
- Real-time service tracking
- Unified fare calculation
- Service disruption handling

### Phase 3: Advanced Features (8 Weeks)
- Complete multimodal routing
- Real-time transfer optimization
- Cross-service fare integration
- Accessibility mapping
- Advanced analytics
- Predictive demand modeling

---

For detailed documentation, API references, and troubleshooting, visit our [Documentation](https://docs.rutpoint.com).

> This project follows [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/).

> For support in other South African languages or to contribute translations, please see our [Translations Guide](docs/translations.md).