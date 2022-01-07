import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  useColorMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { default as NextLink } from "next/link";

import { HamburgerIcon } from "@chakra-ui/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactElement } from "react";
import {
  IoPersonCircle,
  IoSunny,
  IoMoon,
  IoLogoGoogle,
  IoLogOut,
  IoFolder,
  IoList,
  IoSettings,
  IoLogIn,
} from "react-icons/io5";
import useSWR from "swr";
import { fetcher } from "common/utils/";

interface Props { }

function Header({ }: Props): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, status } = useSession({ required: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const colorScheme = useColorModeValue("gray", "pink");

  return (
    <>
      <Flex
        bgColor={colorMode === "light" ? "white" : "gray.900"}
        position="sticky"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        boxShadow="md"
        alignItems="center"
        justifyContent="space-between"
        paddingX={{ base: 4, md: 10 }}
      >
        <Flex alignItems="center" gap={0} py={2}>
          <IconButton
            aria-label="Toggle drawer"
            colorScheme={colorScheme}
            size="sm"
            display={{ base: "block", md: "none" }}
            icon={<HamburgerIcon />}
            onClick={onOpen}
          ></IconButton>

          <Drawer placement="start" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody>
                <Menu status={status} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Link href="/" passHref>
            <ChakraLink
              rounded="2xl"
              transition="all 0.2s"
              _hover={{
                textDecoration: "none",
                _after: {
                  width: "100%",
                  left: 0,
                },
              }}
              _after={{
                content: "''",
                width: "0px",
                height: "2px",
                display: "block",
                background: "black",
                transition: "300ms",
              }}
            >
              <Heading fontSize={{ base: "md", md: "xl" }} as="h1" transform="translateY(2px)" paddingX="2">
                <Box display={{ base: "none", md: "block" }}>
                  <Flex flexDirection="column">
                    <span>Từ Thiện</span>
                    <span>Minh Bạch</span>
                  </Flex>
                </Box>
                <Box fontWeight="bold" display={{ md: "none" }}>
                  <span>TTMB</span>
                </Box>
              </Heading>
            </ChakraLink>
          </Link>
        </Flex>

        <Flex justifyContent="flex-end" alignItems="center" gridColumnGap={1}>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" display={{ base: "none", md: "flex" }} alignItems="center" leftIcon={<Icon as={IoPersonCircle} boxSize={6} />}>
                <Box display={{ base: "none", md: "block" }}>
                  <strong>{`${data ? data.user.name || data.user.email : "Khách"}`}</strong>
                </Box>
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                  Xin chào{" "}

                  <NextLink href={`/profile/${data?.id}`} passHref>
                    <a>
                      <strong>{`${data ? data.user.name || data.user.email : "Khách"}`}</strong>
                    </a>
                  </NextLink>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  {status === "authenticated" ? (
                    <Button
                      colorScheme="blue"
                      leftIcon={<IoLogOut />}
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Đăng xuất
                    </Button>
                  ) : (
                    <Flex flexDirection="column" gap={1}>
                      {/* login with email */}
                      <Button

                        colorScheme="blue"
                        leftIcon={<IoLogoGoogle />}
                        onClick={() => {
                          signIn("google");
                        }}
                      >
                        Đăng nhập với Google
                      </Button>
                    </Flex>
                  )}
                </PopoverBody>
                {status !== "authenticated" && (
                  <PopoverFooter>
                    <Text fontSize="sm">
                      Bằng việc đăng nhập, bạn đồng ý với{" "}
                      <ChakraLink>Điều khoản dịch vụ</ChakraLink>.
                    </Text>
                  </PopoverFooter>)}
              </PopoverContent>
            </Portal>
          </Popover>


          <Box display={{ base: "none", md: "block" }}>

            {/* Menu */}
            <Menu status={status} />
          </Box>

          <Button variant="outline" shadow="md" onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <Icon as={IoMoon} boxSize={5} />
            ) : (
              <Icon as={IoSunny} boxSize={5} />
            )}
          </Button>

        </Flex>
      </Flex>

      {/*Charka UI toast*/}
      {
        data && (
          <Box
            zIndex={100}
            padding={4}
            my={2}
            mx={4}
            bg="green.200"
            color="black"
            fontSize="sm"
            fontWeight="normal"
            textAlign="center"
            borderRadius="md"
          >
            Bạn đang đăng nhập với {data.user.name}
          </Box>
        )
      }
    </>
  );
}

function Menu({ status }): ReactElement {
  const { data, error } = useSWR("/api/auth/session", fetcher);

  return (
    <>
      {status === "authenticated" && (
        <>
          <NextLink passHref href="/du-an/du-an-cua-toi">
            <Button as="a" variant="ghost" leftIcon={<Icon as={IoFolder} boxSize={6} />}>
              Dự án của tôi
            </Button>
          </NextLink>

          {data?.role === "ADMIN" && (
            <NextLink passHref href="/admin">
              <Button as="a" variant="ghost" leftIcon={<Icon as={IoSettings} boxSize={6} />}>
                Quản lý
              </Button>
            </NextLink>
          )}
        </>
      )}

      <NextLink passHref href="/du-an/">
        <Button as="a" variant="ghost" leftIcon={<Icon as={IoList} boxSize={6} />}>
          Danh sách dự án
        </Button>
      </NextLink>



    </>
  );
}

export default Header;
