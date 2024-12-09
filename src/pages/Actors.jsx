import { useEffect, useState } from "react";
import Card from "../components/ReusableCard";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader"; // Optional: For loading state
import ErrorMessage from "../components/ErrorMessage"; // Optional: For error handling

function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    fetch("http://localhost:4000/actors")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched actors:", data); // Debugging fetch
        setActors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching actors:", error); // Debugging error
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Render content based on loading and error states
  if (loading) return <p>Loading...</p>; // Simplify Loader for debugging
  if (error) return <p>Error: {error}</p>; // Simplify ErrorMessage for debugging

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Actors Page</h1>
        {actors.length > 0 ? (
          actors.map((actor, index) => (
            <Card key={index} name={actor.name} movies={actor.movies} />
          ))
        ) : (
          <p>No actors found.</p>
        )}
      </main>
    </>
  );
}

export default Actors;


