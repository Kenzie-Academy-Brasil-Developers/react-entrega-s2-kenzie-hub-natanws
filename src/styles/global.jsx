import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        --blue: #1D36E6;
        --yellow: #F2D319;
        --light-gray: #F1E9E4;
        --medium-gray: #a9a9a9;
        --gray: #7D7A75;
        --black: #222121;
    }

    body {
        background-color: var(---light-gray);
        color: var(---black);
    }

    body,input,button {
        font-family: 'GothicA 1', sans-serif;
        font-size: 1rem;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Archivo', sans-serif;
    }

    button{
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }

`;
