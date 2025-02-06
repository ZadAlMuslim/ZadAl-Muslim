import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Laptop, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/hooks";
import type { Theme } from "@/lib/hooks";

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setThemeMode } = useTheme();

  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/prayer-times", label: "مواقيت الصلاة" },
    { href: "/quran", label: "القرآن الكريم" },
    { href: "/adhkar", label: "الأذكار" },
    { href: "/sadaqah-jariyah", label: "صدقة جارية" }, // Added Sadaqah Jariyah link
    { href: "/ramadan", label: "رمضان"} // Added Ramadan link
  ];

  const themeIcons: Record<Theme, React.ReactNode> = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    system: <Laptop className="h-5 w-5" />
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // System theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-primary">Zad Al-Muslim</a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {themeIcons[theme]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setThemeMode("light")}>
                  <Sun className="ml-2 h-4 w-4" />
                  <span>فاتح</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeMode("dark")}>
                  <Moon className="ml-2 h-4 w-4" />
                  <span>داكن</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeMode("system")}>
                  <Laptop className="ml-2 h-4 w-4" />
                  <span>النظام</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          location === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setThemeMode("light")}
                      className="flex-1"
                    >
                      <Sun className="ml-2 h-4 w-4" />
                      فاتح
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setThemeMode("dark")}
                      className="flex-1"
                    >
                      <Moon className="ml-2 h-4 w-4" />
                      داكن
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-red-500">
          يوجد في الموقع مشاكل بسيطة وسيتم حلها بأقرب وقت
        </div>
      </div>
    </nav>
  );
}