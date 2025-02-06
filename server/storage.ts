import { UserPreferences, InsertPreferences } from "@shared/schema";

export interface IStorage {
  getPreferences(userId: number): Promise<UserPreferences | undefined>;
  updatePreferences(userId: number, prefs: InsertPreferences): Promise<UserPreferences>;
}

export class MemStorage implements IStorage {
  private preferences: Map<number, UserPreferences>;
  private currentId: number;

  constructor() {
    this.preferences = new Map();
    this.currentId = 1;
  }

  async getPreferences(userId: number): Promise<UserPreferences | undefined> {
    return this.preferences.get(userId);
  }

  async updatePreferences(userId: number, prefs: InsertPreferences): Promise<UserPreferences> {
    const userPrefs: UserPreferences = {
      id: userId,
      ...prefs
    };
    this.preferences.set(userId, userPrefs);
    return userPrefs;
  }
}

export const storage = new MemStorage();
