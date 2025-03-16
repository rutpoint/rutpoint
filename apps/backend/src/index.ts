import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import taxiRanksRouter from './routes/taxi-ranks';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// Mount routes
app.route('/api/v1/taxi-ranks', taxiRanksRouter);

// Start server
const port = parseInt(process.env.PORT || '3000', 10);
serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0' // Bind to all network interfaces
});

console.log(`Server running at http://0.0.0.0:${port}`);
console.log(`Local: http://localhost:${port}`);
console.log(`Network: http://${process.env.HOST || '192.168.0.66'}:${port}`); 