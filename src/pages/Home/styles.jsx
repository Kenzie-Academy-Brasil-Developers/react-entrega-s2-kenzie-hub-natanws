import styled from "styled-components";

export const Container = styled.div`
  width: 100vh;
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

export const DashboardContainer = styled.div``;
