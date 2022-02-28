import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    body {
        background-color: ${({ theme }) => theme.bgColor};
    }
`;

export default GlobalStyles;
