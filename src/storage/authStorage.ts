import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export type AuthUser = {
  userId?: string;
  id?: string;
  email: string;
  fullName: string;
  roles: string[];
};

export const authStorage = {
  async setToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async removeToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  async setUser(user: AuthUser) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<AuthUser | null> {
    const value = await AsyncStorage.getItem(USER_KEY);

    if (!value) return null;

    return JSON.parse(value);
  },

  async clear() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },
};