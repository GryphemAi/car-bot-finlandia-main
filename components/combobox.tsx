'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface ComboboxProps {
  data: {
    value: string;
    label: string;
  }[];
  inputPlaceHolder?: string;
  value: string;
  search?: boolean;
  onValueChange: (label: string) => void;
  onSelectChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
}

export function Combobox({
  data,
  inputPlaceHolder,
  value,
  search,
  onValueChange,
  onSelectChange,
  onSearchChange
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((data) => data.label === value)?.label
            : inputPlaceHolder || 'Buscar...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          {search && (
            <CommandInput
              placeholder={inputPlaceHolder || 'Buscar...'}
              onValueChange={(search) => onSearchChange?.(search)}
              className="h-9"
            />
          )}
          <CommandList>
            <CommandGroup>
              {data.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.label}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? '' : currentValue);
                    onSelectChange?.(currentValue === value ? '' : data.value);
                    setOpen(false);
                  }}
                >
                  {data.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === data.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
