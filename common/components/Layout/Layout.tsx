import React, { Fragment, ReactElement } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
interface Props {
  children: ReactElement;
}


export default function Layout({ children }: Props): ReactElement {
  return (
    <Fragment>
      <Head>
        {/* meta viewport  */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Container maxW="7xl">{children}</Container>
      <Footer />
    </Fragment>
  );
}
