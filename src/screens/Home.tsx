import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { useSeeFeedQuery } from "../graphql/generated";

const Container = styled.div``;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

function Home() {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();

  return (
    <Container>
      {seeFeed?.map((photo) => (
        <PhotoContainer key={photo?.id}>
          <PhotoHeader>
            <Avatar url={photo?.owner?.avatar} />
            <Username>{photo?.owner?.username}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </Container>
  );
}

export default Home;
