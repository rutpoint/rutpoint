import { Hono } from 'hono';
import { z } from 'zod';
import { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';
import { taxiRankService } from '../services/taxi-rank.service';

const app = new Hono();

// Validation schemas with strict type coercion
const boundsQuerySchema = z.object({
  ne_lat: z.coerce.number(),
  ne_lng: z.coerce.number(),
  sw_lat: z.coerce.number(),
  sw_lng: z.coerce.number(),
});

const nearbyQuerySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  radius: z.coerce.number(),
});

const searchQuerySchema = z.object({
  destination: z.string(),
});

// Main taxi ranks endpoint with query parameter support
app.get('/', async (c) => {
  try {
    const query = c.req.query();
    
    // Check for bounds parameters
    if (query.ne_lat && query.ne_lng && query.sw_lat && query.sw_lng) {
      const { ne_lat, ne_lng, sw_lat, sw_lng } = boundsQuerySchema.parse(query);
      const bounds: TaxiRank.MapBounds = {
        northeast: { latitude: ne_lat, longitude: ne_lng },
        southwest: { latitude: sw_lat, longitude: sw_lng }
      };
      const ranks = await taxiRankService.findWithinBounds(bounds);
      return c.json({ data: ranks });
    }

    // Check for nearby parameters
    if (query.lat && query.lng && query.radius) {
      const { lat, lng, radius } = nearbyQuerySchema.parse(query);
      const ranks = await taxiRankService.findNearby({ latitude: lat, longitude: lng }, radius);
      return c.json({ data: ranks });
    }

    // Check for destination search
    if (query.destination && typeof query.destination === 'string') {
      const { destination } = searchQuerySchema.parse({ destination: query.destination });
      const ranks = await taxiRankService.findByDestination(destination);
      return c.json({ data: ranks });
    }

    // If no query parameters, return all ranks
    const ranks = await taxiRankService.findAll();
    return c.json({ data: ranks });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid query parameters' }, 400);
    }
    console.error('Error handling taxi ranks request:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get taxi rank by ID
app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const rank = await taxiRankService.findById(id);
    
    if (!rank) {
      return c.json({ error: 'Taxi rank not found' }, 404);
    }

    return c.json({ data: rank });
  } catch (error) {
    console.error('Error fetching taxi rank:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get connecting ranks
app.get('/:id/connections', async (c) => {
  try {
    const id = c.req.param('id');
    const connections = await taxiRankService.findConnectingRanks(id);
    return c.json({ data: connections });
  } catch (error) {
    console.error('Error fetching connecting ranks:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app; 