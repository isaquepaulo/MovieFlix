import { hasAnyRoles } from "utils/auth";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { requestBackend } from "utils/request";
import CardInput from "./CardInput";
import { Review } from "types/review";
import { useParams } from "react-router-dom";
import CardComment from "./CardComment";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

const MovieDetail = () => {
  const { movieId } = useParams<UrlParams>();
  console.log(movieId);

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
      <h1>Tela detalhes do filme id: {movieId}</h1>

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
