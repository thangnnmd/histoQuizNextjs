import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Question {
  id: string;
  content: string;
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export async function getQuestions(
  topicId: string, 
  count: number = 10, 
  difficulty: string = 'medium'
): Promise<Question[]> {
  try {
    // Truy vấn câu hỏi từ Supabase
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('topic_id', topicId)
      .eq('difficulty', difficulty)
      .limit(count);

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      // Fallback to static data if no questions found
      return getFallbackQuestions(topicId, count, difficulty);
    }

    // Chuyển đổi dữ liệu từ Supabase sang định dạng Question
    const questions = data.map(q => {
      try {
        // Đảm bảo answers là một mảng hợp lệ
        let parsedAnswers;
        try {
          parsedAnswers = Array.isArray(q.answers) ? q.answers : JSON.parse(q.answers);
        } catch (e) {
          console.error('Error parsing answers:', e);
          parsedAnswers = [];
        }

        // Đảm bảo mỗi câu hỏi có định dạng đúng
        return {
          id: q.id || `fallback-${Math.random().toString(36).substring(2, 9)}`,
          content: q.question || 'Câu hỏi không có nội dung',
          answers: parsedAnswers.map((text: string, index: number) => ({
            id: index,
            text: text || 'Không có đáp án',
            isCorrect: index === q.correct
          })),
          difficulty: q.difficulty || difficulty
        };
      } catch (e) {
        console.error('Error processing question:', e, q);
        return null;
      }
    }).filter(Boolean) as Question[]; // Lọc bỏ các câu hỏi null

    return questions;
  } catch (error) {
    console.error('Error in getQuestions:', error);
    // Fallback to static data in case of error
    return getFallbackQuestions(topicId, count, difficulty);
  }
}

// Fallback function to use static data from src/data/questions.ts
function getFallbackQuestions(
  topicId: string, 
  count: number, 
  difficulty: string
): Question[] {
  try {
    // Import static questions data
    const { quizQuestions } = require('@/data/questions');
    
    // Map topic ID to key in quizQuestions
    const topicKey = Object.keys(quizQuestions).find(key => {
      // Simple mapping - you might need to adjust this based on your data structure
      return key.replace(/-/g, '').toLowerCase() === topicId.replace(/-/g, '').toLowerCase();
    });
    
    if (!topicKey || !quizQuestions[topicKey]) {
      console.error('No fallback questions found for topic:', topicId);
      return [];
    }
    
    // Filter by difficulty if specified
    const filteredQuestions = quizQuestions[topicKey].filter(
      q => !difficulty || q.difficulty === difficulty
    );
    
    // Convert to Question format and ensure all fields are valid
    return filteredQuestions.slice(0, count).map((q, index) => {
      try {
        // Đảm bảo answers là một mảng hợp lệ
        const answers = Array.isArray(q.answers) ? q.answers : [];
        
        return {
          id: `static-${topicKey}-${index}`,
          content: q.question || 'Câu hỏi không có nội dung',
          answers: answers.map((text: string, i: number) => ({
            id: i,
            text: text || 'Không có đáp án',
            isCorrect: i === q.correct
          })),
          difficulty: q.difficulty || difficulty
        };
      } catch (e) {
        console.error('Error processing fallback question:', e, q);
        return null;
      }
    }).filter(Boolean) as Question[]; // Lọc bỏ các câu hỏi null
  } catch (error) {
    console.error('Error in fallback questions:', error);
    return [];
  }
}
