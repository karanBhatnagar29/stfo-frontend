import { api } from './client';
import { CreateTripDto, Trip } from '@/types/trips';

export const tripsApi = {
  create: async (data: CreateTripDto) => {
    return api.post<Trip>('/trips', data).then(res => res.data);
  },
  
  findAll: async () => {
    return api.get<Trip[]>('/trips').then(res => res.data);
  },
  
  findOne: async (id: string) => {
    return api.get<Trip>(`/trips/${id}`).then(res => res.data);
  },
  
  togglePacked: async (tripId: string, itemName: string) => {
      return api.patch<Trip>(`/trips/${tripId}/checklist`, { itemName }).then(res => res.data);
  },
  
  generateSuggestions: async (data: any) => {
      return api.post('/suggestions/generate', data).then(res => res.data);
  },
  
  confirmReturn: async (tripId: string, itemsBroughtBack: string[]) => {
      return api.post<Trip>(`/trips/${tripId}/return`, { items: itemsBroughtBack }).then(res => res.data);
  }
};
