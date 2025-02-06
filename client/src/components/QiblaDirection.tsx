
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function QiblaDirection() {
  const [direction, setDirection] = useState<number | null>(null);
  const [deviceSupport, setDeviceSupport] = useState<boolean>(false);
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasOrientation = 'DeviceOrientationEvent' in window;
    
    setDeviceSupport(isMobile && hasOrientation);

    if (!isMobile) {
      toast({
        title: "تنبيه",
        description: "البوصلة تعمل فقط على الأجهزة المحمولة التي تدعم مستشعر التوجيه",
        duration: 5000,
      });
      return;
    }

    // Handle device orientation
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.webkitCompassHeading) {
        // iOS devices
        setHeading(event.webkitCompassHeading);
      } else if (event.alpha !== null) {
        // Android devices
        setHeading(360 - event.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);

    const getQiblaDirection = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });

        const lat1 = position.coords.latitude;
        const lon1 = position.coords.longitude;
        const lat2 = 21.422487; // Kaaba latitude
        const lon2 = 39.826206; // Kaaba longitude

        // Convert to radians
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        // Calculate Qibla direction
        const y = Math.sin(Δλ);
        const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
        let qibla = Math.atan2(y, x) * 180 / Math.PI;
        
        // Normalize to 0-360
        qibla = (qibla + 360) % 360;
        
        setDirection(qibla);
        
        toast({
          title: "تم",
          description: "تم تحديد اتجاه القبلة بنجاح",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحديد الموقع. يرجى التأكد من تفعيل خدمة الموقع",
          variant: "destructive",
        });
      }
    };

    getQiblaDirection();
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const getCompassRotation = () => {
    if (direction === null) return 0;
    return direction - heading;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">اتجاه القبلة</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!deviceSupport ? (
          <p className="text-center text-muted-foreground">
            البوصلة تعمل فقط على الأجهزة المحمولة التي تدعم مستشعر التوجيه
          </p>
        ) : direction !== null ? (
          <div className="relative flex flex-col items-center">
            <Compass 
              className="h-32 w-32 transition-transform duration-200"
              style={{ transform: `rotate(${getCompassRotation()}deg)` }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-1 h-4 bg-primary"></div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              اتجاه القبلة: {Math.round(direction)}° | البوصلة: {Math.round(heading)}°
            </p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            جاري تحديد اتجاه القبلة...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
