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
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactElement } from "react";
import {
	IoPersonCircle,
	IoSunny,
	IoMoon,
	IoList,
	IoLogoGoogle,
	IoLogOut,
} from "react-icons/io5";

interface Props {}

function Header({}: Props): ReactElement {
	const { colorMode, toggleColorMode } = useColorMode();
	const { data, status } = useSession({ required: false });

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
				paddingX={{ base: 4, md: 16 }}
			>
				<Link href="/">
					<ChakraLink
						padding={1}
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
						<Heading fontSize={{ base: "md", md: "xl" }} as="h1">
							<Flex flexDirection="column">
								<span>Từ Thiện</span>
								<span>Minh bạch</span>
							</Flex>
						</Heading>
					</ChakraLink>
				</Link>

				<Flex justifyContent="flex-end" alignItems="center" gridColumnGap={2}>
					<Link href="/categories">
						<ChakraLink>
							<Button
								variant="solid"
								colorScheme="cyan"
								size="sm"
								leftIcon={<IoList />}
							>
								Dự án
							</Button>
						</ChakraLink>
					</Link>
					<Popover>
						<PopoverTrigger>
							<Button variant="ghost" display="flex" alignItems="center">
								<Icon as={IoPersonCircle} boxSize={6} />
							</Button>
						</PopoverTrigger>
						<Portal>
							<PopoverContent>
								<PopoverArrow />
								<PopoverHeader>
									Xin chào{" "}
									<strong>{`${data ? data.user.name : "Khách"}`}</strong>
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
										<Button
											colorScheme="blue"
											leftIcon={<IoLogoGoogle />}
											onClick={() => {
												signIn("google");
											}}
										>
											Đăng nhập với Google
										</Button>
									)}
								</PopoverBody>
								<PopoverFooter>
									<Text fontSize="sm">
										Bằng việc đăng nhập, bạn đồng ý với{" "}
										<ChakraLink>Điều khoản dịch vụ</ChakraLink>.
									</Text>
								</PopoverFooter>
							</PopoverContent>
						</Portal>
					</Popover>

					<Button variant="ghost" onClick={toggleColorMode}>
						{colorMode === "light" ? (
							<Icon as={IoMoon} boxSize={5} />
						) : (
							<Icon as={IoSunny} boxSize={5} />
						)}
					</Button>
				</Flex>
			</Flex>

			{/*Charka UI toast*/}
			{data && (
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
			)}
		</>
	);
}

export default Header;
