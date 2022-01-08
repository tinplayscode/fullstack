import { ReactElement } from "react";
import Head from "next/head";
import BreadCrumb from "common/components/BreadCrumb";
import { Box, Button } from "@chakra-ui/react";
import { default as NextLink } from "next/link";

export default function DonateDone(): ReactElement | null {
  return (
    <>
      <Head>
        <title>Đăng ký thành công - tuthienminhbach.com</title>
      </Head>

      <BreadCrumb
        items={[
          { url: "/", name: "Trang chủ" },
          { url: "/du-an/donate-done", name: "Đăng ký thành công" },
        ]}
      />

      {/* Green box */}
      <Box bg="green.500" color="white" p={4} textAlign="center" fontSize="xl">
        Đăng ký thành công
      </Box>

      {/* Back to home page */}
      <Box mt={4}>
        <Button variantColor="blue" variant="outline" my={2}>
          <NextLink href="/">
            <a>Trở về trang chủ</a>
          </NextLink>
        </Button>
      </Box>
    </>
  );
}
