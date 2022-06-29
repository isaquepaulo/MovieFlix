import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
import MovieFilter, { MovieFilterData } from "components/MovieFilter";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { BASE_URL, requestBackend } from "utils/request";
import { SpringPage } from "utils/vendor/spring";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterdata: MovieFilterData;
};

const PageFilme = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [ControlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterdata: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterdata: ControlComponentsData.filterdata,
    });
  };
  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({
      activePage: 0,
      filterdata: data,
    });
  };

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `${BASE_URL}/movies`,
      withCredentials: true,
      params: {
        page: ControlComponentsData.activePage,
        size: 4,
        genreId: ControlComponentsData.filterdata.genre?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [ControlComponentsData]);

  return (
    <div className="pageMovie-container">
      <div className="pagemovie-filter-containeer">
        <MovieFilter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div className="row">
        {page?.content.map((movie) => (
          <div
            key={movie.id} 
            className="MovieCard-div-container col-12 col-sm-6 col-lg-4 col-xl-3 mb-3 mr-1"
          >
            <Link to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination-div-container">
        <Pagination
          forcePage={page?.number}
          pageCount={page ? page.totalPages : 0}
          range={2}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PageFilme;
