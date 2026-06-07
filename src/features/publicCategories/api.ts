import { api } from "../../api/api";
import type { PublicCategory } from "./types";

const baseUrl = "/PublicCategories";

export async function getPublicCategories(): Promise<PublicCategory[]> {
  const response = await api.get<PublicCategory[]>(baseUrl);

  return response.data;
}