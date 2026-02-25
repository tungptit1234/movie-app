import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieDetailContext";
import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  // Lấy hàm xử lý trailer từ Context
  const { handleVideoTrailer } = useContext(MovieContext);
  
  // Thêm state để quản lý việc mở rộng/thu gọn nội dung
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:h-[600px] h-[1000px] w-full bg-banner bg-cover bg-center bg-no-repeat relative mt-[75px]">
      <div className="w-full h-full bg-black/40 " />
      <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full ">
        <div className="md:w-[50%] w-full ">
          <div className="flex flex-col space-y-6 items-start p-10">
            <p className="bg-gradient-to-r from-red-600 to-red-300 py-2 px-6">
              TV Show
            </p>
            <div className="flex flex-col space-y-4">
              <h1 className="text-[40px] font-bold text-white ">
                Nghe nói em thích tôi
              </h1>
              <div className="flex items-center space-x-3">
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRatingHalf} alt="rating" className="w-8 h-8" />
              </div>
              
              {/* Áp dụng line-clamp-4 nếu chưa mở rộng */}
              <p className={`text-white transition-all duration-300 ease-in-out ${!isExpanded ? 'line-clamp-4' : ''}`}>
                Nội dung của phim "Nghe nói em thích tôi" (Love Heals) là câu chuyện của cặp đôi Ninh Chí Khiêm và Nguyễn Lưu Tranh. Lưu Tranh là đàn em khóa trên của Chí Khiêm, cô đã thầm thương chàng trai từ rất lâu, nhưng bởi vì anh đã có người yêu cho nên Lưu Tranh chỉ đành chôn giấu tình cảm của mình. Đến một ngày, khi Ninh Chí Khiêm vừa mới chia tay với người yêu thì liền đến trước mặt Lưu Tranh và đề nghị kết hôn với cô bởi anh nghe nói rằng Nguyễn Lưu Tranh thích mình. Đứng trước lời đề nghị bất ngờ này, Lưu Tranh cũng gật đầu đồng ý mặc dù cô biết bản thân chỉ là người thay thế.
              </p>
            </div>

            <div className="flex items-center space-x-5">
              {/* Gắn sự kiện click để đổi trạng thái isExpanded */}
              <button 
                className="py-2 px-3 bg-black text-white border border-black font-bold w-24"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Thu gọn" : "Chi tiết"}
              </button>
              
              {/* GẮN SỰ KIỆN CLICK VÀO NÚT XEM PHIM */}
              <button 
                className="py-2 px-3 bg-red-600 text-white font-bold"
                onClick={() => handleVideoTrailer(219665)}
              >
                Xem Phim
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group">
            {/* GẮN SỰ KIỆN CLICK VÀO BIỂU TƯỢNG NÚT PLAY */}
            <button 
              className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10"
              onClick={() => handleVideoTrailer(219665)}
            >
              <img src={IconPlay} alt="play" className="w-16 h-16" />
            </button>
            <img
              src={ImgMovie}
              alt="banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;