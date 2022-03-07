import { gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  SeeFeedQuery,
  useCreateCommentMutation,
} from "../../graphql/generated";
import useUser from "../../hooks/useUser";
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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
interface Props {
  photo: ArrayElement<SeeFeedQuery["seeFeed"]>;
}

interface Form {
  comment: string;
}

function Comments({ photo }: Props) {
  const user = useUser();
  const { register, handleSubmit, getValues, setValue } = useForm<Form>();
  const [createComment, { loading }] = useCreateCommentMutation({
    update: (cache, { data }) => {
      if (!photo || !data?.createComment.isSuccess || !user) return;
      const {
        createComment: { id },
      } = data;
      const { comment } = getValues();
      setValue("comment", "");
      const newComment = {
        __typename: "Comment",
        id,
        text: comment,
        isMine: true,
        createdAt: Date.now(),
        user,
      };
      // Apollo devTool로 photo를 보면 comments 배열에 comment의 정보가 아닌 ref가 담겨있는 걸 확인할 수 있음
      // 따라서 writeFragment로 캐시를 생성함과 동시에 ref를 리턴받아 modify로 photo comments 배열에 푸쉬
      const newCommentCache = cache.writeFragment({
        fragment: gql`
          fragment NewComment on Comment {
            id
            createdAt
            isMine
            text
            user {
              username
              avatar
            }
          }
        `,
        data: newComment,
      });
      cache.modify({
        id: `Photo:${photo.id}`,
        fields: {
          comments: (prev) => [...prev, newCommentCache],
          numOfComments: (prev) => prev + 1,
        },
      });
    },
  });

  const onValid: SubmitHandler<Form> = ({ comment }) => {
    if (loading || !photo) return;
    createComment({
      variables: { createCommentId: photo.id, text: comment },
    });
  };

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
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("comment", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

export default Comments;
