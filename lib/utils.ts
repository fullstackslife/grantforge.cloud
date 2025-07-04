import { ParsedAmount } from './types';

export function parseAmount(amountStr: unknown): ParsedAmount {
  if (typeof amountStr !== 'string') {
    console.warn('Invalid award amount string:', amountStr);
    return { min: null, max: null, isRange: false, originalString: String(amountStr) };
  }

  const normalized = amountStr.replace(/[$,€]/g, '').trim();
  
  // Handle "Up to X" format
  if (normalized.toLowerCase().startsWith('up to')) {
    const max = parseNumber(normalized.replace(/up to/i, '').trim());
    return {
      min: 0,
      max,
      isRange: false,
      originalString: amountStr
    };
  }

  // Handle range format (e.g., "$50,000 – $200,000")
  if (normalized.includes('–') || normalized.includes('-')) {
    const [minStr, maxStr] = normalized.split(/[–-]/).map(s => s.trim());
    return {
      min: parseNumber(minStr),
      max: parseNumber(maxStr),
      isRange: true,
      originalString: amountStr
    };
  }

  // Handle single amount
  const amount = parseNumber(normalized);
  return {
    min: amount,
    max: amount,
    isRange: false,
    originalString: amountStr
  };
}

function parseNumber(str: string): number {
  // Handle million/billion abbreviations
  str = str.toLowerCase()
    .replace(/million/i, '000000')
    .replace(/billion/i, '000000000')
    .replace(/m/i, '000000')
    .replace(/b/i, '000000000');
  
  // Remove any remaining non-numeric characters except decimal point
  str = str.replace(/[^0-9.]/g, '');
  
  return parseFloat(str) || 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}; 