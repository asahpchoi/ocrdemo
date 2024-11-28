export interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface AnalysisResult {
  description: string;
  isLoading: boolean;
  error?: string;
}