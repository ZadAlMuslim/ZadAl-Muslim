
import { useEffect, useState } from "react";
import PrayerWidget from "@/components/PrayerWidget";
import QiblaCompass from "@/components/QiblaCompass";
import HijriDate from "@/components/HijriDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RamadanCountdown from "@/components/RamadanCountdown";

export default function Home() {
  const [location, setLocation] = useState<{city: string, country: string} | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
          );
          const data = await response.json();
          setLocation({
            city: data.city,
            country: data.countryName
          });
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">زاد المسلم</h1>
        <p className="text-lg text-muted-foreground">
          رفيقك في العبادات اليومية
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>الموقع والتاريخ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {location && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">موقعك</h3>
                <p className="text-xl">{location.city}، {location.country}</p>
              </div>
            )}
            <HijriDate />
          </CardContent>
        </Card>
        <QiblaCompass />
      </div>

      <PrayerWidget />
    </div>
  );
}
