import { Container, ImageContainer } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Signup() {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 digitos")
      .required("Campo obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório"),
    bio: yup.string(),
    contact: yup
      .string()
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

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <ImageContainer>
        <img src="assets/drawkit-grape-pack-illustration-1.svg" alt="imagem" />
      </ImageContainer>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <input placeholder="Nome" {...register("name")} />
          <input placeholder="E-mail" {...register("email")} />
          <input placeholder="Senha" {...register("password")} />
          <input
            placeholder="Confirme sua senha"
            {...register("passwordConfirm")}
          />
          <input placeholder="Sobre" {...register("bio")} />
          <input placeholder="(51) 987654321" {...register("contact")} />
          <input placeholder="Modulo do Curso" {...register("course_module")} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </Container>
  );
}
