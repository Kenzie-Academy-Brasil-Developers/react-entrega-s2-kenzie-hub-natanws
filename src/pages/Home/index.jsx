import { Redirect } from "react-router";
import {
  Container,
  Bianca,
  DashboardContainer,
  Card,
  FormContainer,
  TechCards,
} from "./styles";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { api } from "../../services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home({ auth, setAuth }) {
  const [techs, setTechs] = useState([]);
  const [token] = useState(localStorage.getItem("@KenzieHub:token")) || "";
  const [userId] = useState(localStorage.getItem("@KenzieHub:id")) || "";
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("@KenzieHub:token"),
    },
  };
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
      .get(`/users/${userId}`)
      .then((response) => {
        const apiTechs = response.data.techs.map((tech) => ({
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
  });

  const SubmitTech = (data) => {
    if (!data.tech && !data.status) {
      return toast.error(
        "Preencha os campos para adicionar uma nova tecnologia"
      );
    }
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      // .then((_) => loadTech())
      .catch((err) => console.log(err));
  };

  const removeTech = (id) => {
    const newTechs = techs.filter((tech) => tech.id !== id);
    setTechs(newTechs);

    api.delete(`/users/techs/${id}`, config);
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
        <FormContainer>
          <form onSubmit={handleSubmit(SubmitTech)}>
            <div>
              <input
                placeholder="Tecnologia"
                type="text"
                {...register("title")}
              />
              <input placeholder="Nível" type="text" {...register("status")} />
            </div>
            <button type="submit">Adicionar</button>
          </form>
        </FormContainer>
        <TechCards>
          {techs &&
            techs.map((tech) => (
              <Card key={tech.id}>
                <div key={tech.id}>
                  <h3>{tech.title}</h3>
                  <p>{tech.status}</p>
                  <button onClick={() => removeTech(tech.id)}>Remove</button>
                </div>
              </Card>
            ))}
        </TechCards>
      </DashboardContainer>
    </Container>
  );
}
