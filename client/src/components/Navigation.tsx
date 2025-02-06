import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Book, Heart } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">Zad Al-Muslim</a>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/">
              <a className={location === "/" ? "text-primary" : ""}>Home</a>
            </Link>
            <Link href="/quran">
              <a className={location === "/quran" ? "text-primary" : ""}>
                <Book className="h-5 w-5" />
              </a>
            </Link>
            <Link href="/adhkar">
              <a className={location === "/adhkar" ? "text-primary" : ""}>
                <Heart className="h-5 w-5" />
              </a>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? 
                <Moon className="h-5 w-5" /> : 
                <Sun className="h-5 w-5" />
              }
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
