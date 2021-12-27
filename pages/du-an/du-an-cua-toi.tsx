import { ReactElement } from "react"
import Head from "next/head"
import BreadCrumb from "common/components/BreadCrumb"

export default function DonateDone(): ReactElement | null {

    return (
        <>
            <Head>
                <title>Dự án của tôi - tuthienminhbach.com</title>
            </Head>
             
            <BreadCrumb items={[{ url: "/", name: "Trang chủ" }, { url: "/du-an", name: "Dự án" }, { url: "/du-an/du-an-cua-toi", name: "Dự án của tôi" }]} />

           
        </>
    )
}