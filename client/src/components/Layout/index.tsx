import { memo, ReactNode } from "react";
import Head from "next/head";
import { Header, Container } from "components";

type LayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const LayoutComponent: React.FC<LayoutProps> = ({
  title,
  description,
  children,
}) => {
  const isHomepage = title === "Hubla";

  const currentPageTitle = isHomepage ? "Hubla" : `${title} | Hubla`;

  return (
    <>
      <Head>
        <title>{currentPageTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  );
};

export const Layout = memo(LayoutComponent);
