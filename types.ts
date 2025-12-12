
export interface Service {
  id: number;
  title: string;
  label: string;
  img: string;
  desc: string;
  Icon: any;
  tooltip: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Insight {
  content: string;
  sources: GroundingSource[];
}

export interface QuizResponse {
  name: string;
  email: string;
  website: string;
  role: string;
  location: string;
  answers: Record<string, any>;
  qualification: {
    solution: string;
    budget: string;
  };
}

export interface QuizResult {
  score: number;
  leakEstimate: number;
  categoryScores: {
    acquisition: number;
    conversion: number;
    retention: number;
  };
}

export interface UserLocation {
  city: string;
  region: string;
  country: string;
}

export interface AppState {
  services: Service[];
  marketInsight: Insight | null;
  insightTopic: string;
  quizResult: QuizResult | null; // Added to Global State
  userLocation: UserLocation | null; // Added to Global State
  
  deleteService: (id: number) => void;
  setMarketInsight: (data: Insight) => void;
  setInsightTopic: (topic: string) => void;
  setQuizResult: (result: QuizResult | null) => void; // Added Setter
}
