'use client';

import { Car } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Car className="w-8 h-8 text-primary" />
      <span className="text-2xl font-bold text-primary">CarBoard</span>
    </div>
  );
}
