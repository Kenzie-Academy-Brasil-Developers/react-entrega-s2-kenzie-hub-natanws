import { Redirect } from "react-router";
import { Container, Bianca, DashboardContainer } from "./styles";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { api } from "../../services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home({ auth, setAuth }) {
  const [techs, setTechs] = useState([]);

  const history = useHistory();

  const logOff = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAuth(false);
    history.push("/login");
  };

  const { register, handleSubmit } = useForm();

  const loadTech = () => {
    api
      .get(`/user/${localStorage.getItem("@KenzieHub:id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@KenzieHub:token")}`,
        },
      })
      .then((response) => {
        const apiTechs = response.data.data.map((tech) => ({
          ...tech,
          createdAt: new Date(tech.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTechs(apiTechs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTech();
  }, []);

  const SubmitTech = (data) => {
    if (!data.tech && !data.status) {
      return toast.error(
        "Preencha os campos para adicionar uma nova tecnologia"
      );
    }
    api
      .post(
        "/users/techs",
        {
          description: data.title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@KenzieHub:token")}`,
          },
        }
      )
      .then((response) => loadTech());
  };

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Bianca>
        <button onClick={logOff}>Logout</button>
      </Bianca>
      <DashboardContainer>
        <div>
          <form onSubmit={handleSubmit(SubmitTech)}>
            <input
              placeholder="Tecnologia"
              type="text"
              {...register("title")}
            />
            <input placeholder="Nível" type="text" {...register("status")} />
            <button type="submit"></button>
          </form>
        </div>
        <div>
          {techs.map((tech) => {
            <div key={tech.id}>
              <span>{tech.title}</span>
              <span>{tech.status}</span>
            </div>;
          })}
        </div>
      </DashboardContainer>
    </Container>
  );
}
