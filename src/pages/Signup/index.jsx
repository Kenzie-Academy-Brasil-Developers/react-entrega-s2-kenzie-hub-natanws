import { Container, ImageContainer } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "../../assets/drawkit-grape-pack-illustration-1.svg";
import { Link } from "react-router-dom";
import { api } from "../../services";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";

export default function Signup({ auth }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo de 6 digitos"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório"),
    bio: yup.string(),
    contact: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
        "Número de telefone inválido"
      ),
    course_module: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const submitForm = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      bio: data.bio,
      contact: data.contact,
      course_module: data.course_module,
    };
    api
      .post("/users", newUser)
      .then((response) => {
        toast.success("Cadastro feito com sucesso!");
        return history.push("/login");
      })
      .catch((err) =>
        toast.error("Oops, algo deu errado. Tente utilizar outro E-mail.")
      );
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <ImageContainer>
        <img src={Image} alt="imagem" />
      </ImageContainer>
      <form onSubmit={handleSubmit(submitForm)}>
        <label>Sign-Up</label>
        <hr />
        {!!errors.name?.message && <span>{errors.name.message}</span>}
        <input placeholder="Nome" {...register("name")} />
        {!!errors.email?.message && <span>{errors.email.message}</span>}
        <input placeholder="E-mail" {...register("email")} />
        {!!errors.password?.message && <span>{errors.password.message}</span>}
        <input placeholder="Senha" type="password" {...register("password")} />
        {!!errors.passwordConfirm?.message && (
          <span>{errors.passwordConfirm.message}</span>
        )}
        <input
          placeholder="Confirme sua senha"
          type="password"
          {...register("passwordConfirm")}
        />
        {!!errors.bio?.message && <span>{errors.bio.message}</span>}
        <input placeholder="Sobre" {...register("bio")} />
        {!!errors.contact?.message && <span>{errors.contact.message}</span>}
        <input placeholder="(51) 987654321" {...register("contact")} />
        {!!errors.course_module?.message && (
          <span>{errors.course_module.message}</span>
        )}
        <input placeholder="Modulo do Curso" {...register("course_module")} />
        <button type="submit">Cadastrar</button>
        <hr />
        <span>
          Já possui uma conta? Clique <Link to="/login">aqui!</Link>
        </span>
      </form>
    </Container>
  );
}
