import { NextRequest, NextResponse } from 'next/server';
import { getQuestions } from '@/lib/questions';

// Hàm để tạo seed từ topicId và các tham số khác
function generateSeed(topicId: string, sessionId?: string): number {
  // Nếu có sessionId (cho bài kiểm tra đang làm), sử dụng nó để tạo seed
  // Nếu không có (bài kiểm tra mới), tạo seed mới từ thời gian hiện tại
  const seedString = sessionId || `${topicId}-${Date.now()}`;
  
  // Tạo số nguyên từ chuỗi
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = ((seed << 5) - seed) + seedString.charCodeAt(i);
    seed = seed & seed; // Convert to 32bit integer
  }
  return Math.abs(seed);
}

// Hàm để shuffle mảng với seed cố định
function seededShuffle<T>(array: T[], seed: number): T[] {
  const newArray = [...array];
  const random = (max: number) => {
    // Simple seeded random function
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) * max;
  };

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(random(i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const topicId = searchParams.get('topicId');
  const count = parseInt(searchParams.get('count') || '10');
  const difficulty = searchParams.get('difficulty') || 'medium';
  const sessionId = searchParams.get('sessionId'); // Thêm sessionId để xác định bài kiểm tra
  
  if (!topicId) {
    return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 });
  }

  try {
    // Lấy câu hỏi từ database hoặc nguồn dữ liệu
    const questions = await getQuestions(topicId, count, difficulty);
    
    // Kiểm tra và lọc câu hỏi hợp lệ
    const validQuestions = questions.filter(q => 
      q && q.content && Array.isArray(q.answers) && q.answers.length > 0
    );
    
    if (validQuestions.length === 0) {
      console.error('No valid questions found for topic:', topicId);
      return NextResponse.json({ error: 'No valid questions found' }, { status: 404 });
    }
    
    // Tạo seed từ topicId và sessionId (nếu có)
    const seed = generateSeed(topicId, sessionId);
    
    // Nếu có sessionId (đang làm bài kiểm tra), sắp xếp theo ID để đảm bảo thứ tự ổn định
    // Nếu không có sessionId (bài kiểm tra mới), shuffle câu hỏi với seed cố định
    const processedQuestions = sessionId 
      ? validQuestions.sort((a, b) => a.id.localeCompare(b.id))
      : seededShuffle(validQuestions, seed);
    
    // Giới hạn số lượng câu hỏi theo count
    const limitedQuestions = processedQuestions.slice(0, Math.min(count, processedQuestions.length));
    
    return NextResponse.json(limitedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
} 
