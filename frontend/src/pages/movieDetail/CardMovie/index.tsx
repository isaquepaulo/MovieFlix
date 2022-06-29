import "./styles.css";
import { Movie } from "types/movie";

type Props = {
  movie: Movie[];
};

const CardMovie = ({ movie }: Props) => {
  const texto = JSON.stringify(movie);
  const teste = JSON.parse(texto);

  return (
    <div className="base-card card-movie-detail">
      <div className="row">
        <div className="col-12 col-xl-6 ">
          <div className="card-movie-picture">
            <img className="img-fluid" src={teste.imgUrl} alt="imagem" />
          </div>
        </div>
        <div className="col-12 col-xl-6 details-text">
          <h1>{teste.title}</h1>
          <h2>{teste.year}</h2>
          <h3>{teste.subTitle}</h3>
          <div className="coment">
            <p>{teste.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
