import styled from "styled-components";
import { SeeFeedQuery } from "../../graphql/generated";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const NumOfComment = styled.span`
  opacity: 0.5;
  font-size: 12px;
  margin: 10px 0;
  display: block;
  font-weight: 600;
`;

type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
interface Props {
  photo: ArrayElement<SeeFeedQuery["seeFeed"]>;
}

function Comments({ photo }: Props) {
  return (
    <CommentsContainer>
      <Comment username={photo?.owner?.username} text={photo?.caption} />
      <NumOfComment>
        {photo?.numOfComments === 1
          ? "1 comment"
          : `${photo?.numOfComments} comments`}
      </NumOfComment>
      {photo?.comments?.map((comment) => (
        <Comment
          key={comment?.id}
          username={comment?.user.username}
          text={comment?.text}
        />
      ))}
    </CommentsContainer>
  );
}

export default Comments;
