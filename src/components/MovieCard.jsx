import { Link } from 'react-router-dom';

function MovieCard({ title, id }) {
  return (
    <article>
      <h2>{title}</h2>
      {/* The "to" prop uses a template literal for flexibility */}
      <Link to={`/movie/${id}`} aria-label={`View more info about ${title}`}>
        View Info
      </Link>
    </article>
  );
}

export default MovieCard;
