
import { ReactElement } from "react"
import Head from "next/head"
import BreadCrumb from "common/components/BreadCrumb"
import { Box } from "@chakra-ui/react"
import useSWR from "swr";
import { fetcher } from "common/utils";
import useThemeColor from "common/hooks/useThemeColor";
import Router from "next/router";
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
    console.log(data);


    return (
        <>
            <Head>
                <title>Admin - tuthienminhbach.com</title>
            </Head>

            <BreadCrumb items={[{ url: "/", name: "Trang chủ" }, {
                url: "/admin",
                name: "Admin"
            }]} />

            <Box
                height="min-content"
                padding="2"
                my="2"
                backgroundColor={boxBackground}
                rounded="md"
                shadow="md"
            >
                {/* {users.map((user) => (
                    <div key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </div>
                ))} */}

            </Box>
        </>
    )
}