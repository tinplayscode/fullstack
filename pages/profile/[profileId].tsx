import { ReactElement } from "react"
import Head from "next/head"
import BreadCrumb from "common/components/BreadCrumb"
import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { fetcher } from "common/utils";
import useSWR from "swr";

export default function DonateDone(): ReactElement | null {
    const router = useRouter();
    const { profileId } = router.query;

    const { data, error } = useSWR(`/api/v1/user/getUserById/${profileId}`, fetcher);

    return (
        <>
            <Head>
                <title>Đóng góp thành công - tuthienminhbach.com</title>
            </Head>

            <BreadCrumb items={[{ url: "/", name: "Trang chủ" }, { url: "/du-an", name: "Dự án" }, { url: "/du-an/donate-done", name: "Đóng góp thành công" }]} />

            <Box
                height="min-content"
                padding="2"
                my="2"
                backgroundColor="white"
                rounded="md"
                shadow="md"
            >
                <Box
                    height="min-content"
                    padding="2"
                    my="2"
                    backgroundColor="white"
                    rounded="md"
                    shadow="md"
                >
                    <h1>Đóng góp thành công!</h1>
                    <p>
                        Cảm ơn bạn đã đóng góp cho dự án. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                </Box>
            </Box>
        </>
    )
}