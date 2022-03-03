import styled from "styled-components";
import Feed from "../components/Feed";
import { useSeeFeedQuery } from "../graphql/generated";

const Container = styled.div``;

function Home() {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();

  return (
    <Container>
      {seeFeed?.map((photo) => (
        <Feed key={photo?.id} photo={photo} />
      ))}
    </Container>
  );
}

export default Home;
