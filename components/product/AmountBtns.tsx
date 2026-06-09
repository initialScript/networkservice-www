// components/product/AmountBtns.tsx
'use client';

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AmountBtnsProps {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minAmount?: number;
  maxAmount?: number;
}

export function AmountBtns({ 
  amount, 
  onIncrease, 
  onDecrease, 
  minAmount = 1, 
  maxAmount = 99 
}: AmountBtnsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row bg-gray-100">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onDecrease}
        disabled={amount <= minAmount}
        aria-label="Decrease amount"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <div className="min-w-[60px] text-center">
        <span className="text-lg font-semibold">{amount}</span>
      </div>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onIncrease}
        disabled={amount >= maxAmount}
        aria-label="Increase amount"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}