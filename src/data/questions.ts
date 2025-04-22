interface Question {
  question: string;
  answers: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizQuestions {
  [key: string]: Question[];
}

export const quizQuestions: QuizQuestions = {
  'thoi-ky-dai-viet': [
    {
      question: "Ai là người sáng lập triều đại phong kiến độc lập đầu tiên của Việt Nam vào năm 939?",
      answers: ["Ngô Quyền", "Đinh Bộ Lĩnh", "Lê Hoàn", "Lý Công Uẩn"],
      correct: 0,
      difficulty: "easy"
    },
    {
      question: "Chiến thắng Bạch Đằng năm 938 do Ngô Quyền lãnh đạo đã đánh bại quân xâm lược nào?",
      answers: ["Quân Tống", "Quân Nam Hán", "Quân Nguyên", "Quân Minh"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Triều đại nhà Đinh được thành lập vào năm nào?",
      answers: ["939", "968", "980", "1009"],
      correct: 1,
      difficulty: "easy"
    }
  ],
  'thoi-ky-bac-thuoc': [
    {
      question: "Cuộc khởi nghĩa nào đã chấm dứt thời kỳ Bắc thuộc lần thứ nhất?",
      answers: [
        "Khởi nghĩa Hai Bà Trưng",
        "Khởi nghĩa Lý Bí",
        "Khởi nghĩa Mai Thúc Loan",
        "Khởi nghĩa Phùng Hưng"
      ],
      correct: 0,
      difficulty: "easy"
    },
    {
      question: "Thời kỳ Bắc thuộc lần thứ nhất kéo dài trong khoảng thời gian nào?",
      answers: [
        "Từ năm 179 TCN đến năm 544",
        "Từ năm 111 TCN đến năm 39",
        "Từ năm 43 đến năm 544",
        "Từ năm 111 TCN đến năm 905"
      ],
      correct: 1,
      difficulty: "medium"
    }
  ],
  'cach-mang-viet-nam': [
    {
      question: "Đảng Cộng sản Việt Nam được thành lập vào ngày tháng năm nào?",
      answers: [
        "3/2/1930",
        "3/2/1931",
        "3/2/1929",
        "3/2/1932"
      ],
      correct: 0,
      difficulty: "easy"
    },
    {
      question: "Cách mạng Tháng Tám diễn ra vào năm nào?",
      answers: [
        "1944",
        "1945",
        "1946",
        "1947"
      ],
      correct: 1,
      difficulty: "easy"
    }
  ]
}; 