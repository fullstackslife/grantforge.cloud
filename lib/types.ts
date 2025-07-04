export interface Grant {
  id: string;
  name: string;
  description: string;
  amount: number;
  amountRange?: {
    min: number;
    max: number;
  };
  region: string;
  industries: string[];
  deadline: string;
  applicationUrl: string;
  provider: string;
  requirements?: string[];
  tags?: string[];
}

export interface SearchFilters {
  region?: string;
  industry?: string;
  minAmount?: number;
  maxAmount?: number;
  deadline?: string;
  search?: string;
}

// Helper types for award parsing
export interface ParsedAmount {
  min: number | null;
  max: number | null;
  isRange: boolean;
  originalString: string;
} 