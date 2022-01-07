import useThemeColor from "common/hooks/useThemeColor";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "common/utils";
import { Category } from "@prisma/client";

export default function SingleCategory() {
    const { id } = useRouter().query;
    const { boxBackground } = useThemeColor();
    const { data, error } = useSWR(`/api/v1/category/getSingle?id=${id}`, fetcher);

    if (!data || error) {
        return <div>Loading...</div>
    }

    const { category }: { category: Category } = data;

    return (
        <>
            <Head>
                <title>{category.name} - tuthienminhbach.com</title>
            </Head>

            <div>
                hello world
            </div>
        </>
    )
}