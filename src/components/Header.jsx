import PropTypes from "prop-types";
import { useState } from "react";

const Header = ({ onSearch, onClearSearch }) => {
  const [search, setSearch] = useState("");

  // Hàm xử lý khi nhấn phím
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  // Hàm gom chung logic khi muốn về Trang Chủ
  const handleGoHome = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi nhảy trang mặc định
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu
    setSearch(""); // Xóa chữ trong ô input
    if (onClearSearch) {
      onClearSearch(); // Gọi hàm xóa kết quả tìm kiếm ở App.jsx
    }
  };

  // Hàm xử lý trượt mượt mà đến các section khác
  const handleScroll = (e, id) => {
    e.preventDefault(); 
    
    if (id === 'top') {
      handleGoHome(e); // Tái sử dụng hàm handleGoHome
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="p-4 flex justify-between fixed top-0 left-0 w-full z-[9999] bg-black">
      <div className="flex items-center gap-8">
        {/* Thêm con trỏ chuột và sự kiện onClick vào Logo */}
        <h1 
          className="text-[30px] uppercase text-red-700 font-bold cursor-pointer"
          onClick={handleGoHome}
        >
          Movie
        </h1>
        <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-red-700 transition-colors duration-300 cursor-pointer" onClick={(e) => handleScroll(e, 'top')}>
            Trang chủ
          </a>
          <a href="#about" className="hover:text-red-700 transition-colors duration-300 cursor-pointer" onClick={(e) => handleScroll(e, 'about')}>
            Về chúng tôi 
          </a>
          <a href="#contact" className="hover:text-red-700 transition-colors duration-300 cursor-pointer" onClick={(e) => handleScroll(e, 'contact')}>
            Liên hệ
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-5">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 p-2 text-black outline-none focus:border-red-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button
          className="bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-800 transition duration-300"
          onClick={() => onSearch(search)}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

// Đừng quên khai báo PropTypes cho onClearSearch
Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired, 
};

export default Header;