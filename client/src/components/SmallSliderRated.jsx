import { useEffect, useState, useRef } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Thumbnail from './Thumbnail';
import { Link } from 'react-router-dom';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const fetchValidMovie = async () => {
  let isValid = false;
  let movieDetails;
  while (!isValid) {
    const movieId = Math.floor(Math.random() * 1000000) + 1;
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
      movieDetails = await response.json();
      if (movieDetails.poster_path && !movieDetails.poster_path.includes('placeholder-image-url.jpg')) {
        isValid = true;
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }
  return movieDetails;
};

const SmallSliderRated = () => {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null);
  const loadingMore = useRef(false);

  const fetchMoreMovies = async () => {
    if (loadingMore.current) return;
    loadingMore.current = true;
    const newMovies = await Promise.all(Array(5).fill().map(() => fetchValidMovie()));
    setMovies(prevMovies => [...prevMovies, ...newMovies]);
    loadingMore.current = false;
  };

  useEffect(() => {
    fetchMoreMovies();

    // Initialize Swiper after component mounts
    swiperRef.current = new Swiper('.swiper', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
      lazy: {
        loadPrevNext: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
    });

    swiperRef.current.on('reachEnd', fetchMoreMovies);

    // Cleanup function to destroy Swiper instance
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [movies]);

  return (
    <div className="swiper mt-5">
      <h3 className='mb-3 mt-3'>Top Rated Shows</h3>
      <div className="swiper-wrapper">
        {movies
          .filter(movie => movie.poster_path && !movie.poster_path.includes('placeholder-image-url.jpg'))
          .map((movie, index) => (
            <div className="swiper-slide" key={index}>
              <Thumbnail movie={movie} />
            </div>
          ))
        }
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div>
    </div>
  );
}

export default SmallSliderRated;
