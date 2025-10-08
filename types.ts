
import type React from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export type LessonType = 'concept' | 'history' | 'game' | 'interactive' | 'problem' | 'quiz' | 'review';

export interface Lesson {
  day: number;
  title: string;
  type: LessonType;
  content: React.ReactNode;
  quiz?: QuizQuestion[];
}

export interface Week {
  week: number;
  title: string;
  lessons: Lesson[];
}
