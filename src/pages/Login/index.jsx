import { Container, ImageContainer } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "../../assets/drawkit-grape-pack-illustration-1.svg";
import { Link } from "react-router-dom";
import { api } from "../../services";
import { Redirect, useHistory } from "react-router";

export default function Login({ auth, setAuth }) {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo de 6 digitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const submitForm = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        localStorage.setItem(
          "@KenzieHub:token",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "@KenzieHub:id",
          JSON.stringify(response.data.user.id)
        );
        setAuth(true);
        return history.push("/");
      })
      .catch((err) => console.log(err));

    history.push("/");
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(submitForm)}>
        <label>Login</label>
        <hr />
        {!!errors.email?.message && <span>{errors.email.message}</span>}
        <input placeholder="E-mail" {...register("email")} />
        {!!errors.password?.message && <span>{errors.password.message}</span>}
        <input placeholder="Senha" type="password" {...register("password")} />
        <button type="submit">Login</button>
        <hr />
        <span>
          Não possui uma conta? Crie sua conta <Link to="/signup">aqui!</Link>
        </span>
      </form>
      <ImageContainer>
        <img src={Image} alt="Imagem de Login" />
      </ImageContainer>
    </Container>
  );
}
