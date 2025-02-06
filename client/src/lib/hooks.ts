import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrayerTimes, getLocation } from "./api";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem("theme") as Theme) || "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    if (theme === "system") {
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, toggleTheme, setThemeMode };
}

export function usePrayerTimes() {
  const { data: location } = useQuery({
    queryKey: ["location"],
    queryFn: getLocation
  });

  const { data: prayerTimes } = useQuery({
    queryKey: ["prayer-times", location?.lat, location?.lng],
    queryFn: () => getPrayerTimes(location!),
    enabled: !!location
  });

  return { prayerTimes, location };
}