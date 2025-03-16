export namespace TaxiRank {
  export interface TaxiRank {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    fareRange: {
      min: number;
      max: number;
    };
    facilities: string[];
    routes: Route[];
    operatingHours: {
      open: string;
      close: string;
    };
    contactNumber?: string;
    rating: number;
    numberOfRatings: number;
    additionalLocations?: AdditionalLocation[];
  }
  
  export interface TaxiRankFilters {
    facilities?: string[];
    operatingHoursBefore?: string;
    operatingHoursAfter?: string;
    maxDistance?: number;
  }

  export interface TaxiRankConnection {
    rankId: string;
    destinations: string[];
  }

  export interface MapBounds {
    northeast: {
      latitude: number;
      longitude: number;
    };
    southwest: {
      latitude: number;
      longitude: number;
    };
  }

  export interface Route {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    waypoints: {
      latitude: number;
      longitude: number;
    }[];
    fare: number;
  }

  export interface AdditionalLocation {
    name: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }

  export interface FAQ {
    question: string;
    answer: string;
  }
}