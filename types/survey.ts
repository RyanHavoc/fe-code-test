export type QuestionType = 
  | 'checkbox' 
  | 'radio' 
  | 'multiselect' 
  | 'singleselect' 
  | 'text'
  | 'date'
  | 'rating';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: Option[];
  required?: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: Answer[];
  submittedAt: string;
}