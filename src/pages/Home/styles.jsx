import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  background-color: var(--light-gray);
`;

export const Bianca = styled.div`
  background-color: var(--blue);
  width: 100%;
  padding: 15px 20px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-end;

  button {
    width: 80px;
    border: none;
    border-radius: 15px;
    padding: 3px 8px;
    text-align: center;
    color: var(--black);
    background-color: var(--light-gray);

    &:hover {
      color: var(--black);
      background-color: var(--medium-gray);
    }
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  p {
    text-align: center;
  }
`;

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
    }
    input {
      margin-bottom: 10px;
      border-radius: 6px;
      border: none;
      background-color: var(--medium-gray);
      color: var(--black);
      padding: 3px 10px;

      &::placeholder {
        color: var(--gray);
      }
    }
    button {
      height: 45px;
    }
  }
`;

export const Card = styled.div`
  width: 200px;
  border: 1px solid var(--black);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 10px 20px;

    h3 {
      color: var(--blue);
      font-size: 1.4rem;
    }

    p {
      text-align: justify;
      /* padding: 0 10px; */

      &::before {
        content: "Status: ";
        font-weight: 900;
      }
    }

    button {
      width: 100%;
      border: none;
      border-radius: 15px;
      padding: 5px 60px;
      color: var(--light-gray);
      background-color: var(--blue);
    }
  }
`;
