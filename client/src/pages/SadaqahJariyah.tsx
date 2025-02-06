import { useState } from "react";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const adhkarList = [
  { text: "سبحان الله", count: 33 },
  { text: "الحمد لله", count: 33 },
  { text: "لا إله إلا الله", count: 33 },
  { text: "الله أكبر", count: 34 },
  { text: "أستغفر الله", count: 100 },
  { text: "لا حول ولا قوة إلا بالله", count: 50 },
  // Add more adhkar here
];

export default function SadaqahJariyah() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [selectedDhikr, setSelectedDhikr] = useState<{text: string, count: number} | null>(null);
  const [counter, setCounter] = useState(0);

  const handleSubmit = () => {
    // Save the name and generate a link
    window.location.href = `/marhom/${encodeURIComponent(name)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {id ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center">الصدقة الجارية عن روح المرحوم</h1>
          <h2 className="text-2xl text-center">{decodeURIComponent(id)}</h2>

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
              {adhkarList.map((dhikr, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="p-8 text-lg hover:bg-primary/10 transition-all duration-300 border-primary/20 hover:border-primary shadow-md hover:shadow-lg"
                  onClick={() => {
                    setSelectedDhikr(dhikr);
                    setCounter(0);
                  }}
                >
                  {dhikr.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">ادخل اسمه رحمه الله</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="اسم المرحوم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-right"
            />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>أدخل اسمه لإنشاء صفحة خاصة للصدقة الجارية</p>
              <p>سيتم إنشاء رابط يمكنك مشاركته مع الآخرين</p>
            </div>
            <Button 
              className="w-full bg-primary/90 hover:bg-primary shadow-lg hover:shadow-xl transition-all duration-300 text-lg" 
              onClick={handleSubmit}
              disabled={!name.trim()}
            >
              إنشاء صفحة
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}