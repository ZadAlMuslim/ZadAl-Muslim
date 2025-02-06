import { usePrayerTimes } from "@/lib/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

export default function PrayerWidget() {
  const { prayerTimes, location } = usePrayerTimes();

  if (!prayerTimes) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const prayers = [
    { name: "الفجر", time: prayerTimes.data.timings.Fajr },
    { name: "الشروق", time: prayerTimes.data.timings.Sunrise },
    { name: "الظهر", time: prayerTimes.data.timings.Dhuhr },
    { name: "العصر", time: prayerTimes.data.timings.Asr },
    { name: "المغرب", time: prayerTimes.data.timings.Maghrib },
    { name: "العشاء", time: prayerTimes.data.timings.Isha }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">مواقيت الصلاة</h2>
          {location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 ml-1" />
              <span>موقعك الحالي</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50"
            >
              <span className="font-medium">{prayer.name}</span>
              <span className="font-arabic">{prayer.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}