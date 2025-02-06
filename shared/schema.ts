import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  location: jsonb("location").$type<{lat: number, lng: number}>(),
  language: text("language").default("en"),
  theme: text("theme").default("light"),
  calculationMethod: text("calculation_method").default("MWL"),
  madhab: text("madhab").default("SHAFI"),
});

export const insertPreferencesSchema = createInsertSchema(userPreferences).omit({ 
  id: true 
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertPreferences = z.infer<typeof insertPreferencesSchema>;
