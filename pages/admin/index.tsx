import React, { ReactElement, useCallback } from "react";
import Head from "next/head";
import BreadCrumb from "common/components/BreadCrumb";
import { Box, Flex, Image, Text, Stack, Select, useToast } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "common/utils";
import useThemeColor from "common/hooks/useThemeColor";
import { useSession } from "next-auth/react";
import { Role, User } from "@prisma/client";
import prisma from "common/lib/prisma-client";
import Router from "next/router";
import axios from "axios";

export default function Admin(): ReactElement | null {
  const { boxBackground } = useThemeColor();
  const { data, error } = useSWR("/api/v1/user/getAllUser", fetcher);
  const { data: loginData, status } = useSession({ required: true });
  const toast = useToast();

  if (!data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (loginData?.role !== "ADMIN") {
    Router.push("/");

    return null;
  }

  const { users } = data;
  //get prisma enum ROLE
  const roles = [Role.USER, Role.PHILANTHROPIST, Role.MODERATOR, Role.ADMIN];

  const updateRole = async (id: string, role: string) => {
    console.log(id, role);

    axios.put(`/api/v1/user/updateRole/${id}`, { role, id }).then((res) => {
      const { data } = res;

      if (data.success) {
        toast({
          title: "Success",
          description: "Update role success for user id: " + id,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      else {
        toast({
          title: "Error",
          description: "Update role failed",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }


    });

  }

  return (
    <>
      <Head>
        <title>Admin - tuthienminhbach.com</title>
      </Head>

      <BreadCrumb
        items={[
          { url: "/", name: "Trang chủ" },
          {
            url: "/admin",
            name: "Admin",
          },
        ]}
      />

      <Stack
        height="min-content"
        padding="2"
        my="2"
        backgroundColor={boxBackground}
        rounded="md"
        shadow="md"
        spacing="2"
      >
        {users.map((user: User) => (
          <Flex
            gap="2"
            alignItems="center"
            key={user.id}
            justifyContent="space-between"
          >
            <Flex gap={2}>
              <Image
                src={
                  user.image ? user.image : "https://via.placeholder.com/150"
                }
                width="150px"
                height="150px"
                rounded="md"
              />

              <Box>
                <Text>{user.email}</Text>{" "}
                {user.name ? <Text>{user.name}</Text> : null}
              </Box>
            </Flex>

            <Select
              width={["100%", "100%", "100%", "200px"]}
              onChange={(e) => updateRole(user.id, e.target.value)}
              defaultValue={user.role}
            >
              {roles.map((role: Role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </Flex>
        ))}
      </Stack>
    </>
  );
}
