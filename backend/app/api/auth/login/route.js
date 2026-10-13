import { NextResponse } from 'next/server';

// Dữ liệu mô phỏng bảng Users trong Database
const databaseMock = {
    users: [
        { id: 1, email: "hoanganh@example.com", name: "Trần Văn Hoàng Anh", is_active: true }
    ]
};

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, name, handle, bio } = body;

        // Kiểm tra xem email đã tồn tại trong DB chưa
        let user = databaseMock.users.find(u => u.email === email);
        
        if (!user) {
            // Nếu chưa có, tạo mới user (sau luồng onboarding)
            user = {
                id: databaseMock.users.length + 1,
                email: email || "user@example.com",
                name: name || "Trần Văn Hoàng Anh",
                handle: handle || "",
                bio: bio || "",
                is_active: true
            };
            databaseMock.users.push(user);
        }

        return NextResponse.json({
            success: true,
            message: "Xác thực và lưu thông tin người dùng thành công",
            token: "nextjs-mock-jwt-token-999",
            user: user
        });
    } catch (error) {
        return NextResponse.json({ error: "Lỗi xử lý dữ liệu từ client" }, { status: 500 });
    }
}