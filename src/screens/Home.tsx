import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { useSeeFeedQuery } from "../graphql/generated";

const Container = styled.div``;

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

function Home() {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();

  return (
    <Container>
      {seeFeed?.map((photo) => (
        <PhotoContainer key={photo?.id}>
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
                <PhotoAction>
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
            <Likes>
              {photo?.likes === 1 ? "1 like" : `${photo?.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </Container>
  );
}

export default Home;
