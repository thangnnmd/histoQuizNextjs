import { quizQuestions } from '@/data/questions';

export interface TopicQuestionCount {
  id: string;
  count: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

export function useQuestions() {
  const getQuestionCountByTopic = (): TopicQuestionCount[] => {
    return Object.entries(quizQuestions).map(([id, questions]) => {
      const count = questions.length;
      const easyCount = questions.filter(q => q.difficulty === 'easy').length;
      const mediumCount = questions.filter(q => q.difficulty === 'medium').length;
      const hardCount = questions.filter(q => q.difficulty === 'hard').length;

      return {
        id,
        count,
        easyCount,
        mediumCount,
        hardCount
      };
    });
  };

  return {
    getQuestionCountByTopic
  };
} 