# Turborepo Backend Monorepo

A Turborepo monorepo with Bun, featuring two backend servers and a shared database.

## Structure

- `apps/api-server` - REST API server using Express
- `apps/socket-server` - WebSocket server using Socket.IO
- `packages/database` - Shared database layer using Drizzle ORM
- `packages/eslint-config` - Shared ESLint configuration
- `packages/typescript-config` - Shared TypeScript configuration

## Setup

1. Install dependencies:
```bash
bun install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string.

## Development

Run all servers in development mode:
```bash
bun run dev
```

Run specific server:
```bash
bun run dev --filter=api-server
bun run dev --filter=socket-server
```

## Database

Generate migrations:
```bash
cd packages/database
bun run db:generate
```

Push schema to database:
```bash
cd packages/database
bun run db:push
```

Open Drizzle Studio:
```bash
cd packages/database
bun run db:studio
```

## Build

Build all apps:
```bash
bun run build
```

## Servers

- **API Server**: `http://localhost:3001`
- **Socket Server**: `ws://localhost:3002`

## API Usage

### REST API (Express)

Example routes:
- `GET /` - Health check
- `GET /health` - Status check
- `GET /example` - Example database query

### WebSocket (Socket.IO)

Connect to the Socket server:
```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3002");

// Listen for messages
socket.on("message", (data) => {
  console.log("Received:", data);
});

// Send a message
socket.emit("message", { text: "Hello" });

// Broadcast to all clients
socket.emit("broadcast", { text: "Hello everyone" });
```
