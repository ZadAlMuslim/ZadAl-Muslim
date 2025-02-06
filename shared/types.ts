export interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
}

export interface QuranVerse {
  number: number;
  text: string;
  translation: string;
}

export interface Dhikr {
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
}
