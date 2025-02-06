
import RamadanCountdown from "@/components/RamadanCountdown";

export default function Ramadan() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">العد التنازلي لرمضان</h1>
        <p className="text-lg text-muted-foreground">
          كم باقي على شهر رمضان المبارك
        </p>
      </div>
      <RamadanCountdown />
    </div>
  );
}
