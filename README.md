# Restaurant Frontend

React-based frontend application for the restaurant management system. Built with Vite, React 19, Apollo Client, and Tailwind CSS 4.

## Features

- **Modern React 19**: Latest React features and performance improvements
- **Apollo Client**: GraphQL client for seamless API communication
- **React Router**: Client-side routing for single-page application
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript**: Type-safe development experience
- **Vite**: Fast build tool and development server

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend services running:
  - `restaurant-api` on `http://localhost:3000/graphql`

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at: `http://localhost:5173`

## Environment Variables

Create a `.env` file (optional):

```env
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

Default GraphQL endpoint: `http://localhost:3000/graphql`

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── config/          # Configuration files (Apollo Client)
├── graphql/         # GraphQL queries and mutations
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── routes.tsx       # Route configuration
```

## GraphQL Integration

The application uses Apollo Client to communicate with the GraphQL API Gateway:

- **Authentication**: JWT tokens stored in localStorage
- **Authorization**: Automatic token injection in request headers
- **Cache**: In-memory cache with cache-and-network policy

## Development Notes

- The application connects to the API Gateway at port 3000
- Authentication tokens are persisted in localStorage
- All API requests go through the GraphQL API Gateway
- The API Gateway handles communication with backend microservices

## Docker

**Recommendation**: Do NOT dockerize the frontend during development. 

**Reasons**:
1. Development servers (Vite) are optimized for hot-reload on the host
2. File watching and HMR work better without Docker overhead
3. Easier debugging and faster iteration cycles
4. No need for volume mounting or additional complexity

**For Production**: Build static files and serve with nginx or deploy to CDN/hosting service.

```bash
# Production build
npm run build

# Output will be in dist/ directory
```
