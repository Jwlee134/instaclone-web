import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { FatText } from "./shared";
import { SeeFeedQuery, useToggleLikeMutation } from "../graphql/generated";
import { gql } from "@apollo/client";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 60px;
  border-radius: 4px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const PhotoFile = styled.div`
  img {
    width: 100%;
  }
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PhotoAction = styled.button`
  margin-right: 10px;
  svg {
    font-size: 20px;
  }
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
interface Props {
  photo: ArrayElement<SeeFeedQuery["seeFeed"]>;
}

function Feed({ photo }: Props) {
  const [toggleLike] = useToggleLikeMutation({
    variables: { toggleLikeId: photo?.id! },
    update: (cache, { data }) => {
      if (data?.toggleLike?.isSuccess) {
        cache.writeFragment({
          id: `Photo:${photo?.id!}`,
          fragment: gql`
            fragment Photo on Photo {
              isLiked
            }
          `,
          data: { isLiked: !photo?.isLiked },
        });
      }
    },
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Avatar size="lg" url={photo?.owner?.avatar} />
        <Username>{photo?.owner?.username}</Username>
      </PhotoHeader>
      <PhotoFile>
        <img src={photo?.file} alt="피드 사진" />
      </PhotoFile>
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction
              onClick={() =>
                toggleLike({ variables: { toggleLikeId: photo!.id } })
              }
            >
              <FontAwesomeIcon
                style={{ color: photo?.isLiked ? "tomato" : "inherit" }}
                icon={photo?.isLiked ? faHeartSolid : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <PhotoAction>
            <FontAwesomeIcon icon={faBookmark} />
          </PhotoAction>
        </PhotoActions>
        <Likes>{photo?.likes === 1 ? "1 like" : `${photo?.likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
}

export default Feed;
