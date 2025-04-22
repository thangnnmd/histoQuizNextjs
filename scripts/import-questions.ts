import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const questions = [
    {
        "question": "Chiến thắng Bạch Đằng năm 938 do Ngô Quyền lãnh đạo đã đánh bại quân xâm lược nào?",
        "answers":  JSON.stringify(["Quân Tống", "Quân Nam Hán", "Quân Nguyên", "Quân Minh"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Triều đại nhà Đinh được thành lập vào năm nào?",
        "answers":  JSON.stringify(["939", "968", "980", "1009"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Đinh Bộ Lĩnh lấy niên hiệu gì khi lên ngôi hoàng đế?",
        "answers":  JSON.stringify(["Thái Bình", "Thiên Phúc", "Ứng Thiên", "Đại Bảo"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Đinh đặt kinh đô ở đâu?",
        "answers":  JSON.stringify(["Thăng Long", "Hoa Lư", "Cổ Loa", "Phú Xuân"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là người kế vị Đinh Bộ Lĩnh sau khi ông bị ám sát năm 979?",
        "answers":  JSON.stringify(["Đinh Toàn", "Lê Hoàn", "Lý Công Uẩn", "Trần Thủ Độ"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Triều đại Tiền Lê được thành lập vào năm nào?",
        "answers":  JSON.stringify(["968", "980", "1009", "1054"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lê Hoàn đánh bại quân xâm lược nào trong trận Bạch Đằng năm 981?",
        "answers":  JSON.stringify(["Quân Tống", "Quân Nam Hán", "Quân Nguyên", "Quân Minh"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua cuối cùng của triều Tiền Lê?",
        "answers":  JSON.stringify(["Lê Hoàn", "Lê Long Đĩnh", "Lê Trung Tông", "Lê Đại Hành"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao triều Tiền Lê sụp đổ vào năm 1009?",
        "answers":  JSON.stringify(["Nội chiến", "Quân Tống xâm lược", "Lý Công Uẩn khởi nghĩa", "Nông dân nổi dậy"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý được thành lập vào năm nào?",
        "answers":  JSON.stringify(["968", "980", "1009", "1225"]),
        "correct": 2,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua đầu tiên của triều Lý?",
        "answers":  JSON.stringify(["Lý Công Uẩn", "Lý Thái Tông", "Lý Thánh Tông", "Lý Nhân Tông"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý dời kinh đô từ Hoa Lư về đâu vào năm 1010?",
        "answers":  JSON.stringify(["Thăng Long", "Phú Xuân", "Cổ Loa", "Hoa Lư"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lý Công Uẩn ban hành chiếu gì khi dời đô về Thăng Long?",
        "answers":  JSON.stringify(["Chiếu dời đô", "Chiếu lập quốc", "Chiếu cải cách", "Chiếu bình Nam"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Lý đổi tên nước từ Đại Cồ Việt thành Đại Việt?",
        "answers":  JSON.stringify(["Lý Thái Tổ", "Lý Thái Tông", "Lý Thánh Tông", "Lý Nhân Tông"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lý Thường Kiệt đánh bại quân Tống trong trận chiến nào năm 1075-1077?",
        "answers":  JSON.stringify(["Sông Cầu", "Sông Như Nguyệt", "Sông Bạch Đằng", "Sông Lô"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Tác phẩm nào được coi là bản tuyên ngôn độc lập đầu tiên của Việt Nam do Lý Thường Kiệt sáng tác?",
        "answers":  JSON.stringify(["Nam quốc sơn hà", "Hịch tướng sĩ", "Bình Ngô đại cáo", "Chiếu dời đô"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý xây dựng ngôi chùa nổi tiếng nào ở Thăng Long?",
        "answers":  JSON.stringify(["Chùa Một Cột", "Chùa Bái Đính", "Chùa Hương", "Chùa Thiên Mụ"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nữ hoàng duy nhất trong lịch sử phong kiến Việt Nam dưới triều Lý?",
        "answers":  JSON.stringify(["Lý Chiêu Hoàng", "Ỷ Lan", "Nguyễn Thị Anh", "Nam Phương"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao triều Lý suy yếu vào cuối thế kỷ XII?",
        "answers":  JSON.stringify(["Nội bộ tranh quyền", "Quân Tống xâm lược", "Nông dân nổi dậy", "Thiếu vua tài giỏi"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần được thành lập vào năm nào?",
        "answers":  JSON.stringify(["1009", "1225", "1400", "1428"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua đầu tiên của triều Trần?",
        "answers":  JSON.stringify(["Trần Thủ Độ", "Trần Thái Tông", "Trần Thánh Tông", "Trần Nhân Tông"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Trần Thủ Độ có vai trò gì trong việc thành lập nhà Trần?",
        "answers":  JSON.stringify(["Vua", "Tướng lĩnh", "Quan đại thần", "Nhà sử học"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần đánh bại quân Nguyên-Mông lần thứ nhất vào năm nào?",
        "answers":  JSON.stringify(["1258", "1285", "1288", "1407"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị tướng chỉ huy chiến thắng Bạch Đằng năm 1288?",
        "answers":  JSON.stringify(["Trần Hưng Đạo", "Trần Quang Khải", "Trần Quốc Toản", "Trần Nhật Duật"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Tác phẩm 'Hịch tướng sĩ' của Trần Hưng Đạo được viết trước cuộc kháng chiến nào?",
        "answers":  JSON.stringify(["Kháng chiến chống Tống", "Kháng chiến chống Nguyên lần 2", "Kháng chiến chống Nguyên lần 3", "Kháng chiến chống Minh"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần tổ chức hội nghị nào để bàn kế hoạch đánh quân Nguyên-Mông năm 1285?",
        "answers":  JSON.stringify(["Hội nghị Diên Hồng", "Hội nghị Bình Than", "Hội nghị Vạn Kiếp", "Hội nghị Thăng Long"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Trần từ bỏ ngai vàng để tu hành?",
        "answers":  JSON.stringify(["Trần Thái Tông", "Trần Thánh Tông", "Trần Nhân Tông", "Trần Anh Tông"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần xây dựng hệ thống đê điều nào để bảo vệ nông nghiệp?",
        "answers":  JSON.stringify(["Đê sông Hồng", "Đê sông Cầu", "Đê sông Lô", "Đê sông Mã"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao triều Trần suy yếu vào cuối thế kỷ XIV?",
        "answers":  JSON.stringify(["Nội bộ tranh quyền", "Quân Nguyên xâm lược", "Nhà Hồ nổi dậy", "Tất cả đều đúng"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Hồ được thành lập vào năm nào?",
        "answers":  JSON.stringify(["1225", "1400", "1428", "1527"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua sáng lập triều Hồ?",
        "answers":  JSON.stringify(["Hồ Quý Ly", "Hồ Hán Thương", "Hồ Nguyên Trừng", "Hồ Xuân Hương"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Hồ Quý Ly thực hiện cải cách gì để củng cố quyền lực?",
        "answers":  JSON.stringify(["Cải cách điền địa", "Cải cách quân đội", "Cải cách giáo dục", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Hồ thất bại trước quân Minh vào năm nào?",
        "answers":  JSON.stringify(["1400", "1407", "1418", "1428"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao nhà Hồ không được lòng dân chúng?",
        "answers":  JSON.stringify(["Thuế nặng", "Cải cách quá gấp rút", "Phụ thuộc quân Minh", "Tất cả đều đúng"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là người lãnh đạo khởi nghĩa Lam Sơn chống quân Minh?",
        "answers":  JSON.stringify(["Lê Lợi", "Nguyễn Trãi", "Trần Nguyên Hãn", "Lê Lai"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Khởi nghĩa Lam Sơn bắt đầu vào năm nào?",
        "answers":  JSON.stringify(["1407", "1418", "1428", "1471"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Tác phẩm 'Bình Ngô đại cáo' do ai sáng tác?",
        "answers":  JSON.stringify(["Lê Lợi", "Nguyễn Trãi", "Trần Nguyên Hãn", "Lê Lai"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chiến thắng nào đánh dấu sự kết thúc của khởi nghĩa Lam Sơn?",
        "answers":  JSON.stringify(["Tốt Động - Chúc Động", "Chi Lăng - Xương Giang", "Đông Quan", "Bạch Đằng"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lê sơ được thành lập vào năm nào?",
        "answers":  JSON.stringify(["1407", "1418", "1428", "1527"]),
        "correct": 2,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua đầu tiên của triều Lê sơ?",
        "answers":  JSON.stringify(["Lê Lợi", "Lê Thái Tông", "Lê Thánh Tông", "Lê Nhân Tông"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lê Thánh Tông ban hành bộ luật nào để quản lý đất nước?",
        "answers":  JSON.stringify(["Luật Hồng Đức", "Luật Gia Long", "Luật Thiên Nam", "Luật Đại Việt"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Triều Lê sơ mở rộng lãnh thổ về phía Nam đến đâu dưới thời Lê Thánh Tông?",
        "answers":  JSON.stringify(["Champa", "Chân Lạp", "Đàng Trong", "Cửu Chân"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lê sơ tổ chức kỳ thi khoa cử đầu tiên vào năm nào?",
        "answers":  JSON.stringify(["1428", "1434", "1442", "1471"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà sử học nổi tiếng thời Lê sơ viết 'Đại Việt sử ký toàn thư'?",
        "answers":  JSON.stringify(["Ngô Sĩ Liên", "Nguyễn Trãi", "Lê Quý Đôn", "Phan Phu Tiên"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao triều Lê sơ suy yếu vào cuối thế kỷ XV?",
        "answers":  JSON.stringify(["Nội bộ tranh quyền", "Quân Minh xâm lược", "Nông dân nổi dậy", "Tất cả đều đúng"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Mạc cướp ngôi nhà Lê sơ vào năm nào?",
        "answers":  JSON.stringify(["1428", "1527", "1592", "1788"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua sáng lập triều Mạc?",
        "answers":  JSON.stringify(["Mạc Đăng Dung", "Mạc Thái Tổ", "Mạc Mậu Hợp", "Mạc Kính Điển"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Mạc đặt kinh đô ở đâu?",
        "answers":  JSON.stringify(["Thăng Long", "Phú Xuân", "Cao Bằng", "Đông Đô"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị tướng nhà Lê sơ lãnh đạo phong trào trung hưng chống nhà Mạc?",
        "answers":  JSON.stringify(["Nguyễn Kim", "Trịnh Kiểm", "Nguyễn Hoàng", "Trần Nguyên Hãn"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Triều Mạc được thành lập vào năm nào sau khi cướp ngôi nhà Lê sơ?",
        "answers":  JSON.stringify(["1428", "1527", "1592", "1788"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua đầu tiên của triều Mạc?",
        "answers":  JSON.stringify(["Mạc Đăng Dung", "Mạc Thái Tông", "Mạc Mậu Hợp", "Mạc Kính Điển"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Mạc mất Thăng Long vào tay nhà Lê trung hưng vào năm nào?",
        "answers":  JSON.stringify(["1527", "1592", "1677", "1788"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Mạc tiếp tục tồn tại ở đâu sau khi mất Thăng Long?",
        "answers":  JSON.stringify(["Cao Bằng", "Phú Xuân", "Đồng Nai", "Hà Tiên"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà thơ nổi tiếng thời nhà Mạc với tác phẩm 'Bạch Vân am thi tập'?",
        "answers":  JSON.stringify(["Nguyễn Bỉnh Khiêm", "Nguyễn Trãi", "Lê Quý Đôn", "Nguyễn Du"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao triều Mạc không được nhiều người ủng hộ?",
        "answers":  JSON.stringify(["Cướp ngôi nhà Lê", "Thuế nặng", "Quân Minh xâm lược", "Nội chiến"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là người lãnh đạo phong trào trung hưng nhà Lê chống nhà Mạc?",
        "answers":  JSON.stringify(["Nguyễn Kim", "Trịnh Kiểm", "Nguyễn Hoàng", "Lê Lợi"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Mạc cuối cùng bị tiêu diệt hoàn toàn vào năm nào?",
        "answers":  JSON.stringify(["1592", "1627", "1677", "1788"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Tác phẩm nào của Nguyễn Bỉnh Khiêm mang tính triết lý và tiên đoán thời cuộc?",
        "answers":  JSON.stringify(["Sấm Trạng Trình", "Bình Ngô đại cáo", "Nam quốc sơn hà", "Truyện Kiều"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Mạc tổ chức kỳ thi khoa cử cuối cùng vào năm nào?",
        "answers":  JSON.stringify(["1529", "1554", "1580", "1592"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời kỳ Trịnh-Nguyễn phân tranh bắt đầu khi ai vào trấn thủ Thuận Hóa năm 1558?",
        "answers":  JSON.stringify(["Nguyễn Kim", "Nguyễn Hoàng", "Trịnh Kiểm", "Lê Duy Kỳ"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Các chúa Trịnh kiểm soát khu vực nào của Việt Nam?",
        "answers":  JSON.stringify(["Đàng Trong", "Đàng Ngoài", "Tây Nguyên", "Nam Bộ"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Các chúa Nguyễn cai quản khu vực nào trong thời kỳ phân tranh?",
        "answers":  JSON.stringify(["Đàng Ngoài", "Đàng Trong", "Việt Bắc", "Đồng bằng Bắc Bộ"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là chúa Nguyễn đầu tiên mở rộng lãnh thổ Đàng Trong đến Champa?",
        "answers":  JSON.stringify(["Nguyễn Hoàng", "Nguyễn Phúc Nguyên", "Nguyễn Phúc Lan", "Nguyễn Phúc Ánh"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Cuộc chiến Trịnh-Nguyễn chính thức bùng nổ vào năm nào?",
        "answers":  JSON.stringify(["1558", "1627", "1672", "1774"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà quân sự nổi tiếng giúp chúa Nguyễn xây dựng phòng tuyến Đồng Hới năm 1630?",
        "answers":  JSON.stringify(["Đào Duy Từ", "Nguyễn Hữu Cảnh", "Nguyễn Bỉnh Khiêm", "Trần Đình Ân"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao các chúa Nguyễn phát triển mạnh thương mại ở Đàng Trong?",
        "answers":  JSON.stringify(["Gần biển, nhiều cảng", "Hòa bình lâu dài", "Hỗ trợ từ Nhật", "Tất cả đều đúng"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chúa Nguyễn Phúc Khoát tự xưng là gì vào năm 1744?",
        "answers":  JSON.stringify(["Vương", "Hoàng đế", "Tướng quân", "Thái thượng hoàng"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là chúa Trịnh nổi tiếng với chính sách khuyến nông và phát triển kinh tế Đàng Ngoài?",
        "answers":  JSON.stringify(["Trịnh Kiểm", "Trịnh Tùng", "Trịnh Sâm", "Trịnh Cương"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Cuộc chiến Trịnh-Nguyễn kết thúc vào khoảng năm nào với sự phân chia rõ ràng hai miền?",
        "answers":  JSON.stringify(["1627", "1672", "1774", "1802"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Sông nào là ranh giới giữa Đàng Trong và Đàng Ngoài trong thời Trịnh-Nguyễn phân tranh?",
        "answers":  JSON.stringify(["Sông Gianh", "Sông Hồng", "Sông Cả", "Sông Thu Bồn"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà thơ nổi tiếng thời Trịnh-Nguyễn với tác phẩm 'Chinh phụ ngâm'?",
        "answers":  JSON.stringify(["Đoàn Thị Điểm", "Hồ Xuân Hương", "Nguyễn Du", "Bà Huyện Thanh Quan"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao Đàng Trong phát triển mạnh hơn Đàng Ngoài về kinh tế vào thế kỷ XVII-XVIII?",
        "answers": ["Thương mại quốc tế", "Nông nghiệp ổn định", "Khoa cử phát triển", "Quân đội mạnh"],
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là chúa Nguyễn mở rộng lãnh thổ đến vùng Hà Tiên vào cuối thế kỷ XVII?",
        "answers":  JSON.stringify(["Nguyễn Phúc Chu", "Nguyễn Phúc Tần", "Nguyễn Phúc Trăn", "Nguyễn Hữu Cảnh"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trịnh suy yếu vào cuối thế kỷ XVIII do nguyên nhân nào?",
        "answers":  JSON.stringify(["Nội bộ tranh quyền", "Khởi nghĩa nông dân", "Tây Sơn nổi dậy", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Khởi nghĩa Tây Sơn bắt đầu vào năm nào?",
        "answers":  JSON.stringify(["1592", "1672", "1771", "1802"]),
        "correct": 2,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là thủ lĩnh chính của khởi nghĩa Tây Sơn?",
        "answers":  JSON.stringify(["Nguyễn Nhạc", "Nguyễn Huệ", "Nguyễn Lữ", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn lên ngôi hoàng đế vào năm nào?",
        "answers":  JSON.stringify(["1771", "1778", "1788", "1802"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua đầu tiên của triều Tây Sơn?",
        "answers":  JSON.stringify(["Nguyễn Nhạc", "Nguyễn Huệ", "Nguyễn Lữ", "Nguyễn Quang Toản"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nguyễn Huệ đánh bại quân Thanh trong trận chiến nào năm 1789?",
        "answers":  JSON.stringify(["Rạch Gầm-Xoài Mút", "Ngọc Hồi-Đống Đa", "Bạch Đằng", "Chi Lăng"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Tác phẩm 'Hoàng Lê nhất thống chí' mô tả sự suy tàn của thời kỳ nào?",
        "answers":  JSON.stringify(["Nhà Mạc", "Trịnh-Nguyễn", "Tây Sơn", "Nhà Nguyễn"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nguyễn Huệ lấy niên hiệu gì khi lên ngôi hoàng đế?",
        "answers":  JSON.stringify(["Thái Đức", "Quang Trung", "Cảnh Thịnh", "Chiêu Thống"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chiến thắng Rạch Gầm-Xoài Mút năm 1785 do Nguyễn Huệ lãnh đạo đã đánh bại quân nào?",
        "answers":  JSON.stringify(["Quân Thanh", "Quân Xiêm", "Quân Trịnh", "Quân Nguyễn"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nữ tướng nổi tiếng của nhà Tây Sơn?",
        "answers":  JSON.stringify(["Bùi Thị Xuân", "Hồ Xuân Hương", "Đoàn Thị Điểm", "Nguyễn Thị Minh Khai"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn thực hiện cải cách gì để khuyến khích nông nghiệp?",
        "answers":  JSON.stringify(["Chia ruộng đất công", "Giảm thuế", "Xây đê điều", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao nhà Tây Sơn suy yếu sau cái chết của Nguyễn Huệ năm 1792?",
        "answers":  JSON.stringify(["Thiếu lãnh đạo tài giỏi", "Nguyễn Ánh phản công", "Nội bộ chia rẽ", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn mất Phú Xuân vào tay Nguyễn Ánh vào năm nào?",
        "answers":  JSON.stringify(["1789", "1792", "1801", "1802"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua cuối cùng của triều Tây Sơn?",
        "answers":  JSON.stringify(["Nguyễn Nhạc", "Nguyễn Huệ", "Nguyễn Quang Toản", "Nguyễn Lữ"]),
        "correct": 2,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn sụp đổ hoàn toàn vào năm nào?",
        "answers": ["1789", "1792", "1801", "1802"],
        "correct": 3,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lý Thường Kiệt từng giữ chức vụ gì dưới triều Lý?",
        "answers":  JSON.stringify(["Thái úy", "Tể tướng", "Hoàng đế", "Tướng quân"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần tổ chức chế độ gì để phân chia đất đai cho quý tộc?",
        "answers":  JSON.stringify(["Thái ấp", "Công điền", "Tư điền", "Đồn điền"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là tác giả 'Phú sông Bạch Đằng' thời nhà Trần?",
        "answers":  JSON.stringify(["Trương Hán Siêu", "Trần Quang Khải", "Trần Nhật Duật", "Trần Hưng Đạo"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý xây dựng văn miếu đầu tiên ở Thăng Long vào năm nào?",
        "answers":  JSON.stringify(["1010", "1070", "1156", "1225"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lê Thánh Tông thành lập cơ quan nào để ghi chép lịch sử triều đình?",
        "answers":  JSON.stringify(["Hàn lâm viện", "Quốc sử viện", "Ngự sử đài", "Thượng thư tỉnh"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần đánh bại quân Chiêm Thành trong trận chiến nào năm 1285?",
        "answers":  JSON.stringify(["Trận Thiên Trường", "Trận Chương Dương", "Trận Hàm Tử", "Trận Đồ Bàn"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Lý được gọi là 'vua Phật' vì sùng đạo Phật?",
        "answers":  JSON.stringify(["Lý Thái Tổ", "Lý Thái Tông", "Lý Nhân Tông", "Lý Thần Tông"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lê sơ ban hành chính sách gì để kiểm soát dân số và đất đai?",
        "answers":  JSON.stringify(["Hộ tịch", "Điền địa", "Quân điền", "Thái ấp"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần mở rộng lãnh thổ đến đâu dưới thời Trần Nhân Tông?",
        "answers":  JSON.stringify(["Champa", "Chân Lạp", "Lào", "Đại Lý"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lê Lợi phong Nguyễn Trãi làm chức vụ gì sau chiến thắng Lam Sơn?",
        "answers":  JSON.stringify(["Tể tướng", "Hàn lâm học sĩ", "Thượng thư", "Ngự sử"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn được thành lập vào năm nào sau khi Nguyễn Ánh đánh bại Tây Sơn?",
        "answers":  JSON.stringify(["1788", "1802", "1820", "1858"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua đầu tiên của triều Nguyễn?",
        "answers":  JSON.stringify(["Gia Long", "Minh Mạng", "Thiệu Trị", "Tự Đức"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn đặt kinh đô ở đâu?",
        "answers":  JSON.stringify(["Thăng Long", "Phú Xuân", "Sài Gòn", "Hoa Lư"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Gia Long ban hành bộ luật nào để quản lý đất nước?",
        "answers":  JSON.stringify(["Luật Hồng Đức", "Luật Gia Long", "Luật Thiên Nam", "Luật Đại Việt"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Nguyễn nổi tiếng với chính sách đóng cửa, cấm đạo Thiên Chúa?",
        "answers":  JSON.stringify(["Gia Long", "Minh Mạng", "Thiệu Trị", "Tự Đức"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn thống nhất đất nước sau bao nhiêu năm phân liệt?",
        "answers":  JSON.stringify(["100 năm", "200 năm", "300 năm", "400 năm"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Minh Mạng thực hiện cải cách hành chính gì để tăng cường kiểm soát đất nước?",
        "answers":  JSON.stringify(["Chia tỉnh, huyện", "Thành lập quân đội", "Xây kinh thành", "Khuyến khích thương mại"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn xây dựng kinh thành Huế vào năm nào?",
        "answers":  JSON.stringify(["1802", "1805", "1830", "1858"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Nguyễn lên ngôi khi còn rất nhỏ, dẫn đến quyền lực rơi vào tay quan đại thần?",
        "answers":  JSON.stringify(["Minh Mạng", "Thiệu Trị", "Tự Đức", "Dục Đức"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao nhà Nguyễn suy yếu vào giữa thế kỷ XIX?",
        "answers":  JSON.stringify(["Chính sách đóng cửa", "Pháp xâm lược", "Nội bộ tranh quyền", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn ký hiệp ước nào với Pháp năm 1862, nhượng ba tỉnh miền Đông Nam Kỳ?",
        "answers":  JSON.stringify(["Hiệp ước Nhâm Tuất", "Hiệp ước Giáp Tuất", "Hiệp ước Patenôtre", "Hiệp ước Huế"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà thơ nổi tiếng thời nhà Nguyễn với tác phẩm 'Truyện Kiều'?",
        "answers":  JSON.stringify(["Nguyễn Du", "Hồ Xuân Hương", "Bà Huyện Thanh Quan", "Nguyễn Đình Chiểu"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn tổ chức kỳ thi khoa cử cuối cùng vào năm nào trước khi Pháp xâm lược?",
        "answers":  JSON.stringify(["1832", "1858", "1878", "1896"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Nguyễn ban hành chính sách 'cấm biển' để hạn chế giao thương với phương Tây?",
        "answers":  JSON.stringify(["Gia Long", "Minh Mạng", "Thiệu Trị", "Tự Đức"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn xây dựng lăng tẩm nào nổi tiếng với kiến trúc độc đáo cho vua Tự Đức?",
        "answers":  JSON.stringify(["Lăng Tự Đức", "Lăng Gia Long", "Lăng Minh Mạng", "Lăng Thiệu Trị"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chính sách 'khuyến nông' của Minh Mạng nhằm mục đích gì?",
        "answers":  JSON.stringify(["Tăng sản xuất nông nghiệp", "Phát triển thương mại", "Xây dựng quân đội", "Khuyến khích khoa cử"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà văn hóa thời nhà Nguyễn viết 'Lục tỉnh tân văn' để phê phán xã hội?",
        "answers":  JSON.stringify(["Nguyễn Đình Chiểu", "Nguyễn Du", "Phan Bội Châu", "Tôn Thọ Tường"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn mất ba tỉnh miền Tây Nam Kỳ vào tay Pháp vào năm nào?",
        "answers":  JSON.stringify(["1862", "1867", "1874", "1883"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao Gia Long dựa vào sự hỗ trợ của Pháp để đánh bại Tây Sơn?",
        "answers":  JSON.stringify(["Thiếu lực lượng", "Cần vũ khí hiện đại", "Muốn liên minh với phương Tây", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Nguyễn thành lập cơ quan nào để quản lý lịch sử và văn hóa?",
        "answers":  JSON.stringify(["Quốc sử quán", "Hàn lâm viện", "Ngự sử đài", "Thượng thư tỉnh"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là chúa Nguyễn cuối cùng trước khi nhà Tây Sơn nổi dậy?",
        "answers":  JSON.stringify(["Nguyễn Phúc Ánh", "Nguyễn Phúc Thuần", "Nguyễn Phúc Dương", "Nguyễn Phúc Khoát"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nguyễn Huệ tiến quân ra Bắc đánh quân Thanh vào năm nào?",
        "answers":  JSON.stringify(["1771", "1788", "1792", "1802"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị tướng Tây Sơn chỉ huy trận Rạch Gầm-Xoài Mút năm 1785?",
        "answers":  JSON.stringify(["Nguyễn Nhạc", "Nguyễn Huệ", "Nguyễn Lữ", "Trần Quang Diệu"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn xây dựng thành lũy nào làm căn cứ chính ở Phú Xuân?",
        "answers":  JSON.stringify(["Thành Hoa Lư", "Thành Hoàng Đế", "Thành Thăng Long", "Thành Cổ Loa"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao khởi nghĩa Tây Sơn được sự ủng hộ của nông dân?",
        "answers":  JSON.stringify(["Chống áp bức phong kiến", "Giảm thuế", "Chia ruộng đất", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà thơ nữ thời Tây Sơn nổi tiếng với bài thơ 'Tự tình'?",
        "answers":  JSON.stringify(["Hồ Xuân Hương", "Đoàn Thị Điểm", "Bà Huyện Thanh Quan", "Bùi Thị Xuân"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nguyễn Ánh nhận được sự hỗ trợ từ nước nào để đánh bại Tây Sơn?",
        "answers":  JSON.stringify(["Pháp", "Anh", "Tây Ban Nha", "Hà Lan"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn thất bại trong trận đánh nào trước Nguyễn Ánh năm 1801?",
        "answers":  JSON.stringify(["Trận Quy Nhơn", "Trận Phú Xuân", "Trận Thăng Long", "Trận Gia Định"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị tướng Tây Sơn hy sinh trong trận Quy Nhơn năm 1801?",
        "answers":  JSON.stringify(["Trần Quang Diệu", "Nguyễn Huệ", "Nguyễn Nhạc", "Bùi Thị Xuân"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Tây Sơn khuyến khích sử dụng chữ gì trong giáo dục?",
        "answers":  JSON.stringify(["Chữ Hán", "Chữ Nôm", "Chữ Quốc ngữ", "Chữ Phạn"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Trong thời Trịnh-Nguyễn, ai là chúa Trịnh đánh bại quân Mạc ở Thăng Long năm 1592?",
        "answers":  JSON.stringify(["Trịnh Tùng", "Trịnh Kiểm", "Trịnh Sâm", "Trịnh Cương"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chúa Nguyễn Phúc Nguyên từ chối nộp cống cho triều Lê vào năm nào?",
        "answers":  JSON.stringify(["1558", "1627", "1672", "1744"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà sử học thời Trịnh-Nguyễn viết 'Phủ biên tạp lục' về Đàng Trong?",
        "answers":  JSON.stringify(["Lê Quý Đôn", "Ngô Thì Sĩ", "Nguyễn Cư Trinh", "Nguyễn Bỉnh Khiêm"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời Trịnh-Nguyễn, cảng Hội An thuộc quyền kiểm soát của ai?",
        "answers":  JSON.stringify(["Chúa Trịnh", "Chúa Nguyễn", "Nhà Mạc", "Nhà Tây Sơn"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao Đàng Ngoài suy yếu hơn Đàng Trong vào thế kỷ XVIII?",
        "answers":  JSON.stringify(["Nội chiến liên miên", "Thiếu thương mại quốc tế", "Khởi nghĩa nông dân", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là chúa Trịnh bị lật đổ năm 1786 bởi quân Tây Sơn?",
        "answers":  JSON.stringify(["Trịnh Sâm", "Trịnh Khải", "Trịnh Cương", "Trịnh Giang"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trịnh tổ chức chế độ quân sự nào để kiểm soát Đàng Ngoài?",
        "answers":  JSON.stringify(["Ngũ phủ", "Thái ấp", "Đồn điền", "Công điền"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chúa Nguyễn Phúc Ánh xây dựng thành Gia Định vào năm nào?",
        "answers":  JSON.stringify(["1771", "1788", "1802", "1820"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà thơ thời Trịnh-Nguyễn nổi tiếng với bài 'Qua đèo Ngang'?",
        "answers":  JSON.stringify(["Bà Huyện Thanh Quan", "Hồ Xuân Hương", "Đoàn Thị Điểm", "Nguyễn Du"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời Trịnh-Nguyễn, ai là vị vua Lê nổi tiếng với thời kỳ thịnh trị ngắn ngủi?",
        "answers":  JSON.stringify(["Lê Chiêu Thống", "Lê Hiển Tông", "Lê Dụ Tông", "Lê Thánh Tông"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý xây dựng chùa nào nổi tiếng với kiến trúc độc đáo ở thế kỷ XI?",
        "answers":  JSON.stringify(["Chùa Một Cột", "Chùa Bái Đính", "Chùa Thiên Mụ", "Chùa Hương"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Trần lãnh đạo kháng chiến chống Nguyên lần thứ nhất năm 1258?",
        "answers":  JSON.stringify(["Trần Thái Tông", "Trần Thánh Tông", "Trần Nhân Tông", "Trần Hưng Đạo"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần tổ chức lực lượng quân đội nào để chống quân Nguyên-Mông?",
        "answers":  JSON.stringify(["Cấm quân", "Thân vệ", "Ngự lâm quân", "Quân dân đinh"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là tác giả 'Bình Ngô đại cáo' thời Lê sơ?",
        "answers":  JSON.stringify(["Nguyễn Trãi", "Lê Lợi", "Ngô Sĩ Liên", "Trần Nguyên Hãn"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý khuyến khích tôn giáo nào trong thời kỳ trị vì?",
        "answers":  JSON.stringify(["Nho giáo", "Phật giáo", "Đạo giáo", "Thiên Chúa giáo"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Lê Thánh Tông mở rộng lãnh thổ đến đâu vào thế kỷ XV?",
        "answers":  JSON.stringify(["Champa", "Chân Lạp", "Lào", "Đại Lý"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần xây dựng hệ thống kho lẫm nào để dự trữ lương thực?",
        "answers":  JSON.stringify(["Thường bình", "Nghĩa thương", "Quân điền", "Công điền"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Hồ ban hành chính sách hạn điền để kiểm soát đất đai?",
        "answers":  JSON.stringify(["Hồ Quý Ly", "Hồ Hán Thương", "Hồ Nguyên Trừng", "Hồ Xuân Hương"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lê sơ tổ chức kỳ thi khoa cử bao nhiêu năm một lần?",
        "answers":  JSON.stringify(["3 năm", "5 năm", "7 năm", "10 năm"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà sử học thời Lê sơ viết 'Đại Việt sử ký toàn thư'?",
        "answers":  JSON.stringify(["Ngô Sĩ Liên", "Nguyễn Trãi", "Lê Quý Đôn", "Phan Phu Tiên"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Hồ xây dựng thành nào làm kinh đô vào đầu thế kỷ XV?",
        "answers":  JSON.stringify(["Thành Tây Đô", "Thành Thăng Long", "Thành Hoa Lư", "Thành Phú Xuân"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao nhà Hồ thất bại trước quân Minh năm 1407?",
        "answers":  JSON.stringify(["Thiếu sự ủng hộ của dân", "Quân đội yếu", "Nội bộ chia rẽ", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần đánh bại quân Chiêm Thành dưới thời ai vào năm 1377?",
        "answers":  JSON.stringify(["Trần Nhân Tông", "Trần Anh Tông", "Trần Duệ Tông", "Trần Nghệ Tông"]),
        "correct": 2,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lý tổ chức chế độ gì để phân chia đất đai cho quý tộc?",
        "answers":  JSON.stringify(["Thái ấp", "Công điền", "Tư điền", "Đồn điền"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị vua nhà Lê sơ nổi tiếng với thời kỳ thịnh trị 'Hồng Đức'?",
        "answers":  JSON.stringify(["Lê Lợi", "Lê Thái Tông", "Lê Thánh Tông", "Lê Nhân Tông"]),
        "correct": 2,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần khuyến khích phát triển ngành nghề nào ngoài nông nghiệp?",
        "answers":  JSON.stringify(["Thương mại", "Thủ công nghiệp", "Khai khoáng", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là vị tướng nhà Lý chỉ huy trận Như Nguyệt năm 1077?",
        "answers":  JSON.stringify(["Lý Thường Kiệt", "Lý Công Uẩn", "Lý Thái Tông", "Lý Nhật Tôn"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Lê sơ ban hành chính sách gì để kiểm soát quân đội?",
        "answers":  JSON.stringify(["Ngũ phủ", "Điền binh", "Cấm quân", "Hộ tịch"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Hồ ban hành tiền giấy đầu tiên vào năm nào?",
        "answers":  JSON.stringify(["1400", "1403", "1407", "1418"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Nhà Trần tổ chức hội nghị nào để bàn kế hoạch chống quân Nguyên lần thứ hai?",
        "answers":  JSON.stringify(["Hội nghị Diên Hồng", "Hội nghị Bình Than", "Hội nghị Vạn Kiếp", "Hội nghị Thiên Trường"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Văn Miếu Quốc Tử Giám được thành lập dưới triều đại nào?",
        "answers":  JSON.stringify(["Nhà Lý", "Nhà Trần", "Nhà Hồ", "Nhà Lê sơ"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà thơ thời phong kiến nổi tiếng với bài 'Bánh trôi nước'?",
        "answers":  JSON.stringify(["Hồ Xuân Hương", "Nguyễn Du", "Đoàn Thị Điểm", "Bà Huyện Thanh Quan"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chế độ khoa cử thời phong kiến nhằm mục đích gì?",
        "answers":  JSON.stringify(["Tuyển chọn quan lại", "Phát triển giáo dục", "Khuyến khích Nho giáo", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Tôn giáo nào chiếm ưu thế trong đời sống tinh thần thời Lý-Trần?",
        "answers":  JSON.stringify(["Nho giáo", "Phật giáo", "Đạo giáo", "Thiên Chúa giáo"]),
        "correct": 1,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời phong kiến, tầng lớp nào đứng đầu xã hội?",
        "answers":  JSON.stringify(["Sĩ", "Nông", "Công", "Thương"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Cảng Hội An phát triển mạnh vào thời kỳ nào?",
        "answers":  JSON.stringify(["Nhà Lý", "Nhà Trần", "Trịnh-Nguyễn", "Nhà Nguyễn"]),
        "correct": 2,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Ai là nhà sử học thời phong kiến viết 'Việt sử tiêu án'?",
        "answers":  JSON.stringify(["Ngô Thì Sĩ", "Lê Quý Đôn", "Ngô Sĩ Liên", "Phan Phu Tiên"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời phong kiến, kỳ thi Hương được tổ chức ở đâu?",
        "answers":  JSON.stringify(["Kinh đô", "Các tỉnh", "Cả nước", "Quốc Tử Giám"]),
        "correct": 1,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Vì sao Nho giáo trở thành tư tưởng chính thống thời Lê sơ?",
        "answers":  JSON.stringify(["Khuyến khích khoa cử", "Củng cố quyền lực vua", "Phù hợp quản lý xã hội", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời phong kiến, nghề nào phát triển mạnh ở các làng quê?",
        "answers":  JSON.stringify(["Dệt", "Gốm sứ", "Làm giấy", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Kiến trúc lăng tẩm thời Nguyễn chịu ảnh hưởng từ phong cách nào?",
        "answers":  JSON.stringify(["Trung Quốc", "Pháp", "Champa", "Nhật Bản"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời phong kiến, ai là người phụ nữ có vai trò lớn trong triều đình nhà Lý?",
        "answers":  JSON.stringify(["Ỷ Lan", "Bùi Thị Xuân", "Hồ Xuân Hương", "Nguyễn Thị Anh"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Chợ Đô thịnh vượng nhất thời phong kiến nằm ở đâu?",
        "answers":  JSON.stringify(["Thăng Long", "Phú Xuân", "Gia Định", "Hội An"]),
        "correct": 0,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời phong kiến, ai đứng đầu hệ thống quan lại ở các tỉnh?",
        "answers":  JSON.stringify(["Tổng đốc", "Tuần phủ", "Bố chánh", "Án sát"]),
        "correct": 0,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Văn học chữ Nôm phát triển mạnh vào thời kỳ nào?",
        "answers":  JSON.stringify(["Nhà Lý", "Nhà Trần", "Nhà Lê sơ", "Trịnh-Nguyễn"]),
        "correct": 3,
        "difficulty": "medium",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    },
    {
        "question": "Thời phong kiến, hệ thống đê điều được xây dựng chủ yếu để làm gì?",
        "answers":  JSON.stringify(["Phòng lũ", "Tưới tiêu", "Giao thông", "Tất cả đều đúng"]),
        "correct": 3,
        "difficulty": "easy",
        "topic": "Thời kỳ Đại Việt",
        "topic_id": "75eb04ad-97b2-43dc-aa98-b45658a82484"
    }
];

async function importQuestions() {
    try {
        const { data, error } = await supabase
            .from('questions')
            .insert(questions)
            .select();

        if (error) {
            console.error('Error importing questions:', error);
            return;
        }

        console.log('Successfully imported questions:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

importQuestions(); 