import {
  Avatar,
  Box,
  Button,
  Flex,
  Spacer,
  Textarea,
  Image,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import React, { ReactElement } from "react";

interface Props { }

function WhatDoYouThink({ }: Props): ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        const { title, text } = values

        resolve({ title, text });
      }, 3000)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <Image
            display={{ base: "none", md: "block" }}
            rounded={"md"}
            boxSize="8rem"
            src="https://picsum.photos/200/300"
          />
          <VStack ml={2} spacing={1} flexGrow={1}>
            <Input placeholder="Tiêu đề"
              {...register('title', { required: true })}
            ></Input>
            <Textarea placeholder="Nội dung"
              {...register('text', { required: true })}
            ></Textarea>
            <Button variant="solid" colorScheme="blue">
              Gửi
            </Button>
          </VStack>
        </Flex>
      </form>
    </>
  );
}

export default WhatDoYouThink;
