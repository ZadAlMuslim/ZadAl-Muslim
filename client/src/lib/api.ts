interface Location {
  lat: number;
  lng: number;
}

export async function getLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export async function getPrayerTimes(location: Location) {
  const { lat, lng } = location;
  const date = new Date();
  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${lat}&longitude=${lng}&method=2`
  );
  return response.json();
}

export async function getHijriDate() {
  const response = await fetch(
    `https://api.aladhan.com/v1/gToH?date=${new Date().toISOString().split('T')[0]}`
  );
  const data = await response.json();
  return data.data.hijri;
}

export async function getQuranPage(page: number) {
  const response = await fetch(
    `https://api.alquran.cloud/v1/page/${page}/quran-uthmani`
  );
  return response.json();
}

export async function getAdhkar(category: string) {
  const response = await fetch(
    `https://www.hisnmuslim.com/api/ar/${category}.json`
  );
  const data = await response.json();
  return {
    content: data.content.map((item: any, index: number) => ({
      id: index + 1,
      arabic: item.zekr,
      translation: item.en,
      transliteration: item.tr,
      repeat: item.count || 1
    }))
  };
}