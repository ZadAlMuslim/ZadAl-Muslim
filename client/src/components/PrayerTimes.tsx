import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPrayerTimes } from "@/lib/api";
import type { PrayerTime } from "@shared/types";

export default function PrayerTimes() {
  const { data: times, isLoading } = useQuery({
    queryKey: ['/api/prayer-times'],
    queryFn: fetchPrayerTimes
  });

  if (isLoading) {
    return <div>Loading prayer times...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prayer Times</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {times?.map((prayer: PrayerTime) => (
            <div key={prayer.name} className="text-center p-4 rounded-lg bg-muted">
              <div className="text-xl font-arabic mb-2">{prayer.arabic}</div>
              <div className="text-sm text-muted-foreground">{prayer.name}</div>
              <div className="text-lg font-semibold">{prayer.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
