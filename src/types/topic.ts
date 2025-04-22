export interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  countBg: string;
  countText: string;
  questionCount?: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
} 