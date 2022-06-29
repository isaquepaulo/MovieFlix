import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};
 
const MovieCard = ({ movie }: Props) => {
  return (
    <div className="base-card MovieCard">
      <div className="MovieCard-image-container">
        <img className="img-fluid" src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="MovieCard-text-Container">
        <h1>{movie.title}</h1>
        <h3>{movie.year}</h3>
        <p>{movie.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;
