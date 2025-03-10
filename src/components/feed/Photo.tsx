import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { SeeFeedQuery, useToggleLikeMutation } from "../../graphql/generated";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import routes from "../../routes";

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
  a {
    display: flex;
    align-items: center;
  }
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

function Photo({ photo }: Props) {
  const [toggleLike] = useToggleLikeMutation({
    variables: { toggleLikeId: photo?.id! },
    update: (cache, { data }) => {
      if (!photo || !data?.toggleLike.isSuccess) return;
      const id = `Photo:${photo.id}`;
      cache.modify({
        id,
        fields: {
          isLiked: (prev) => !prev,
          likes: (prev) => (!photo.isLiked ? prev + 1 : prev - 1),
        },
      });
    },
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Link to={routes.profile(photo?.owner?.username!)}>
          <Avatar size="lg" url={photo?.owner?.avatar} />
          <Username>{photo?.owner?.username}</Username>
        </Link>
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
        <Comments photo={photo} />
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
