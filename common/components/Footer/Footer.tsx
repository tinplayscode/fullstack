import { Text, Box, Grid, Link } from "@chakra-ui/react";
import React, { Fragment, ReactElement } from "react";

interface Props { }

function Footer({ }: Props): ReactElement {
  return (
    <Fragment>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap="3"
        mt="1"
        position={{ base: "static", md: "fixed" }}
        bottom="0"
        padding={3}
      >
        <Box padding="2" w="100%">
          <Text opacity="0.6">
            &copy; TuthienMinhBach
            <br />
            Powered by{" "}
            <Link href={"https://chakra-ui.com/"} isExternal>
              Chakra UI
            </Link>
          </Text>
        </Box>
      </Grid>
    </Fragment>
  );
}

export default Footer;
