import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuranPage } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Quran() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    // Check if input is a page number
    const pageNum = parseInt(searchQuery);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= 604) {
      setPage(pageNum);
      setSearchResults([]);
      return;
    }

    // Remove diacritics for better search
    const normalizedQuery = searchQuery.replace(/[\u064B-\u065F]/g, '');

    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah`);
      const data = await response.json();
      if (data.code === 200) {
        const surah = data.data.find((s: any) => 
          s.name.replace(/[\u064B-\u065F]/g, '').includes(normalizedQuery) ||
          s.englishName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (surah) {
          // Navigate to the surah's first page
          const response = await fetch(`https://api.alquran.cloud/v1/quran/quran-uthmani`);
          const quranData = await response.json();
          const firstAyah = quranData.data.surahs[surah.number - 1].ayahs[0];
          setPage(Math.ceil(firstAyah.number / 15)); // Assuming 15 ayahs per page
          setSearchResults([]);
          return;
        }
      }

      // If not found as surah, search in text
      const textResponse = await fetch(`https://api.alquran.cloud/v1/search/${normalizedQuery}/all/ar`);
      const textData = await textResponse.json();
      if (textData.code === 200) {
        setSearchResults(textData.data.matches);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const { data: quranPage, isLoading } = useQuery({
    queryKey: ["quran", page],
    queryFn: () => getQuranPage(page)
  });

  const surahName = quranPage?.data.ayahs[0]?.surah?.name || "";
  const surahNameEn = quranPage?.data.ayahs[0]?.surah?.englishName || "";

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center mb-8 space-y-4">
        <h1 className="text-4xl font-bold mb-2">القرآن الكريم</h1>
        <p className="text-muted-foreground">The Noble Quran</p>

        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في القرآن..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Button 
            onClick={handleSearch}
            className="bg-primary/90 hover:bg-primary shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            بحث
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="max-w-2xl mx-auto mt-4">
            <h3 className="text-lg font-semibold mb-2">نتائج البحث:</h3>
            <div className="space-y-2">
              {searchResults.map((result, index) => (
                <Card key={index} className="p-4">
                  <p className="text-lg">{result.text}</p>
                  <p className="text-sm text-muted-foreground">
                    سورة {result.surah.name} - آية {result.numberInSurah}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Card className="border-primary/20">
        {isLoading ? (
          <Skeleton className="h-[600px]" />
        ) : (
          <>
            <CardHeader className="text-center border-b">
              <div className="flex items-center justify-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">{surahName}</h2>
                <span className="text-muted-foreground">({surahNameEn})</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-right space-y-4 leading-loose text-2xl">
                {quranPage?.data.ayahs.map((ayah: any) => (
                  <p key={ayah.number} className="verse">
                    {ayah.text}
                    <span className="text-primary text-base mx-2">﴿{ayah.numberInSurah}﴾</span>
                  </p>
                ))}
              </div>
            </CardContent>
          </>
        )}
      </Card>

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="hover:bg-primary/10 transition-all duration-300 border-primary/20 hover:border-primary shadow-md hover:shadow-lg text-lg px-6"
        >
          <ChevronLeft className="ml-2" /> الصفحة السابقة
        </Button>
        <span className="text-lg font-semibold text-primary">
          صفحة {page} من 604
        </span>
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.min(604, p + 1))}
          disabled={page === 604}
          className="hover:bg-primary/10 transition-colors duration-200 border-primary/20 hover:border-primary"
        >
          الصفحة التالية <ChevronRight className="mr-2" />
        </Button>
      </div>
    </div>
  );
}