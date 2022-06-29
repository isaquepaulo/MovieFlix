import { hasAnyRoles } from "utils/auth";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { requestBackend } from "utils/request";
import CardInput from "./CardInput";
import { Review } from "types/review";
import { useParams } from "react-router-dom";
import CardComment from "./CardComment";
import "./styles.css";
import CardMovie from "./CardMovie";

type UrlParams = {
  movieId: string;
};

const MovieDetail = () => {
  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };
  return (
    <div className="MovieDetail-container ">
      <div className="mb-4 mt-4">
        <CardMovie movie={movie} />
      </div>

      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <CardInput movieId={`${movieId}`} onInsertReview={handleInsertReview} />
      )}

      <div className="coments-container ">
        <div className="base-card">
          <CardComment reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
