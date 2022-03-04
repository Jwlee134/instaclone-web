import styled from "styled-components";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { useSeeFeedQuery } from "../graphql/generated";

const Container = styled.div``;

function Home() {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();

  return (
    <Container>
      <PageTitle title="Home • Instagram" />
      {seeFeed?.map((photo) => (
        <Photo key={photo?.id} photo={photo} />
      ))}
    </Container>
  );
}

export default Home;
