import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0;
  text-align: center;
  a {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.blue};
  }
`;

interface Props {
  spanText: string;
  href: string;
  linkText: string;
}

function BottomBox({ spanText, linkText, href }: Props) {
  return (
    <SBottomBox>
      <span>{spanText}</span>
      <Link to={href}>{linkText}</Link>
    </SBottomBox>
  );
}

export default BottomBox;
