import React from "react";

const Footer = () => {
  return (
    // mt-20 để cách xa phần danh sách phim bên trên
    <footer className="bg-black text-gray-300 py-10 px-10 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PHẦN 1: VỀ CHÚNG TÔI (Gắn id="about" để link từ header trỏ xuống) */}
        <div id="about">
          <h3 className="text-red-600 text-2xl font-bold mb-4">MOVIE APP</h3>
          <p className="text-sm leading-relaxed text-justify">
            Chào mừng bạn đến với MOVIE APP - Nền tảng xem phim trực tuyến hàng đầu. 
            Chúng tôi tự hào cung cấp kho tàng điện ảnh khổng lồ với chất lượng HD sắc nét, 
            cập nhật Vietsub nhanh chóng nhất. Mang đến trải nghiệm giải trí đỉnh cao 
            ngay tại ngôi nhà của bạn!
          </p>
        </div>

        {/* PHẦN 2: LIÊN KẾT NHANH */}
        <div className="md:ml-10">
          <h3 className="text-white text-lg font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-red-600 transition-colors duration-300">Trang chủ</a>
            </li>
            <li>
              <a href="#about" className="hover:text-red-600 transition-colors duration-300">Về chúng tôi</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-red-600 transition-colors duration-300">Liên hệ</a>
            </li>
          </ul>
        </div>

        {/* PHẦN 3: LIÊN HỆ (Gắn id="contact") */}
        <div id="contact">
          <h3 className="text-white text-lg font-semibold mb-4">Thông tin liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-3">
              <span className="text-xl">📍</span>
              <span>Hà Nội, Việt Nam</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-xl">📞</span>
              <span>0123456789</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-xl">✉️</span>
              <span>support@movieapp.com</span>
            </li>
          </ul>
          
          {/* Nút Mạng xã hội */}
          <div className="flex space-x-4 mt-6">
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              f
            </button>
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              <span className="font-bold">X</span>
            </button>
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              in
            </button>
          </div>
        </div>
      </div>
      
      {/* Bản quyền */}
      <div className="text-center text-sm text-gray-500 mt-10 pt-5 border-t border-gray-800">
        © 2026 MOVIE APP. Đã đăng ký Bản quyền.
      </div>
    </footer>
  );
};

export default Footer;