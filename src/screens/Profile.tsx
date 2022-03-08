import { useParams } from "react-router-dom";
import { useSeeProfileQuery } from "../graphql/generated";

function Profile() {
  const params = useParams();
  const { data } = useSeeProfileQuery({
    variables: { username: params.username! },
  });
  console.log(data);

  return null;
}

export default Profile;
