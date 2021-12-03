import {
  Avatar,
  Box,
  Button,
  Flex,
  Spacer,
  Textarea,
  Image,
  VStack,
} from "@chakra-ui/react";

import React, { ReactElement } from "react";

interface Props {}

function WhatDoYouThink({}: Props): ReactElement {
  return (
    <Flex>
      <Image
        display={{ base: "none", md: "block" }}
        rounded={"md"}
        boxSize="8rem"
        src="https://picsum.photos/200/300"
      />
      <VStack ml={2} spacing={1} flexGrow={1}>
        <Textarea placeholder="Bạn đang nghĩ gì?"></Textarea>
        <Button variant="solid" colorScheme="blue">
          Gửi
        </Button>
      </VStack>
    </Flex>
  );
}

export default WhatDoYouThink;
