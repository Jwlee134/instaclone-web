import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
}

function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;
