import {
  CreateMechanicRequest,
  Mechanic,
  UpdateMechanicRequest,
} from "../types/mechanic";
import { api } from "./api";

const MECHANICS_URL = "/Mechanics";

export const mechanicsApi = {
  async getAll(): Promise<Mechanic[]> {
    const response = await api.get<Mechanic[]>(MECHANICS_URL);
    return response.data;
  },

  async getById(id: number): Promise<Mechanic> {
    const response = await api.get<Mechanic>(`${MECHANICS_URL}/${id}`);
    return response.data;
  },

  async create(data: CreateMechanicRequest): Promise<Mechanic> {
    const response = await api.post<Mechanic>(MECHANICS_URL, data);
    return response.data;
  },

  async update(id: number, data: UpdateMechanicRequest): Promise<Mechanic> {
    const response = await api.put<Mechanic>(`${MECHANICS_URL}/${id}`, data);
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`${MECHANICS_URL}/${id}`);
  },
};