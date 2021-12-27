
import { ReactElement } from "react"
import Head from "next/head"
import BreadCrumb from "common/components/BreadCrumb"
import { Box, Flex, Image, Text, Stack } from "@chakra-ui/react"
import useSWR from "swr";
import { fetcher } from "common/utils";
import useThemeColor from "common/hooks/useThemeColor";
import { useSession } from "next-auth/react";

export default function DonateDone(): ReactElement | null {
    const { boxBackground } = useThemeColor();
    const { data, error } = useSWR("/api/v1/user/getAllUser", fetcher);
    const { data: loginData, status } = useSession({ required: true });

    if (!data) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    // if (loginData?.role !== "ADMIN") {
    //     Router.push("/");


    //     return null;
    // }
    const { users } = data;

    return (
        <>
            <Head>
                <title>Admin - tuthienminhbach.com</title>
            </Head>

            <BreadCrumb items={[{ url: "/", name: "Trang chủ" }, {
                url: "/admin",
                name: "Admin"
            }]} />

            <Stack
                height="min-content"
                padding="2"
                my="2"
                backgroundColor={boxBackground}
                rounded="md"
                shadow="md"
                spacing="2"
            >
                {users.map((user) => (
                    <Flex gap="2" alignItems="center">
                        <Image src={user.image ? user.image : "https://via.placeholder.com/150"} width="150px" height="150px" rounded="md" />

                        <Box>
                            <Text>{user.email}</Text> {user.name ? <Text>{user.name}</Text> : null}
                        </Box>
                    </Flex>
                ))}

            </Stack>
        </>
    )
}