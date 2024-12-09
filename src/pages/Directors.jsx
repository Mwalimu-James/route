import { useEffect, useState } from "react";
import Card from "../components/ReusableCard";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader"; // Optional: For loading state
import ErrorMessage from "../components/ErrorMessage"; // Optional: For error handling

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDirectors(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Render content based on loading and error states
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Directors Page</h1>
        {directors.length > 0 ? (
          directors.map((director) => (
            <Card key={director.id} name={director.name} movies={director.movies} />
          ))
        ) : (
          <p>No directors found.</p>
        )}
      </main>
    </>
  );
}

export default Directors;
