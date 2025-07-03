// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import React from 'react';

const MovieCard = ({ movie }) => {
    const { id, poster_path, title, vote_average, release_date, original_language } = movie;

    return (
        <li className="movie-card">
            <Link to={`/movie/${id}`}>
                <div>
                    <img
                        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                        alt={title}
                    />
                    <div className="mt-4">
                        <h3>{title}</h3>
                        <div className="content">
                            <div className="rating">
                                <img src="star.svg" alt="Star Icon" />
                                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                            </div>
                            <span>•</span>
                            <p className="lang">{original_language}</p>
                            <span>•</span>
                            <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default MovieCard;
