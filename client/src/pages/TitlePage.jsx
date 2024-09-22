import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SmallSliderRated from '../components/SmallSliderRated';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    return await response.json();
};

const TitlePage = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const { id } = useParams(); // Assuming you're using react-router and passing the movie ID in the URL

    useEffect(() => {
        fetchMovieDetails(id).then(setMovieDetails);
    }, [id]);

    if (!movieDetails) return <div>Loading...</div>;

    const posterUrl = movieDetails.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
        : 'placeholder-image-url.jpg';

    return (
        <div className="title-page">
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-3 title-img">
                        <div className="imgWrapper">
                            <img
                                className="d-block w-100"
                                src={posterUrl}
                                alt={movieDetails.title}
                            />
                        </div>
                    </div>
                    <div className='col-md-9 title-info pb-5'>
                        <h1 className="title mb-2">{movieDetails.title}</h1>
                        <span className='small-info opa mt-2'>
                            {movieDetails.release_date.split('-')[0]} | 
                            Maturity Rating: {movieDetails.adult ? 'Adult' : 'All'} | 
                            Runtime: {movieDetails.runtime} min | 
                            {movieDetails.genres.map(genre => genre.name).join(', ')}
                        </span>
                        <h5 className="description my-5">{movieDetails.overview}</h5>
                        <span className='opa'>Status: </span><span>{movieDetails.status}</span>
                        <br />
                        <span className='opa'>Original Language: </span>
                        <span>{movieDetails.spoken_languages[0]?.english_name || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <SmallSliderRated />
        </div>
    );
};

export default TitlePage;
