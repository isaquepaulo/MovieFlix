import { AuthContext } from "AuthContext";
import ButtonMain from "components/ButtonMain";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenData } from "utils/auth";
import { requestBackendLogin } from "utils/request";
import { saveAuthData } from "utils/storage";

import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const CardLogin = () => {
  const location = useLocation();

  const { from } = (location.state as LocationState) || {
    from: { pathname: "/movies" },
  };

  const { setAuthContextData } = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useNavigate();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });

        history(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log("ERRO", error);
      });
  };

  return (
    <div className="d-md-flex justify-content-center">
      <div className="base-card login-card">
        <h1 className="text-main">LOGIN</h1>
        {hasError && (
          <div className="alert alert-danger">
            Email ou senha estão incorretas
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("username", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="text"
              placeholder="Email"
              className={` ${errors.username ? "is-invalid" : ""}`}
              name="username"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>
          <div className="mb-2">
            <input
              {...register("password", {
                required: "Campo obrigatório",
              })}
              type="password"
              className={`${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              name="password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>
          <div className="div-button2">
            <ButtonMain text="Fazer Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardLogin;
