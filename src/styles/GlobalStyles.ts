import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    input, button {
        all: unset;
    }
    * {
        box-sizing: border-box;
    }
    button {
        cursor: pointer;
    }
    body {
        background-color: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.fontColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyles;
