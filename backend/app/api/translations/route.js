import { NextResponse } from 'next/server';

// Dữ liệu mô phỏng từ Cơ sở dữ liệu (Database)
const databaseMock = {
    languages: [
        { id: 1, code: 'en', name: 'English', is_active: true },
        { id: 2, code: 'vi', name: 'Tiếng Việt', is_active: true }
    ],
    ui_translations: [
        // Tiếng Anh (en)
        { language_id: 1, key: "nav.home", value: "Home" },
        { language_id: 1, key: "nav.subscriptions", value: "Subscriptions" },
        { language_id: 1, key: "nav.chat", value: "Chat" },
        { language_id: 1, key: "nav.activity", value: "Activity" },
        { language_id: 1, key: "nav.explore", value: "Explore" },
        { language_id: 1, key: "nav.profile", value: "Profile" },
        { language_id: 1, key: "nav.create", value: "Create" },
        { language_id: 1, key: "banner.title", value: "Make money doing the work you believe in" },
        { language_id: 1, key: "auth.loginTitle", value: "Log in or sign up" },
        { language_id: 1, key: "auth.desc", value: "Join the most interesting and insightful discussions." },

        // Tiếng Việt (vi)
        { language_id: 2, key: "nav.home", value: "Trang chủ" },
        { language_id: 2, key: "nav.subscriptions", value: "Đăng ký" },
        { language_id: 2, key: "nav.chat", value: "Trò chuyện" },
        { language_id: 2, key: "nav.activity", value: "Hoạt động" },
        { language_id: 2, key: "nav.explore", value: "Khám phá" },
        { language_id: 2, key: "nav.profile", value: "Hồ sơ" },
        { language_id: 2, key: "nav.create", value: "Tạo bài viết" },
        { language_id: 2, key: "banner.title", value: "Kiếm tiền từ công việc bạn tin tưởng" },
        { language_id: 2, key: "auth.loginTitle", value: "Đăng nhập hoặc đăng ký" },
        { language_id: 2, key: "auth.desc", value: "Tham gia vào các cuộc thảo luận thú vị và sâu sắc nhất." }
    ]
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code') || 'en';

    // 1. Kiểm tra ngôn ngữ trong bảng languages
    const lang = databaseMock.languages.find(l => l.code === code && l.is_active);
    if (!lang) {
        return NextResponse.json({ error: "Ngôn ngữ không tồn tại" }, { status: 404 });
    }

    // 2. Truy vấn bộ từ điển từ bảng ui_translations theo language_id
    const translations = databaseMock.ui_translations.filter(t => t.language_id === lang.id);
    
    // 3. Đóng gói dạng key-value để trả về cho Frontend
    const result = {};
    translations.forEach(item => {
        result[item.key] = item.value;
    });

    return NextResponse.json(result);
}