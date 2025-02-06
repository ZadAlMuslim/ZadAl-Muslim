import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function QiblaCompass() {
  const [heading, setHeading] = useState<number | null>(null);

  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      console.log("Device orientation not supported");
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setHeading(event.alpha);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">اتجاه القبلة</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">اتجاه السهم يشير إلى القبلة</p>
        <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <Compass 
            className="w-full h-full"
            style={{ 
              transform: `rotate(${heading ?? 0}deg)`,
              transition: "transform 0.3s ease-out"
            }}
          />
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
