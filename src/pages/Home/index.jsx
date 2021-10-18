import { Redirect } from "react-router";
import {
  Container,
  Bianca,
  DashboardContainer,
  Card,
  FormContainer,
} from "./styles";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { api } from "../../services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Home({ auth, setAuth, userId }) {
  const [techs, setTechs] = useState([]);
  const [token] = useState(localStorage.getItem("@KenzieHub:token") || "");
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
      .get("/users/" + userId, {
        headers: {
          Authorization: `Bearer {token}`,
        },
      })
      .then((response) => {
        console.log(response);
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
  }, []);

  const SubmitTech = (data) => {
    console.log(data);
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
      .then(
        (response) => console.log(response)
        // loadTech()
      )
      .catch((err) => console.log(err));
  };

  const removeTech = (id) => {
    const newTechs = techs.filter((tech) => console.log(tech));
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
        <Card>
          {techs &&
            techs.map((tech) => (
              <div key={tech.id}>
                <h3>{tech.title}</h3>
                <p>{tech.status}</p>
                <button onClick={() => removeTech(tech.id)}>Remove</button>
              </div>
            ))}
        </Card>
      </DashboardContainer>
    </Container>
  );
}
