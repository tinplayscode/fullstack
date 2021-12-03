import React, { Fragment, ReactElement } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Box, Container } from "@chakra-ui/react";
interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl">{children}</Container>
      <Footer />
    </Fragment>
  );
}
