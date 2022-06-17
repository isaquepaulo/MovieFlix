import { Link } from "react-router-dom";
import "./styles.css";

const PageFilme = () => {
  return (
    <div className="pageMovie-container">
      <h1>Tela listagem de filmes</h1>
      <ul>
        <Link to="/movies/1">
          <li>Acessar /movies/1</li>
        </Link>
        <Link to="/movies/2">
          <li>Acessar /movies/2</li>
        </Link>
      </ul>
    </div>
  );
};

export default PageFilme;
