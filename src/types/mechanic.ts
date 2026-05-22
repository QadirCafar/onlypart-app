export type MechanicStatus = "active" | "inactive";

export type Mechanic = {
  id: number;
  userId: string;
  name: string;
  description: string | null;
  address: string | null;
  experienceYears: number;
  rating: number;
  status: MechanicStatus | string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string | null;
  user: unknown | null;
};

export type CreateMechanicRequest = {
  userId: string;
  name: string;
  description?: string | null;
  address?: string | null;
  experienceYears: number;
  latitude?: number;
  longitude?: number;
  status: MechanicStatus | string;
};

export type UpdateMechanicRequest = {
  userId: string;
  name: string;
  description?: string | null;
  address?: string | null;
  experienceYears: number;
  latitude?: number;
  longitude?: number;
  status: MechanicStatus | string;
};