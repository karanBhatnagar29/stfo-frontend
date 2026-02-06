import { z } from 'zod';

export enum TripType {
  LEISURE = 'Leisure',
  BUSINESS = 'Business',
}

export const createTripSchema = z.object({
  destination: z.string().min(2, 'Destination is required'),
  startDate: z.string(), // ISO String
  endDate: z.string(),   // ISO String
  tripType: z.nativeEnum(TripType),
});

export type CreateTripDto = z.infer<typeof createTripSchema>;

export interface Trip {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  tripType: TripType;
  numberOfDays: number;
  season: string;
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  name: string;
  category: string;
  isPacked: boolean;
  isReturned: boolean;
  isMissing: boolean;
  quantity: number;
}
