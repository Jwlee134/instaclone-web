import styled from "styled-components";
import Feed from "../components/Feed";
import PageTitle from "../components/PageTitle";
import { useSeeFeedQuery } from "../graphql/generated";

const Container = styled.div``;

function Home() {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();

  return (
    <Container>
      <PageTitle title="Home • Instagram" />
      {seeFeed?.map((photo) => (
        <Feed key={photo?.id} photo={photo} />
      ))}
    </Container>
  );
}

export default Home;
