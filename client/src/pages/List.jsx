import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';

const List = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies from your API or local storage
        const userId = localStorage.getItem('userId');
        console.log(userId);
        
        // This is a placeholder, replace with your actual fetch logic
        const fetchMovies = async (userId) => {
            // ... fetch logic here
            setMovies(fetchedMovies);
        };

        fetchMovies(userId);
    }, []);

    return (
        <div className="list-container">
            <h1>My List</h1>
            <div className="movie-grid">
                {movies
                    .filter(movie => movie.poster_path && !movie.poster_path.includes('placeholder-image-url.jpg'))
                    .map((movie) => (
                        <div className="movie-item" key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <Thumbnail movieId={movie.id} />
                                <p className="movie-title">{movie.title}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
            {movies.length === 0 && <p>No movies in your list yet.</p>}
        </div>
    );
}

export default List;