import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Thumbnail from './Thumbnail';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const searchMovies = async () => {
            const query = new URLSearchParams(location.search).get('query');
            if (query) {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
                    const data = await response.json();
                    
                    // Filter and validate results
                    const validResults = await Promise.all(
                        data.results
                            .filter(item => item.id && item.media_type === 'movie')
                            .map(async (item) => {
                                const movieDetails = await fetchValidMovie(item.id);
                                return movieDetails ? { ...item, ...movieDetails } : null;
                            })
                    );
                    
                    setResults(validResults.filter(Boolean));
                } catch (error) {
                    console.error('Error searching movies:', error);
                }
            }
            setLoading(false);
        };

        searchMovies();
    }, [location.search]);

    const fetchValidMovie = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            const movieDetails = await response.json();
            if (movieDetails.poster_path && !movieDetails.poster_path.includes('placeholder-image-url.jpg')) {
                return movieDetails;
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
        return null;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <div className="results-grid">
                {results.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="result-item"
                        style={{ 
                            height: 'auto', 
                            width: 'auto',
                            overflow: 'hidden'
                        }}
                    >
                        <Thumbnail movie={movie} />
                    </div>
                ))}
            </div>
            {results.length === 0 && <p>No results found.</p>}
        </div>
    );
};

export default SearchResults;
