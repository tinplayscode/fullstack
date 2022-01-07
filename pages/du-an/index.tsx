import Link from "next/link";
import React, { ReactElement, useCallback } from "react";
import {
  Flex,
  Box,
  Heading,
  Link as CharkaLink,
  Button,
  FormControl,
  Input,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  useToast,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Textarea,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { Category, Project } from "@prisma/client";
import useThemeColor from "common/hooks/useThemeColor";
import Card from "common/components/dataDisplay/Card";
import BreadCrumb from "common/components/BreadCrumb";
import Head from "next/head";
import { IoCreate } from "react-icons/io5";
import { fetcher } from "common/utils";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { Widget } from "@uploadcare/react-widget";
import CKEditor from "common/components/dataInput/CKEditor";

interface CategoryFix extends Category {
  projects: Project[];
}

export interface indexProps { }

export default function Home(props: indexProps): ReactElement | null {
  const { data, error } = useSWR("/api/v1/category", fetcher);
  const { boxBackground } = useThemeColor();

  if (!data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <>
      <BreadCrumb
        items={[
          {
            name: "Trang chủ",
            url: "/",
          },
          {
            name: "Dự án",
            url: "/categories",
          },
        ]}
      />

      <Head>
        <title>Danh sách dự án - Tuthienminhbach.com</title>
      </Head>

      <AdminPanel categories={data.categories} />

      <Stack spacing={2}>
        {data.categories?.map((category: CategoryFix) => {
          return (
            <Box
              key={category.id}
              height="min-content"
              padding="2"
              backgroundColor={boxBackground}
              rounded="md"
              shadow="md"
            >
              <Link
                href="/projects/[id]"
                as={`/projects/${category.id}`}
                passHref
              >
                <CharkaLink>
                  <Heading as="h2" size="md" fontWeight="normal">
                    {category.name}
                  </Heading>
                </CharkaLink>
              </Link>

              <Stack spacing={1} mt={2}>
                {category.projects.map((project: Project) => {
                  return (
                    <Card
                      key={project.id}
                      title={project.name}
                      description={project.description}
                      image={project.thumbnailUrl}
                      link={`/du-an/${project.id}`}
                    />
                  );
                })}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </>
  );
}

function AdminPanel({ categories }): ReactElement | null {
  // useSWR call
  const { data, error } = useSWR("/api/auth/session", fetcher);

  if (error) {
    return <div>Error</div>;
  }

  if (data?.role !== "ADMIN") {
    return null;
  }

  return (
    <Flex
      p={2}
      rounded="md"
      alignItems="center"
      gridGap={2}
      justifyContent="flex-end"
    >
      <CategoryButton />
      <ProjectButton categories={categories} />
    </Flex>
  );
}

function CategoryButton(): ReactElement | null {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const initialRef = React.useRef();
  const [description, setDescription] = React.useState("");

  async function onSubmit(values) {
    try {
      const { name } = values;

      mutate("/api/v1/category", false);
      const res = await axios.post("/api/v1/category", {
        name,
        description,
      });
      mutate("/api/v1/category", true);
      console.log(res);
      onClose();
      if (res.status === 200) {
        toast({
          title: "Thành công",
          description: "Thêm thành công",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Thất bại",
          description: "Thêm thất bại",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={onOpen}
        leftIcon={<IoCreate />}
      >
        Tạo chuyên mục
      </Button>

      <Modal size="xl" initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Thêm chuyên mục</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={2}>
                <FormControl isRequired>
                  <FormLabel>Tên chuyên mục</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Tên chuyên mục"
                    {...register("name", { required: true })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mô tả</FormLabel>
                  <Input placeholder="Mô tả" {...register("description")} />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Thêm
              </Button>
              <Button onClick={onClose}>Huỷ</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

function ProjectButton({ categories }): ReactElement | null {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit: handleSubmit2,
    register: register,
    formState: { errors, isSubmitting },
  } = useForm();
  const initialRef = React.useRef();
  const toast = useToast();
  const [priceCall, setPriceCall] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState("");
  const [description, setDescsription] = React.useState("");

  async function onProjectSubmit(values) {
    console.log(values);
    try {
      const { name, categoryId, bankNumber, bankName } = values;

      const res: AxiosResponse = await axios.post("/api/v1/project", {
        name,
        description,
        categoryId,
        money: priceCall,
        thumbnailUrl: thumbnail,
        bankNumber,
        bankName
      });

      if (!res.data.success) throw new Error(res.data.message);

      toast({
        title: "Thành công",
        description: "Đã thêm dự án",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      onClose();

      mutate("/api/v1/project", true);
    } catch (error) {
      toast({
        title: "Thêm dự án thất bại",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const onPriceCallChange = useCallback((value) => {
    setPriceCall(value);
  }, []);

  return (
    <>
      <Button
        colorScheme="blue"
        size="sm"
        onClick={onOpen}
        leftIcon={<IoCreate />}
      >
        Tạo dự án
      </Button>

      <Modal size="6xl" initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit2(onProjectSubmit)}>
          <ModalContent>
            <ModalHeader>Thêm dự án</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={2}>
                <FormControl isRequired>
                  <FormLabel>Tên dự án</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Tên chuyên mục"
                    {...register("name", { required: true })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mô tả</FormLabel>
                  <CKEditor setContent={setDescsription} />
                </FormControl>
                <FormControl>
                  <FormLabel>Ngân hàng</FormLabel>
                  <Input
                    placeholder="Ngân hàng"
                    {...register("bankName", { required: true })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Số tài khoản ngân hàng</FormLabel>
                  <Input
                    placeholder="Số tài khoản ngân hàng"
                    type="number"
                    {...register("bankNumber", { required: true })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>
                    Mức giá: {priceCall.toLocaleString()} VND
                  </FormLabel>
                  <Slider
                    defaultValue={60}
                    {...register("money", { required: true })}
                    min={1000000}
                    max={100000000}
                    step={1000000}
                    value={priceCall}
                    onChange={(event) => onPriceCallChange(event)}
                  >
                    <SliderTrack bg="red.100">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Chuyên mục</FormLabel>
                  <Select
                    name="categoryId"
                    placeholder="Select option"
                    {...register("categoryId", { required: true })}
                  >
                    {categories?.map((category: Category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Thumbnail</FormLabel>
                  <Widget
                    publicKey="533d4b8f6a11de77ba81"
                    onChange={(e) => {
                      setThumbnail(e.cdnUrl);
                    }}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={2} type="submit">
                Tạo project
              </Button>
              <Button onClick={onClose} type="button">
                Huỷ
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
