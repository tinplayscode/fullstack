import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Grid,
  GridItem,
  Box,
  Skeleton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Divider,
  Stack,
  Button,
  useDisclosure,
  Img,
  Flex,
  useToast,
} from "@chakra-ui/react";
import useThemeColor from "common/hooks/useThemeColor";
import { fetcher } from "common/utils";
import Head from "next/head";
import CharityLog from "common/components/dataDisplay/CharityLog";
import { default as transactionLog } from "common/datasample/transactionLog";
import { Markup } from "interweave";
import { Project } from "@prisma/client";
import { default as NextLink } from "next/link"
import Router from 'next/router'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import { useSession } from "next-auth/react";


interface Props { }

export default function ProjectPage(props: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/v1/project/${id}`, fetcher);
  const { boxBackground } = useThemeColor();
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!data || error) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>

        <Skeleton height="100px" />
      </>
    );
  }

  const { project } = data;

  return (
    <Box>
      <Head>
        <title>{project.name}</title>
      </Head>
      <Button variantColor="blue" variant="outline" my={2}>
        <NextLink href="/">
          <a>Back to home</a>
        </NextLink>
      </Button>

      {/* Từ thiện modal */}


      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Từ thiện</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {project.bankNumber && (<>
              <Text>
                Bạn có thể chuyển khoản vào tài khoản sau:
              </Text>
              <Text>
                <strong>
                  Ngân hàng: {project.bankName}
                </strong>
              </Text>
              <Text>
                <strong>
                  Số tài khoản: {project.bankNumber}
                </strong>
              </Text>
            </>) || <Text>Thông tin chuyển khoản nằm trong mục thông tin dự án.</Text>
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      <Text px={2} as="h2" fontSize="2xl" fontWeight="bold">{project.name}</Text>

      <Box my={2}>
        <Button onClick={onOpen} colorScheme="green">Gửi từ thiện</Button>
      </Box>

      <Grid gridTemplateColumns="repeat(1, 1fr)" gridGap="2">
        <GridItem
          rounded="md"
          shadow="2xl"
          height="fit-content"
          colSpan={3}
        >
          {/* Box of charity project information */}
          <Box
            height="min-content"
            padding="2"
            backgroundColor={boxBackground}
            rounded="md"
            shadow="md"
          >
            <ProjectInfo project={project} />

            {/* Charity option */}
          </Box>
        </GridItem>

        <GridItem
          my="2"
          rounded="md"
          shadow="2xl"
          height="fit-content"
        ></GridItem>
      </Grid>
      <Box my={2}>
        <Button onClick={onOpen} colorScheme="green">Gửi từ thiện</Button>
      </Box>
    </Box>
  );
}

function ProjectInfo({ project }: any): ReactElement | null {
  // List item of Project name, description, goal, etc.
  console.log(project)
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Thông tin dự án</Tab>
          <Tab>Sao kê ngân hàng</Tab>
          <Tab>Chủ dự án</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProjectInfoTab project={project} />
          </TabPanel>
          <TabPanel>
            <CharityLog data={transactionLog} />
          </TabPanel>
          <TabPanel>
            <ProjectOwnerTab owner={project.owner} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function ProjectInfoTab({ project }): ReactElement {
  const toast = useToast();

  async function deleteProject(id: any) {
    axios.delete(`/api/v1/project/`, {
      data: {
        id
      }
    }).then(({ data }) => {
      const { success } = data

      if (success) {
        toast({
          title: "Xóa dự án thành công",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

      }
      else {
        toast({
          title: "Xóa dự án thất bại",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

      Router.push("/du-an");
    });
  }

  const { data: user, status } = useSession({ required: false });

  return (
    <>
      <Stack>
        <Text>
          Số tiền kêu gọi: <Text as="strong">{project.money}</Text> VNĐ
        </Text>
        <Text>
          Số tiền đã quyên góp: <Text as="strong">{project.moneyDonated}</Text> VNĐ
        </Text>
        <Text>
          Số tiền còn lại: <Text as="strong">{project.money - project.moneyDonated}</Text> VNĐ
        </Text>

        {/* Separated line */}
        <Divider />

        <Text as="h2" fontSize="xl">
          Nội dung
        </Text>
        {/* Project name */}
        <Markup
          content={project.description}
        />

        {/* Delete project button */}
        {user?.role === "ADMIN" &&
          <Button
            colorScheme="red"
            variant="outline"
            my={2}
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
                deleteProject(project.id);
              }
            }}
          >
            Xóa dự án
          </Button>}

      </Stack>
    </>
  );
}

function ProjectOwnerTab({ owner }): ReactElement {
  return (
    <>
      <Stack>
        <Text as="h2" fontSize="xl">
          Chủ dự án
        </Text>
        <Flex gridGap={2}>
          <GridItem>
            <Img src={owner.image} />
          </GridItem>

          <GridItem>
            <Text>
              Tên: <Text as="strong">{owner.name}</Text>
            </Text>
            <Text>
              Email: <Text as="strong">{owner.email}
              </Text>
            </Text>
          </GridItem>
        </Flex>

      </Stack>
    </>
  );
}

