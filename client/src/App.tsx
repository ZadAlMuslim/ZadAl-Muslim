import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import PrayerTimes from "@/pages/PrayerTimes";
import Quran from "@/pages/Quran";
import Adhkar from "@/pages/Adhkar";
import SadaqahJariyah from "@/pages/SadaqahJariyah";
import Ramadan from "./pages/Ramadan";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/prayer-times" component={PrayerTimes} />
          <Route path="/quran" component={Quran} />
          <Route path="/adhkar" component={Adhkar} />
          <Route path="/sadaqah-jariyah/:id" component={SadaqahJariyah} />
          <Route path="/sadaqah-jariyah" component={SadaqahJariyah} />
          <Route path="/ramadan" component={Ramadan} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;