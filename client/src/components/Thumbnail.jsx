import React from 'react';
import { Link } from 'react-router-dom';

const Thumbnail = ({ movie }) => {
    if (!movie || !movie.poster_path || movie.poster_path.includes('placeholder-image-url.jpg')) {
        return null; // Don't render anything if there's no movie details or no valid poster
    }

    const handleAddToList = () => {
        const userId = localStorage.getItem('userId');
        const movieId = movie.id;
        console.log(userId);    
        console.log(movieId);
        fetch('/list/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, movieId })
        });
    };

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <Link to={`/title/${movie.id}`} className="thumb">
            <div className="thumb__image">
                <img src={posterUrl} alt={movie.title} />
                <div className="thumb-info">
                    <h5 className="mb-4 mt-0">{movie.title}</h5>
                    <p>{movie.overview}</p>
                </div>
                <button className='btn btn-danger' onClick={handleAddToList}>Add to List</button>
            </div>
        </Link>
    );
}

export default Thumbnail;
