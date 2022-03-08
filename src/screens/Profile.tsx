import { useParams } from "react-router-dom";

function Profile() {
  const params = useParams();
  console.log(params.id);
  return null;
}

export default Profile;
