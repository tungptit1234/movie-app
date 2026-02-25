import PropTypes from "prop-types";
import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

// 1. TẠO COMPONENT MŨI TÊN TRÁI TÙY CHỈNH
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-black/60 hover:bg-red-600 text-white rounded-full transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

// 2. TẠO COMPONENT MŨI TÊN PHẢI TÙY CHỈNH
const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-black/60 hover:bg-red-600 text-white rounded-full transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

const MovieList = ({ title, data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  return (
    // Bỏ px-10 ở div ngoài cùng để dồn không gian vào Carousel
    <div className="my-10 max-w-full">
      {/* Thêm px-10 vào thẻ h2 để tiêu đề vẫn thẳng hàng với danh sách phim */}
      <h2 className="text-xl uppercase mb-4 px-10">{title}</h2>
      
      <Carousel 
        responsive={responsive} 
        draggable={false}
        // Thêm khoảng trống 2 bên cho list phim, tạo chỗ đứng cho mũi tên
        containerClass="px-10" 
        // Thay thế mũi tên mặc định bằng Custom Arrow
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {data?.map((movie) => (
          <div
            key={movie.id}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
                movie.poster_path
              })`,
            }}
            onClick={() => handleVideoTrailer(movie.id)}
          >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase text-center text-white">
                {movie.name || movie.title || movie.original_title}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default MovieList;