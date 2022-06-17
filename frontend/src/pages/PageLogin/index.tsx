import { ReactComponent as Desenho } from "assets/imgs/Desenho.svg";

import CardLogin from "./CardLogin";

import "./styles.css";
const PageLogin = () => {
  return (
    <div className="d-md-flex justify-content-center">
      <div className="row">
        <div className="d-none d-xl-block col-4 ">
          <div className="text-main">
            <h1>Avalie Filmes</h1>
            <p>Diga o que você achou do seu filme favorito</p>
          </div>

          <div className="container-img">
            <Desenho />
          </div>
        </div>
        <div className="col-12 col-xl-6 offset-xl-2">
          <CardLogin />
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
