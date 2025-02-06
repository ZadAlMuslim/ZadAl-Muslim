
import { useEffect, useState } from 'react';

export default function HijriDate() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { 
      calendar: 'islamic',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      numberingSystem: 'arab'
    };
    
    const hijriDate = new Intl.DateTimeFormat('ar-SA', options).format(today);
    setDate(hijriDate);
  }, []);

  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold">التاريخ الهجري</h2>
      <p className="text-lg">{date}</p>
    </div>
  );
}
