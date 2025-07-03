// src/components/MovieDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`,
                API_OPTIONS
            );
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    if (!movie) return <p>Loading movie details...</p>;

    const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer');

    return (
        <div className="min-h-screen bg-[#0f0f23] text-white flex items-center justify-center px-4 py-10">
            <div className="max-w-6xl w-full bg-[#13132a] rounded-3xl p-10 shadow-2xl">
                <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                <p className="text-sm text-gray-400 mb-6">
                    {movie.release_date?.split('-')[0]} · PG-13 · 2h 46m
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-xl object-cover w-full"
                    />

                    <div>
                        {trailer && (
                            <div className="mb-4 relative rounded-xl overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="240"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="Trailer"
                                    className="rounded-xl"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres.map((g) => (
                                <span key={g.id} className="bg-[#272748] text-sm px-3 py-1 rounded-full">
                  {g.name}
                </span>
                            ))}
                        </div>

                        <p className="text-sm mb-6 text-gray-300">{movie.overview}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                            <p><strong className="text-white">Release date:</strong> {movie.release_date}</p>
                            <p><strong className="text-white">Status:</strong> {movie.status}</p>
                            <p><strong className="text-white">Language:</strong> {movie.spoken_languages.map(l => l.name).join(', ')}</p>
                            <p><strong className="text-white">Budget:</strong> ${movie.budget.toLocaleString()}</p>
                            <p><strong className="text-white">Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
                            <p><strong className="text-white">Tagline:</strong> {movie.tagline}</p>
                            <p><strong className="text-white">Production:</strong> {movie.production_companies.map(c => c.name).join(', ')}</p>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2 rounded-full transition"
                            >
                                ⬅ Back
                            </button>
                            {movie.homepage && (
                                <a
                                    href={movie.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-full transition"
                                >
                                    Visit Homepage →
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
