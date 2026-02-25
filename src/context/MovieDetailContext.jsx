import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

const MovieContext = createContext();

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleVideoTrailer = async (movieId) => {
    // 1. DANH SÁCH TRAILER THỦ CÔNG (Dự phòng cho phim thiếu trên API)
    const customTrailers = {
      219665: "1ffrNyxBPfs", // ID phim và mã trailer YouTube của "Nghe nói em thích tôi"
    };

    // 2. KIỂM TRA PHIM CÓ TRONG DANH SÁCH THỦ CÔNG KHÔNG
    if (customTrailers[movieId]) {
      setTrailerUrl(customTrailers[movieId]);
      setIsOpen(true);
      return; // Có rồi thì mở luôn, không cần gọi API phía dưới nữa
    }

    // 3. NẾU KHÔNG CÓ THÌ GỌI API NHƯ BÌNH THƯỜNG
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );

      const data = await response.json();
      if(data && data.results && data.results.length > 0) {
          setTrailerUrl(data.results[0]?.key);
          setIsOpen(true);
      }else{
        alert("Rất tiếc, bộ phim này hiện chưa có trailer!");
      }      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center mt-5">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };