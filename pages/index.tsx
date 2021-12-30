import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Image as CharkaImage,
  Stack,
  Flex,
  AvatarBadge,
  Icon,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import useThemeColor from "common/hooks/useThemeColor";
import Head from "next/head";
import React, { Fragment, ReactElement } from "react";
import {
  IoHeart,
  IoStar,
  IoChatbubbleEllipsesOutline,
  IoShareOutline,
} from "react-icons/io5";
import BreadCrumb from "../common/components/BreadCrumb";
import Card from "../common/components/dataDisplay/Card";
import WhatDoYouThink from "../common/components/dataInput/WhatDoYouThink";
import { default as transactionLog } from "../common/datasample/transactionLog";
import useSWR from "swr";
import { fetcher } from "common/utils";
import { useSession } from "next-auth/react";

export default function Home(): ReactElement | null {
  const { boxBackground } = useThemeColor();
  const { data, status } = useSession({ required: false });

  return (
    <div>
      <Head>
        <title>Trang chủ - tuthienminhbach.com</title>
      </Head>

      <BreadCrumb items={[{ url: "/", name: "Trang chủ" }]} />
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={{ base: 0, md: 2 }}
      >
        {/* Left panel */}
        <GridItem colSpan={2} order={{ base: 1, md: 0 }}>
          {status === "authenticated" && (
            <Box
              height="min-content"
              padding="2"
              my="2"
              backgroundColor={boxBackground}
              rounded="md"
              shadow="md"
            >
              <WhatDoYouThink />
            </Box>
          )}

          <Box
            height="min-content"
            padding="2"
            my="2"
            backgroundColor={boxBackground}
            rounded="md"
            shadow="md"
          >
            <PopularPosts />
          </Box>

          <Box
            height="min-content"
            padding="2"
            my="2"
            backgroundColor={boxBackground}
            rounded="md"
            shadow="md"
          >
            <CharityLog />
          </Box>
        </GridItem>

        {/* Right panel */}
        <GridItem my="2" rounded="md" shadow="2xl" height="fit-content">
          <Box
            height="min-content"
            padding="2"
            backgroundColor={boxBackground}
            rounded="md"
            shadow="md"
          >
            <NewProjects />
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

function NewProjects(): ReactElement | null {
  const { data, error } = useSWR("/api/v1/project/newest", fetcher, {
    revalidateOnFocus: false,
  });

  console.log(data);

  if (!data) {
    //fake mapping of length 5

    return (
      <Stack spacing={2}>
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
      </Stack>
    );
  }

  return (
    <Fragment>
      <Heading as="h2" fontSize="xl" fontWeight="normal" mb={2}>
        Dự án mới
      </Heading>
      <Grid gap="2">
        {data.projects.map((project) => {
          //convert money to readable
          return (
            <Card
              key={project.id}
              title={project.name}
              description={project.description}
              image={project?.image}
              link={`/du-an/${project.id}`}
              tags={[
                project.Category.name,
                `Cần thêm ${project.money.toLocaleString()} VNĐ`,
              ]}
            />
          );
        })}
        {/* No project */}
        {!data?.projects.length && (
          <Box height="min-content">
            <Text fontSize="sm" fontWeight="normal" color="gray.500">
              Chưa có dự án nào
            </Text>
          </Box>
        )}
      </Grid>
    </Fragment>
  );
}

function PopularPosts(): ReactElement | null {
  const { cardBg } = useThemeColor();
  const { data, error } = useSWR("/api/v1/post", fetcher);

  return (
    <Box>
      <Heading as="h2" fontSize="xl" fontWeight="normal">
        Newest posts
      </Heading>
      <Stack my={2} p="3" shadow="xl" bg={cardBg} rounded="md">
        <Flex gridColumnGap={2} alignItems="center">
          {/* User Info */}
          <Avatar src="https://picsum.photos/200/300">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Stack spacing="1px">
            <Box as="span">Nguyễn Trung Tín</Box>
            <Box
              as="span"
              fontSize="xs"
              display="flex"
              alignItems="center"
              gridColumnGap={0.5}
            >
              <Icon as={IoStar} />
              Nhà từ thiện nồng cốt
            </Box>
          </Stack>
        </Flex>
        {/* Content */}
        <Box>
          <Heading as="h3" fontSize="md" fontWeight="normal">
            Tại sao nhà từ thiện nồng cốt cần giúp đỡ những người bị giảm cân?
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Nhà từ thiện nồng cốt có thể giúp đỡ những người bị giảm cân và có
            thể giúp đỡ những người bị bệnh nhiễm môi trường.
          </Text>

          <CharkaImage
            objectFit="contain"
            width="100%"
            maxHeight="20rem"
            src="https://picsum.photos/400/1000"
          ></CharkaImage>

          <Divider mt={1} />
          {/* like, comment, share */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gridColumnGap={2}
            mt={2}
          >
            <Box
              as="span"
              color="pink.400"
              display="flex"
              alignItems="center"
              gridColumnGap={1}
            >
              <Icon as={IoHeart} />
              1.5k
              <Box as="span" display={{ base: "none", lg: "inline" }}>
                loves
              </Box>
            </Box>
            <Box
              as="span"
              color="gray.500"
              display="flex"
              alignItems="center"
              gridColumnGap={1}
            >
              <Icon as={IoChatbubbleEllipsesOutline} />
              1.5k
              <Box as="span" display={{ base: "none", lg: "inline" }}>
                comments
              </Box>
            </Box>
            <Box
              as="span"
              color="gray.500"
              display="flex"
              alignItems="center"
              gridColumnGap={1}
            >
              <Icon as={IoShareOutline} />
              1.5k
              <Box as="span" display={{ base: "none", lg: "inline" }}>
                shares
              </Box>
            </Box>
          </Flex>
        </Box>
      </Stack>{" "}
    </Box>
  );
}

function CharityLog(): ReactElement | null {
  return (
    <Box overflowX="auto" maxWidth="100%">
      <Heading as="h2" fontSize="xl" fontWeight="normal">
        Vừa từ thiện
      </Heading>
      <Table variant="simple" minWidth="1200px">
        <TableCaption>Dữ liệu được cập nhật thời gian thực</TableCaption>
        <Thead>
          <Tr>
            <Th>Mã số</Th>
            <Th>Dự án</Th>
            <Th>Ngày thu</Th>
            <Th>Số tiền/Hiện vật</Th>
            <Th>Nhà hảo tâm</Th>
            <Th>Mục đích</Th>
          </Tr>
        </Thead>
        <Tbody fontSize="sm">
          {transactionLog.map((log) => (
            <Tr key={log.id}>
              <Td>{log.id}</Td>
              <Td>{log.project}</Td>
              <Td>{log.date}</Td>
              <Td>{log.amount}</Td>
              <Td>{log.donor}</Td>
              <Td>{log.purpose}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Mã số</Th>
            <Th>Dự án</Th>
            <Th>Ngày thu</Th>
            <Th>Số tiền/Hiện vật</Th>
            <Th>Nhà hảo tâm</Th>
            <Th>Mục đích</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
}
