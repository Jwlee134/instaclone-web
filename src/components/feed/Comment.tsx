import styled from "styled-components";
import { FatText } from "../shared";
import sanitizeHtml from "sanitize-html";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${({ theme }) => theme.palette.blue};
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface Props {
  username: string | undefined;
  text: string | null | undefined;
}

function Comment({ username, text }: Props) {
  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(
            text?.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>")!,
            { allowedTags: ["mark"] }
          ),
        }}
      />
    </CommentContainer>
  );
}

export default Comment;
