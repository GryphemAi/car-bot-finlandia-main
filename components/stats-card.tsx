'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export default function StatsCard({
  title,
  amount,
  Icon,
  className
}: {
  title: string;
  amount: number;
  Icon: LucideIcon;
  className?: string;
}) {
  return (
    <>
      <Card className="h-40 w-44 min-w-44 overflow-hidden rounded-lg">
        <CardContent className="flex h-full items-center justify-center p-0">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={cn('mb-2 rounded-full bg-gray-200 p-2', className)}>
              <Icon className="h-8 w-8" />
            </div>
            <CardTitle className="px-0 text-center font-bold">
              {title}
            </CardTitle>
            <CardDescription className="flex items-center justify-center truncate text-nowrap font-bold">
              {amount}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
