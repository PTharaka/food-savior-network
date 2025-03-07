
import { toast } from "sonner";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationData = {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: Coordinates;
};

interface Organization {
  id: string;
  name: string;
  type: 'food_bank' | 'composter' | 'shelter' | 'community_kitchen';
  coordinates: Coordinates;
  address: string;
  distance?: number; // in miles
  contactPerson: string;
  phone: string;
  email: string;
  acceptedItems: string[];
  availability: string[];
}

class GeoLocationService {
  private static instance: GeoLocationService;
  private currentLocation: Coordinates | null = null;
  private cachedOrganizations: Organization[] = [];
  
  // Demo organizations data
  private readonly demoOrganizations: Organization[] = [
    {
      id: 'org_1',
      name: 'City Food Bank',
      type: 'food_bank',
      coordinates: { latitude: 37.7896, longitude: -122.3981 },
      address: '123 Main St, San Francisco, CA 94107',
      contactPerson: 'John Smith',
      phone: '(415) 555-1234',
      email: 'contact@cityfoodbank.org',
      acceptedItems: ['Produce', 'Canned Goods', 'Dairy', 'Prepared Meals'],
      availability: ['Mon-Fri: 9am-5pm', 'Sat: 10am-2pm']
    },
    {
      id: 'org_2',
      name: 'Community Pantry',
      type: 'food_bank',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
      address: '456 Market St, San Francisco, CA 94103',
      contactPerson: 'Maria Garcia',
      phone: '(415) 555-5678',
      email: 'info@communitypantry.org',
      acceptedItems: ['Produce', 'Bread', 'Canned Goods', 'Meat'],
      availability: ['Mon-Thu: 10am-6pm', 'Fri: 10am-4pm']
    },
    {
      id: 'org_3',
      name: 'Green Composting',
      type: 'composter',
      coordinates: { latitude: 37.7751, longitude: -122.4193 },
      address: '789 Howard St, San Francisco, CA 94103',
      contactPerson: 'Alex Johnson',
      phone: '(415) 555-9012',
      email: 'operations@greencomposting.com',
      acceptedItems: ['Produce Scraps', 'Coffee Grounds', 'Eggshells', 'Plant Waste'],
      availability: ['Mon-Fri: 8am-4pm', 'Sat-Sun: 9am-1pm']
    },
    {
      id: 'org_4',
      name: 'Shelter Kitchen',
      type: 'shelter',
      coordinates: { latitude: 37.8010, longitude: -122.4194 },
      address: '101 Polk St, San Francisco, CA 94102',
      contactPerson: 'David Chen',
      phone: '(415) 555-3456',
      email: 'kitchen@shelter.org',
      acceptedItems: ['Prepared Meals', 'Produce', 'Meat', 'Dairy', 'Bread'],
      availability: ['Daily: 7am-7pm']
    },
    {
      id: 'org_5',
      name: 'Community Kitchen Collective',
      type: 'community_kitchen',
      coordinates: { latitude: 37.7650, longitude: -122.4290 },
      address: '220 Valencia St, San Francisco, CA 94103',
      contactPerson: 'Sarah Williams',
      phone: '(415) 555-7890',
      email: 'info@kitchencollective.org',
      acceptedItems: ['Produce', 'Dairy', 'Dry Goods', 'Bread'],
      availability: ['Tue-Sat: 11am-7pm']
    }
  ];

  private constructor() {}

  public static getInstance(): GeoLocationService {
    if (!GeoLocationService.instance) {
      GeoLocationService.instance = new GeoLocationService();
    }
    return GeoLocationService.instance;
  }

  public async getCurrentLocation(): Promise<Coordinates | null> {
    if (this.currentLocation) {
      return this.currentLocation;
    }

    try {
      // For demo purposes, we'll use a fixed location in San Francisco
      this.currentLocation = { latitude: 37.7749, longitude: -122.4194 };
      return this.currentLocation;
      
      // In a real implementation, we would use the browser's geolocation API:
      /*
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      this.currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      return this.currentLocation;
      */
    } catch (error) {
      console.error('Error getting current location:', error);
      toast.error('Failed to get your current location');
      return null;
    }
  }

  private calculateDistance(coords1: Coordinates, coords2: Coordinates): number {
    // Calculate distance between two coordinates using the Haversine formula
    const R = 3958.8; // Earth's radius in miles
    const dLat = this.toRadians(coords2.latitude - coords1.latitude);
    const dLon = this.toRadians(coords2.longitude - coords1.longitude);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(coords1.latitude)) * Math.cos(this.toRadians(coords2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  }

  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  public async getNearbyOrganizations(maxDistance: number = 10): Promise<Organization[]> {
    const currentLocation = await this.getCurrentLocation();
    if (!currentLocation) {
      return [];
    }

    // If we have cached results, return them
    if (this.cachedOrganizations.length > 0) {
      return this.cachedOrganizations;
    }

    // Calculate distance for each organization
    const organizationsWithDistance = this.demoOrganizations.map(org => {
      const distance = this.calculateDistance(currentLocation, org.coordinates);
      return { ...org, distance };
    });

    // Filter by distance and sort by proximity
    const nearbyOrganizations = organizationsWithDistance
      .filter(org => (org.distance || 0) <= maxDistance)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));

    this.cachedOrganizations = nearbyOrganizations;
    return nearbyOrganizations;
  }

  public async getOrganizationsByType(type: Organization['type'], maxDistance: number = 10): Promise<Organization[]> {
    const allOrganizations = await this.getNearbyOrganizations(maxDistance);
    return allOrganizations.filter(org => org.type === type);
  }

  public async geocodeAddress(address: string): Promise<LocationData | null> {
    // In a real implementation, we would use a geocoding service like Google Maps API
    // For demo purposes, we'll return a mock result
    
    return {
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'USA',
      coordinates: { latitude: 37.7749, longitude: -122.4194 }
    };
  }

  public getCachedOrganizations(): Organization[] {
    return this.cachedOrganizations.length > 0 
      ? this.cachedOrganizations 
      : this.demoOrganizations;
  }
}

export default GeoLocationService;
export type { Coordinates, LocationData, Organization };
