import { usePrayerTimes } from "@/lib/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar } from "lucide-react";

export default function PrayerTimes() {
  const { prayerTimes, location } = usePrayerTimes();

  if (!prayerTimes || !location) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-[400px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const allTimings = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء"
  };

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-4">مواقيت الصلاة</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{prayerTimes.data.meta.timezone}</span>
        </div>
      </header>

      <Card>
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{prayerTimes.data.date.readable}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {Object.entries(allTimings).map(([key, name]) => (
              <div
                key={key}
                className="flex justify-between items-center p-4 rounded-lg bg-muted/50"
              >
                <span className="font-medium">{name}</span>
                <span className="font-arabic">{prayerTimes.data.timings[key]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}