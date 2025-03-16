// API
import { backendApi } from '@/api/client';

// UTILS
import type { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';

interface GetNearbyParams {
  latitude: number;
  longitude: number;
  radius: number; // in meters
}

const handleApiError = (error: any): never => {
  if (error.name === 'AbortError') {
    throw new Error('Request timed out. Please check your internet connection and try again.');
  }
  if (error instanceof TypeError && error.message.includes('Network request failed')) {
    throw new Error('Network connection failed. Please check your internet connection and try again.');
  }
  throw error;
};

export class TaxiRanksApi {
  static async getWithinBounds(bounds: TaxiRank.MapBounds): Promise<TaxiRank.TaxiRank[]> {
    try {
      const response = await backendApi.get('/api/v1/taxi-ranks', {
        params: {
          ne_lat: bounds.northeast.latitude,
          ne_lng: bounds.northeast.longitude,
          sw_lat: bounds.southwest.latitude,
          sw_lng: bounds.southwest.longitude
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching ranks within bounds:', error);
      throw handleApiError(error);
    }
  }

  static async getAllTaxiRanks(): Promise<TaxiRank.TaxiRank[]> {
    try {
      const response = await backendApi.get('/api/v1/taxi-ranks');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching taxi ranks:', error);
      throw handleApiError(error);
    }
  }

  static async searchTaxiRanks(destination: string): Promise<TaxiRank.TaxiRank[]> {
    try {
      const response = await backendApi.get('/api/v1/taxi-ranks', {
        params: { destination: encodeURIComponent(destination) }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error searching taxi ranks:', error);
      throw handleApiError(error);
    }
  }

  static async getTaxiRankById(id: string): Promise<TaxiRank.TaxiRank> {
    try {
      const response = await backendApi.get(`/api/v1/taxi-ranks/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching taxi rank:', error);
      throw handleApiError(error);
    }
  }

  static async getConnectingRanks(rankId: string): Promise<TaxiRank.TaxiRankConnection[]> {
    try {
      const response = await backendApi.get(`/api/v1/taxi-ranks/${rankId}/connections`);
      return response.data;
    } catch (error) {
      console.error('Error fetching connecting ranks:', error);
      throw handleApiError(error);
    }
  }

  static async getNearby({ latitude, longitude, radius }: GetNearbyParams): Promise<TaxiRank.TaxiRank[]> {
    try {
      const response = await backendApi.get('/api/v1/taxi-ranks', {
        params: { lat: latitude, lng: longitude, radius }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching nearby taxi ranks:', error);
      throw handleApiError(error);
    }
  }

  static async getRankDetails(rankId: string): Promise<TaxiRank.TaxiRank> {
    try {
      const response = await backendApi.get(`/api/v1/taxi-ranks/${rankId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching taxi rank details:', error);
      throw handleApiError(error);
    }
  }
} 