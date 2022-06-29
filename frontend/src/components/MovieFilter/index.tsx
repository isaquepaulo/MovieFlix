import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Genre } from "types/genre";
import { BASE_URL, requestBackend } from "utils/request";
import "./styles.css";

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue("genre", value);

    const obj: MovieFilterData = {
      genre: getValues("genre"),
    };
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: `${BASE_URL}/genres`, withCredentials: true }).then(
      (response) => {
        setSelectGenre(response.data);
      }
    );
  }, []);

  return (
    <div className="base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter">
        <div className="movie-filter-genre-container">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenre}
                isClearable
                placeholder="Genero"
                classNamePrefix="movie-filter-select"
                onChange={(value) => handleChangeGenre(value as Genre)}
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => String(genre.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
