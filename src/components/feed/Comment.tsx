import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface Props {
  username: string | undefined;
  text: string | null | undefined;
}

function Comment({ username, text }: Props) {
  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaption>{text}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
