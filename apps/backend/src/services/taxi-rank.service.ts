import { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';

// Mock data for development
const mockTaxiRanks: TaxiRank.TaxiRank[] = [
  {
    id: '1',
    name: 'Alexandra Main Taxi Rank',
    latitude: -26.1067,
    longitude: 28.1067,
    address: '15th Avenue corner Selborne, Alexandra',
    fareRange: {
      min: 6,
      max: 28,
    },
    facilities: ['Shelter', 'Seating', 'Public Toilets', 'Security', 'Queue Marshals'],
    routes: [
      {
        id: '1',
        name: 'Local',
        coordinates: { latitude: -26.1067, longitude: 28.1067 },
        fare: 6.00,
        waypoints: [
          { latitude: -26.1067, longitude: 28.1067 },
          { latitude: -26.1078, longitude: 28.1089 },
          { latitude: -26.1089, longitude: 28.1078 },
          { latitude: -26.1056, longitude: 28.1045 },
          { latitude: -26.1034, longitude: 28.1123 },
          { latitude: -26.1045, longitude: 28.1112 },
          { latitude: -26.1067, longitude: 28.1067 }
        ]
      },
      {
        id: '2',
        name: 'Johannesburg',
        coordinates: { latitude: -26.2041, longitude: 28.0473 },
        fare: 11.00,
        waypoints: [
          { latitude: -26.1067, longitude: 28.1067 },
          { latitude: -26.1112, longitude: 28.1056 },
          { latitude: -26.1167, longitude: 28.0917 },
          { latitude: -26.1521, longitude: 28.0417 },
          { latitude: -26.1733, longitude: 28.0517 },
          { latitude: -26.1833, longitude: 28.0667 },
          { latitude: -26.2012, longitude: 28.0473 },
          { latitude: -26.2041, longitude: 28.0473 }
        ]
      },
      {
        id: '3',
        name: 'Randburg',
        coordinates: { latitude: -26.0891, longitude: 28.0012 },
        fare: 11.00,
        waypoints: [
          { latitude: -26.1067, longitude: 28.1067 },
          { latitude: -26.1089, longitude: 28.0917 },
          { latitude: -26.1167, longitude: 28.0667 },
          { latitude: -26.1167, longitude: 28.0417 },
          { latitude: -26.1167, longitude: 28.0167 },
          { latitude: -26.1056, longitude: 28.0123 },
          { latitude: -26.0967, longitude: 28.0067 },
          { latitude: -26.0891, longitude: 28.0012 }
        ]
      },
      {
        id: '4',
        name: 'Sandton',
        coordinates: { latitude: -26.1067, longitude: 28.0567 },
        fare: 8.50,
        waypoints: [
          { latitude: -26.1067, longitude: 28.1067 },
          { latitude: -26.1089, longitude: 28.0917 },
          { latitude: -26.1089, longitude: 28.0817 },
          { latitude: -26.1078, longitude: 28.0717 },
          { latitude: -26.1067, longitude: 28.0667 },
          { latitude: -26.1067, longitude: 28.0617 },
          { latitude: -26.1067, longitude: 28.0567 }
        ]
      },
      {
        id: '5',
        name: 'Pretoria',
        coordinates: { latitude: -25.7479, longitude: 28.2293 },
        fare: 28.00,
        waypoints: []
      },
      {
        id: '6',
        name: 'Edenvale',
        coordinates: { latitude: -26.1393, longitude: 28.1667 },
        fare: 10.00,
        waypoints: []
      },
      {
        id: '7',
        name: 'Jewish',
        coordinates: { latitude: -26.1521, longitude: 28.0417 },
        fare: 9.00,
        waypoints: []
      },
      {
        id: '8',
        name: 'Longmeadow',
        coordinates: { latitude: -26.0833, longitude: 28.1500 },
        fare: 9.00,
        waypoints: []
      },
      {
        id: '9',
        name: 'Modderfontein',
        coordinates: { latitude: -26.0833, longitude: 28.1667 },
        fare: 10.00,
        waypoints: []
      },
      {
        id: '10',
        name: 'Germiston',
        coordinates: { latitude: -26.2167, longitude: 28.1667 },
        fare: 13.00,
        waypoints: []
      },
      {
        id: '11',
        name: 'Kempton Park',
        coordinates: { latitude: -26.1000, longitude: 28.2333 },
        fare: 14.00,
        waypoints: []
      },
      {
        id: '12',
        name: 'Baracity',
        coordinates: { latitude: -26.1833, longitude: 28.3167 },
        fare: 15.00,
        waypoints: []
      },
      {
        id: '13',
        name: 'Cosmos City',
        coordinates: { latitude: -26.0247, longitude: 27.9292 },
        fare: 17.00,
        waypoints: []
      },
      {
        id: '14',
        name: 'Kya Sands',
        coordinates: { latitude: -26.0333, longitude: 27.9667 },
        fare: 16.00,
        waypoints: []
      },
      {
        id: '15',
        name: 'Fourways/Douglasdale',
        coordinates: { latitude: -26.0167, longitude: 28.0167 },
        fare: 12.00,
        waypoints: []
      },
      {
        id: '16',
        name: 'Denver',
        coordinates: { latitude: -26.2167, longitude: 28.0667 },
        fare: 13.00,
        waypoints: []
      },
      {
        id: '17',
        name: 'Eastgate',
        coordinates: { latitude: -26.1833, longitude: 28.1167 },
        fare: 11.00,
        waypoints: []
      },
      {
        id: '18',
        name: 'Craighall',
        coordinates: { latitude: -26.1167, longitude: 28.0167 },
        fare: 11.00,
        waypoints: []
      },
      {
        id: '19',
        name: 'Rosebank',
        coordinates: { latitude: -26.1467, longitude: 28.0367 },
        fare: 11.00,
        waypoints: []
      }
    ],
    operatingHours: {
      open: '04:00',
      close: '19:00',
    },
    contactNumber: '011 123 4567',
    rating: 4.2,
    numberOfRatings: 156,
    additionalLocations: [
      {
        name: "Police Station Rank",
        address: "15th Avenue corner Selborne, Alexandra",
        coordinates: { latitude: -26.1067, longitude: 28.1067 }
      },
      {
        name: "John Branbt Rank",
        address: "15th Avenue corner John Branbt, Alexandra",
        coordinates: { latitude: -26.1078, longitude: 28.1089 }
      },
      {
        name: "Rooth Corner Rank",
        address: "20th Avenue corner Rooth, Alexandra",
        coordinates: { latitude: -26.1056, longitude: 28.1045 }
      },
      {
        name: "Tsutsumani Rank",
        address: "Tsutsumani next to first park, Alexandra",
        coordinates: { latitude: -26.1034, longitude: 28.1123 }
      },
      {
        name: "London Road Rank",
        address: "8th Avenue corner London Road, Alexandra",
        coordinates: { latitude: -26.1089, longitude: 28.1078 }
      },
      {
        name: "Madala Rank",
        address: "3rd Avenue next to Kwa madala hostel, Alexandra",
        coordinates: { latitude: -26.1112, longitude: 28.1056 }
      },
      {
        name: "Pan Africa Rank",
        address: "Pan Africa Mall and shell garage next to Boxer store, Alexandra",
        coordinates: { latitude: -26.1045, longitude: 28.1112 }
      }
    ]
  },
  {
    id: '2',
    name: 'Randburg Taxi Rank',
    latitude: -26.0891,
    longitude: 28.0012,
    address: '123 Jan Smuts Ave, Randburg',
    fareRange: {
      min: 15,
      max: 25,
    },
    facilities: ['Shelter', 'Seating', 'Public Toilets'],
    routes: [
      {
        id: '20',
        name: 'Sandton',
        coordinates: { latitude: -26.1067, longitude: 28.0567 },
        waypoints: [
          { latitude: -26.0891, longitude: 28.0012 },
          { latitude: -26.0917, longitude: 28.0089 },
          { latitude: -26.0934, longitude: 28.0156 },
          { latitude: -26.0950, longitude: 28.0234 },
          { latitude: -26.0989, longitude: 28.0345 },
          { latitude: -26.1023, longitude: 28.0456 },
          { latitude: -26.1045, longitude: 28.0512 },
          { latitude: -26.1067, longitude: 28.0567 }
        ],
        fare: 15.00
      },
      {
        id: '21',
        name: 'Rosebank',
        coordinates: { latitude: -26.1467, longitude: 28.0367 },
        waypoints: [
          { latitude: -26.0891, longitude: 28.0012 },
          { latitude: -26.0917, longitude: 28.0089 },
          { latitude: -26.0967, longitude: 28.0123 },
          { latitude: -26.1089, longitude: 28.0167 },
          { latitude: -26.1234, longitude: 28.0234 },
          { latitude: -26.1345, longitude: 28.0312 },
          { latitude: -26.1412, longitude: 28.0345 },
          { latitude: -26.1467, longitude: 28.0367 }
        ],
        fare: 12.00
      }
    ],
    operatingHours: {
      open: '04:30',
      close: '21:00',
    },
    contactNumber: '011 789 1234',
    rating: 4.2,
    numberOfRatings: 156,
  }
];

class TaxiRankService {
  async findAll(): Promise<TaxiRank.TaxiRank[]> {
    return mockTaxiRanks;
  }

  async findById(id: string): Promise<TaxiRank.TaxiRank | null> {
    return mockTaxiRanks.find(rank => rank.id === id) || null;
  }

  async findWithinBounds(bounds: TaxiRank.MapBounds): Promise<TaxiRank.TaxiRank[]> {
    return mockTaxiRanks.filter(rank => 
      rank.latitude >= bounds.southwest.latitude &&
      rank.latitude <= bounds.northeast.latitude &&
      rank.longitude >= bounds.southwest.longitude &&
      rank.longitude <= bounds.northeast.longitude
    );
  }

  async findNearby(location: { latitude: number; longitude: number }, radius: number): Promise<TaxiRank.TaxiRank[]> {
    return mockTaxiRanks.filter(rank => {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        rank.latitude,
        rank.longitude
      );
      return distance <= radius;
    });
  }

  async findByDestination(destination: string): Promise<TaxiRank.TaxiRank[]> {
    const searchTerm = destination.toLowerCase();
    return mockTaxiRanks.filter(rank =>
      rank.routes.some(route => 
        route.name.toLowerCase().includes(searchTerm)
      )
    );
  }

  async findConnectingRanks(rankId: string): Promise<TaxiRank.TaxiRankConnection[]> {
    const rank = await this.findById(rankId);
    if (!rank) return [];

    const connections = mockTaxiRanks
      .filter(otherRank => otherRank.id !== rankId)
      .map(otherRank => {
        const sharedDestinations = otherRank.routes
          .map(route => route.name)
          .filter(dest => 
            rank.routes.some(r => r.name.toLowerCase() === dest.toLowerCase())
          );

        return {
          rankId: otherRank.id,
          destinations: sharedDestinations
        };
      })
      .filter(connection => connection.destinations.length > 0);

    return connections;
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    // Haversine formula for calculating distance between two points
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
}

export const taxiRankService = new TaxiRankService(); 