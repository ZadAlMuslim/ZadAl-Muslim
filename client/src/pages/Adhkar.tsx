import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adhkarData } from "@/lib/adhkar-data";

const categories = {
  morning: "أذكار الصباح",
  evening: "أذكار المساء",
  salah: "أذكار الصلاة",
  general: "أذكار عامة"
};

export default function Adhkar() {
  const [selectedDhikr, setSelectedDhikr] = useState<{text: string, count: number} | null>(null);
  const [counter, setCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdhkar = Object.entries(categories).map(([key, title]) => ({
    title,
    content: adhkarData[key as keyof typeof adhkarData].filter(dhikr => 
      dhikr.text.includes(searchTerm)
    )
  })).filter(category => category.content.length > 0);

  const handleDhikrClick = (dhikr: {text: string, count: number}) => {
    setSelectedDhikr(dhikr);
    setCounter(0);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-md mx-auto">
        <Input
          type="text"
          placeholder="ابحث في الأذكار..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-4"
        />
      </div>
      {selectedDhikr ? (
        <Card className="text-center">
          <CardHeader>
            <CardTitle>{selectedDhikr.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">{counter}/{selectedDhikr.count}</div>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => counter < selectedDhikr.count && setCounter(c => c + 1)}
              >
                تسبيح
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedDhikr(null)}
              >
                رجوع
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAdhkar.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.content.map((dhikr, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDhikrClick(dhikr)}
                  >
                    {dhikr.text}
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}