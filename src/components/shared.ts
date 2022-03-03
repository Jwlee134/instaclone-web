import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const FatLink = styled(FatText)`
  color: rgb(142, 142, 142);
`;
