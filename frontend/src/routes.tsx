import Navbar from "components/Navbar";
import PageFilme from "pages/pageMovie";
import PageLogin from "pages/PageLogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetail from "pages/movieDetail";
import PrivateRoute from "components/PrivateRoute";

const Rota = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" caseSensitive={false} element={<PageLogin />} />
        <Route path="/" element={<PrivateRoute path={"/"} />}>
          <Route path="/movies" caseSensitive={false} element={<PageFilme />} />
          <Route
            path="/movies/:movieId"
            caseSensitive={false}
            element={<MovieDetail />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rota;
