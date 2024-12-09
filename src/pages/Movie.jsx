import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader"; // Optional: For loading state
import ErrorMessage from "../components/ErrorMessage"; // Optional: For error handling

const Movie = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null); // Store movie data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Fetch movie details dynamically
    fetch(`http://localhost:4000/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Render loading state
  if (loading) return <Loader />;
  // Render error state
  if (error) return <ErrorMessage message={error} />;
  // Render fallback for missing movie
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div>
      <NavBar />
      <main style={{ padding: "2rem" }}>
        <h1>{movie.title}</h1>
        <p>Runtime: {movie.time}</p>
        <div>
          {movie.genres.map((genre, index) => (
            <span key={index} style={{ marginRight: "0.5rem" }}>
              {genre}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Movie;
