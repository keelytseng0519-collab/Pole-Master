
export interface Option {
  text: string;
  isCorrect: boolean;
  sop?: string;
  mindset?: string;
  failMsg?: string;
  isSafetyStop?: boolean;
}

export interface Stage {
  story: string;
  desc: string;
  options: Option[];
}

export interface UserInfo {
  company: string;
  name: string;
}

export interface Feedback {
  type: 'success' | 'error';
  msg: string;
  mindset?: string;
  isSafetyStop?: boolean;
  aiAdvice?: string;
}

export enum GameState {
  REGISTER = 'REGISTER',
  PLAYING = 'PLAYING',
  TRANSITIONING = 'TRANSITIONING',
  GAME_OVER = 'GAME_OVER'
}
