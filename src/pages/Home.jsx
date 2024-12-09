import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader"; // Optional: Loading state feedback
import ErrorMessage from "../components/ErrorMessage"; // Optional: Error feedback

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Render loading state
  if (loading) return <Loader />;
  // Render error state
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Home Page</h1>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} title={movie.title} id={movie.id} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </main>
    </>
  );
}

export default Home;
