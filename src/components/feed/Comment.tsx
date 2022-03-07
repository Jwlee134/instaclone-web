import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useDeleteCommentMutation } from "../../graphql/generated";

const CommentContainer = styled.div`
  display: flex;
`;

const CommentCaptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${({ theme }) => theme.palette.blue};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Props {
  photoId?: number | undefined;
  commentId?: number | undefined;
  username: string | undefined;
  text: string | null | undefined;
  isMine?: boolean | undefined;
}

function Comment({ photoId, commentId, username, text, isMine }: Props) {
  const hasHashtag = (text: string) => /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(text);
  const [deleteComment, { loading }] = useDeleteCommentMutation({
    update: (cache, { data }) => {
      if (!isMine || !data?.deleteComment.isSuccess) return;
      cache.modify({
        id: `Photo:${photoId}`,
        fields: { numOfComments: (prev) => prev - 1 },
      });
      cache.evict({ id: `Comment:${commentId}` });
    },
  });

  const onDelete = () => {
    if (loading) return;
    deleteComment({ variables: { deleteCommentId: commentId! } });
  };

  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaptionContainer>
        <CommentCaption>
          {text
            ?.split(" ")
            .map((word, i1) => {
              if (hasHashtag(word)) {
                // "I#love#you"라는 텍스트가 들어왔다고 가정하면 ["I","#love","#you"]로 분리
                // regex가 포획 괄호 () 를 포함하면 포획된 결과도 배열에 포함됨, https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split
                return [
                  ...word
                    .split(/(#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+)/g)
                    .filter((w) => Boolean(w))
                    .map((w, i2) => {
                      if (hasHashtag(w)) {
                        return (
                          <Fragment key={w + i2}>
                            <Link to={`/hashtags/${w}`}>{w}</Link>
                          </Fragment>
                        );
                      }
                      return <Fragment key={w + i2}>{w}</Fragment>;
                    }),
                  " ", // 처음에 공백으로 분리했으므로 마지막에 공백 추가
                ];
              }
              return <Fragment key={word + i1}>{word} </Fragment>;
            })
            .flat()}
        </CommentCaption>
        {isMine && <button onClick={onDelete}>❌</button>}
      </CommentCaptionContainer>
    </CommentContainer>
  );
}

export default Comment;
