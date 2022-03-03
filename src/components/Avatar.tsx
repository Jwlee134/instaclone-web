import styled from "styled-components";

const SAvatar = styled.div<{ size: Size }>`
  width: ${({ size }) => (size === "lg" ? "30px" : "25px")};
  height: ${({ size }) => (size === "lg" ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
  img {
    max-width: 100%;
  }
  cursor: pointer;
`;

type Size = "sm" | "lg";
interface Props {
  url: string | null | undefined;
  size?: Size;
}

function Avatar({ url, size = "sm" }: Props) {
  return (
    <SAvatar size={size}>
      {Boolean(url) ? <img src={url || ""} alt="프로필 사진" /> : null}
    </SAvatar>
  );
}

export default Avatar;
