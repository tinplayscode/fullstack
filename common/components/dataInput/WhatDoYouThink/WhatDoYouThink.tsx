import {
  Button,
  Flex,
  Textarea,
  Image,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import React, { ReactElement } from "react";
import axios from "axios";
import { mutate } from "swr";

interface Props { }

function WhatDoYouThink({ }: Props): ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values) {
    try {
      const { title, text } = values;

      mutate("/api/v1/post", false);
      axios.post("/api/v1/post", { title, text });
    }
    catch (error) {
      console.log(error);
    }
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
            <Button variant="solid" colorScheme="blue" type="submit">
              Gửi
            </Button>
          </VStack>
        </Flex>
      </form>
    </>
  );
}

export default WhatDoYouThink;
