
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RamadanCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const ramadanDate = new Date('2025-03-01T00:00:00');

    const calculateTimeLeft = () => {
      const difference = ramadanDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">الوقت المتبقي لرمضان ١٤٤٦</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-sm text-muted-foreground">يوم</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm text-muted-foreground">ساعة</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm text-muted-foreground">دقيقة</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm text-muted-foreground">ثانية</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
