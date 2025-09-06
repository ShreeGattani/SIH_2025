export interface BaseQuestion {
  id: number;
  type: 'multiple-choice' | 'drag-drop' | 'short-answer';
  prompt: string;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: 'science' | 'technology' | 'engineering' | 'mathematics';
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop';
  items: DragDropItem[];
  targets: DragDropTarget[];
  explanation?: string;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  correctAnswers: string[]; // Multiple possible correct answers
  answerType: 'text' | 'number';
  placeholder?: string;
  explanation?: string;
}

export interface DragDropItem {
  id: string;
  content: string;
  correctTargetId: string;
}

export interface DragDropTarget {
  id: string;
  content: string;
  description?: string;
}

export type Question = MultipleChoiceQuestion | DragDropQuestion | ShortAnswerQuestion;

export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  userAnswer: any;
  xpEarned: number;
  timeSpent: number; // in seconds
}

export interface QuizState {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  totalXP: number;
  results: QuestionResult[];
  isComplete: boolean;
  startTime: number;
}

// Mock question bank
export const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    prompt: "Which planet is known as the 'Red Planet'?",
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    xpReward: 25,
    difficulty: 'easy',
    subject: 'science',
    explanation: "Mars is called the Red Planet because of iron oxide (rust) on its surface!"
  },
  {
    id: 2,
    type: 'drag-drop',
    prompt: "Match each planet to its correct description:",
    items: [
      { id: 'earth', content: '🌍 Earth', correctTargetId: 'target-earth' },
      { id: 'mars', content: '🔴 Mars', correctTargetId: 'target-mars' },
      { id: 'jupiter', content: '🪐 Jupiter', correctTargetId: 'target-jupiter' }
    ],
    targets: [
      { id: 'target-earth', content: 'Has water and life', description: 'The only known planet with life' },
      { id: 'target-mars', content: 'The Red Planet', description: 'Known for its rusty color' },
      { id: 'target-jupiter', content: 'Largest planet', description: 'A gas giant with many moons' }
    ],
    xpReward: 40,
    difficulty: 'medium',
    subject: 'science',
    explanation: "Great job matching the planets! Each planet has unique characteristics."
  },
  {
    id: 3,
    type: 'short-answer',
    prompt: "How many moons does Earth have?",
    correctAnswers: ['1', 'one', 'One'],
    answerType: 'text',
    placeholder: "Type your answer...",
    xpReward: 15,
    difficulty: 'easy',
    subject: 'science',
    explanation: "Earth has exactly one natural satellite - the Moon!"
  },
  {
    id: 4,
    type: 'multiple-choice',
    prompt: "What is the speed of light in a vacuum?",
    options: ['299,792,458 m/s', '150,000,000 m/s', '384,400 km/s', '1,000,000 m/s'],
    correctAnswer: 0,
    xpReward: 35,
    difficulty: 'hard',
    subject: 'science',
    explanation: "Light travels at approximately 299,792,458 meters per second in a vacuum - that's really fast!"
  }
];
