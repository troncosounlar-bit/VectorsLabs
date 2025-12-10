// Tipos e interfaces para el conversor de PSeInt a JavaScript

export interface ErrorDetail {
  line: number;
  code: string;
  message: string;
  type: 'syntax' | 'structure' | 'conversion' | 'warning';
  suggestion?: string;
}

export interface ConversionResult {
  success: boolean;
  javascript: string;
  errors: string[];
  warnings: string[];
  detailedErrors: ErrorDetail[];
}

export interface LineResult {
  code: string;
  newIndentLevel: number;
}
