import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { Review } from "types/review";
import { requestBackend } from "utils/request";
import "./styles.css";

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const CardInput = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);
    console.log(formData);

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/reviews",
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue("text", "");
        onInsertReview(response.data);
        console.log("Sucesso ao Salvar", response);
      })
      .catch((error) => {
        console.log("Erro ao Salvar", error);
      });
  };

  return (
    <div className="base-card avaliation-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register("text", {
              required: "Campo obrigatorio",
            })}
            type="text"
            name="text"
            placeholder="Deixe sua Avaliação"
          />
          <div>{errors.text?.message}</div>
        </div>
        <div className="div-button d-block ">
          <div className="btn-container">
            <button className="btn btn-primary">
              <h6>Salvar Avaliação</h6>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardInput;
