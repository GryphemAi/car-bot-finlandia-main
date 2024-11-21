import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}

export const formatPhoneNumber = (input?: string): string => {
  if (!input) return '';

  const cleanedValue: string = input.replace(/\D/g, '');
  let formattedNumber: string = '';

  if (cleanedValue.length === 12) {
    formattedNumber = cleanedValue.replace(
      /(\d{3})(\d{2})(\d{6})/,
      '($1) $2 $3'
    );
  } else {
    formattedNumber = cleanedValue;
  }

  return formattedNumber;
};

export function formatCurrency(input: string | number) {
  const formattedValue = (Number(input) / 100).toLocaleString('fi-FI', {
    style: 'currency',
    currency: 'EUR'
  });

  return formattedValue;
}

export function formatCurrencyToNumber(input: string | number) {
  const numericInput = String(input).replace(/[^\d]/g, '');
  const value = Number(numericInput);

  return value;
}
