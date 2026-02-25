import { useEffect } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";
import Footer from "./components/Footer";
function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    
    if (value === "") return setSearchData([]);
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      // Bước lọc kết quả: Ép kiểu về chữ thường nhưng VẪN giữ nguyên dấu
      const searchTermLower = value.toLowerCase();
      
      const exactMatches = data.results.filter((movie) => {
        // Phòng trường hợp movie.title bị undefined
        const titleLower = movie.title ? movie.title.toLowerCase() : "";
        const originalTitleLower = movie.original_title ? movie.original_title.toLowerCase() : "";
        
        // Trả về true nếu title hoặc original_title chứa chính xác từ khóa có dấu
        return titleLower.includes(searchTermLower) || originalTitleLower.includes(searchTermLower);
      });

      // Cập nhật state bằng danh sách phim đã được lọc chính xác
      setSearchData(exactMatches);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
        // Add more URLs here...
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchMovies = async (url) => {
        return await fetch(url, options).then((response) => response.json());
      };

      try {
        const response = await Promise.all(urls.map(fetchMovies));

        setTrendingMovies(response[0].results);
        setTopRatedMovies(response[1].results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleClearSearch = () => {
    setSearchData([]);
  };
  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} onClearSearch={handleClearSearch} />
          <Banner />
          {searchData.length === 0 && (
            <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          )}

          {searchData.length > 0 && <MovieSearch data={searchData} />}
        </div>
      </MovieProvider>
      <Footer />
    </>
  );
}

export default App;