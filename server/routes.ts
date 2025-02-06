import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  app.get("/api/preferences", async (req, res) => {
    const prefs = await storage.getPreferences(1); // Default user for now
    res.json(prefs);
  });

  app.post("/api/preferences", async (req, res) => {
    const prefs = await storage.updatePreferences(1, req.body);
    res.json(prefs);
  });

  const httpServer = createServer(app);
  return httpServer;
}
