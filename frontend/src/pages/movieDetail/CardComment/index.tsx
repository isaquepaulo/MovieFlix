import "./styles.css";
import Estrela from "assets/imgs/Estrela.png";
import { Review } from "types/review";


type Props = {
  reviews: Review[];
};

const CardComment = ({ reviews }: Props) => {
  return (
    <div className="comentss-container">
      {reviews?.map((review) => (
        <div key={review.id}>
          <div className="sub-container d-flex ">
            <div className="img-container d-flex justify-content-center">
              <img src={Estrela} />
            </div>
            <h2>{review.user.name}</h2>
          </div>
          <div className="coment">
            <p>{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComment;
