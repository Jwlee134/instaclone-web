import styled from "styled-components";

const SAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: #2c2c2c;
  overflow: hidden;
  img {
    max-width: 100%;
  }
  cursor: pointer;
`;

function Avatar({ url = "" }) {
  return (
    <SAvatar>
      {Boolean(url) ? <img src={url} alt="프로필 사진" /> : null}
    </SAvatar>
  );
}

export default Avatar;
