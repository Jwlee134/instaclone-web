import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import {
  SeeProfileDocument,
  useFollowUserMutation,
  useSeeProfileQuery,
  useUnfollowUserMutation,
} from "../graphql/generated";
import useUser from "../hooks/useUser";

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;

const Column = styled.div``;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 18px;
`;

const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg?: string }>`
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button)`
  margin-left: 10px;
  margin-top: 0;
`;

function Profile() {
  const { username } = useParams();
  const { data, loading } = useSeeProfileQuery({
    variables: { username: username! },
  });
  const user = useUser();
  const [follow, { loading: followLoading }] = useFollowUserMutation({
    variables: { username: username! },
    refetchQueries: [
      { query: SeeProfileDocument, variables: { username: username! } },
      { query: SeeProfileDocument, variables: { username: user?.username! } },
    ],
  });
  const [unfollow, { loading: unfollowLoading }] = useUnfollowUserMutation({
    variables: { username: data?.seeProfile?.username! },
    refetchQueries: [
      { query: SeeProfileDocument, variables: { username: username! } },
      { query: SeeProfileDocument, variables: { username: user?.username! } },
    ],
  });

  const followUser = () => {
    if (followLoading) return;
    follow();
  };

  const unFollowUser = () => {
    if (unfollowLoading) return;
    unfollow();
  };

  return (
    <div>
      <PageTitle title={loading ? "Loading..." : `${username!} • Instagram`} />
      <Header>
        <Avatar src={data?.seeProfile?.avatar!} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile?.isMe && <ProfileBtn>Edit Profile</ProfileBtn>}
            {!data?.seeProfile?.isMe && (
              <>
                {data?.seeProfile?.isFollowing ? (
                  <ProfileBtn onClick={unFollowUser}>Unfollow</ProfileBtn>
                ) : (
                  <ProfileBtn onClick={followUser}>Follow</ProfileBtn>
                )}
              </>
            )}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo bg={photo?.file} key={photo?.id}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo?.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo?.numOfComments}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
