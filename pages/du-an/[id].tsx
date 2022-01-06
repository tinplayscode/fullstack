import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Grid, GridItem, Box, Skeleton, Heading, Flex, Text, Stack, Button } from "@chakra-ui/react";
import useThemeColor from "common/hooks/useThemeColor";
import { fetcher } from "common/utils";
import Head from "next/head";

interface Props { }

export default function ProjectPage(props: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/v1/project/${id}`, fetcher);
  const { boxBackground } = useThemeColor();

  if (!data || error) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>

        <Skeleton height="100px" />
      </>
    )
  }

  const { project } = data;

  console.log("project", project);

  return (
    <Box mt={2}>
      <Head>
        <title>{project.name}</title>
      </Head>

      <Heading as="h1" size="lg">
        {project?.name}
      </Heading>

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap="2"
      >
        <GridItem my="2" rounded="md" shadow="2xl" height="fit-content">
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
    </Box>
  );
}

function ProjectInfo({ project }): ReactElement | null {
  // List item of Project name, description, goal, etc.
  return <>
    <Heading as="h2" size="lg">
      Thông tin dự án
    </Heading>

    <Flex gap="2" alignItems="center">
      <Text>Tên dự án:</Text>
      <Text>{project?.name}</Text>
    </Flex>

    <Stack>
      <Text>Mô tả:</Text>
      <Text>{project?.description}</Text>
    </Stack>


  </>;
}
