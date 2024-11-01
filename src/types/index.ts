export interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

export interface DecisionDimension {
  dimension: string;
  pros: string[];
  cons: string[];
}

export type Participant = 'AI1' | 'AI2' | 'User' | 'Moderator';