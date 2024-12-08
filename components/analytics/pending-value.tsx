"use client";

import { Card } from "@/components/ui/card";

interface PendingValueProps {
  totalMessages: number;
  pricePerMessage: number;
}

export function PendingValue({ totalMessages, pricePerMessage }: PendingValueProps) {
  const pendingValue = totalMessages * pricePerMessage;

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Valor Pendente</p>
        <div className="flex items-baseline space-x-2">
          <h2 className="text-3xl font-bold">
            € {pendingValue.toFixed(2)}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          €{pricePerMessage.toFixed(3)} por mensagem enviada
        </p>
      </div>
    </Card>
  );
}
