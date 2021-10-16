import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--blue);

  form {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--light-gray);

    label {
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: 700;
    }

    hr {
      width: 200px;
      margin-top: 30px;
      margin-bottom: 30px;
      background-color: var(--gray);
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
      margin-top: 10px;
      border: none;
      border-radius: 15px;
      padding: 5px 60px;
      color: var(--light-gray);
      background-color: var(--blue);
    }

    span {
      font-size: 0.8rem;
      color: var(--black);

      a {
        font-weight: 900;
        color: var(--blue);
        text-decoration: underline;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue);

  img {
    width: 60%;
  }
`;
