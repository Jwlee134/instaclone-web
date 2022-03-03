import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { useSeeFeedQuery } from "../graphql/generated";

const Container = styled.div``;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
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

const PhotoAction = styled.span`
  margin-right: 10px;
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
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faComment} size="2x" />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} size="2x" />
              </div>
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
