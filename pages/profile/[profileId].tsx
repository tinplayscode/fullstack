import { ReactElement } from "react";
import Head from "next/head";
import BreadCrumb from "common/components/BreadCrumb";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tab,
  Table,
  TableCaption,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetcher } from "common/utils";
import useSWR from "swr";
import useThemeColor from "common/hooks/useThemeColor";
import { default as transactionLog } from "common/datasample/transactionLog";

export default function DonateDone(): ReactElement | null {
  const router = useRouter();
  const { profileId } = router.query;

  const { data, error } = useSWR(
    `/api/v1/user/getUserById/${profileId}`,
    fetcher
  );

  const { boxBackground } = useThemeColor();

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <>
      <Head>
        <title>{data.profile} - tuthienminhbach.com</title>
      </Head>

      <BreadCrumb
        items={[
          { url: "/", name: "Trang chủ" },
          { url: `/profile/${profileId}`, name: "Thông tin cá nhân" },
        ]}
      />

      <Box
        height="min-content"
        padding="2"
        my="2"
        backgroundColor={boxBackground}
        rounded="md"
        shadow="md"
      >
        <Tabs isLazy>
          <TabList>
            <Tab>Thông tin người dùng</Tab>
            <Tab>Lịch sử từ thiện</Tab>
            <Tab>Cài đặt</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <Donations />
            </TabPanel>
            <TabPanel>
              <Settings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

function Donations(): ReactElement | null {
  // const router = useRouter();
  // const { profileId } = router.query;

  // const { data, error } = useSWR(
  //   `/api/v1/user/getUserById/${profileId}`,
  //   fetcher
  // );

  // const { boxBackground } = useThemeColor();

  // if (!data) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error!</p>;
  // }

  return (
    <>
      <Table variant="simple" minWidth="1200px">
        <TableCaption>Dữ liệu được cập nhật thời gian thực</TableCaption>
        <Thead>
          <Tr>
            <Th>Mã số</Th>
            <Th>Dự án</Th>
            <Th>Ngày thu</Th>
            <Th>Số tiền/Hiện vật</Th>
            <Th>Nhà hảo tâm</Th>
            <Th>Mục đích</Th>
          </Tr>
        </Thead>
        <Tbody fontSize="sm">
          {transactionLog.map((log) => (
            <Tr key={log.id}>
              <Td>{log.id}</Td>
              <Td>{log.project}</Td>
              <Td>{log.date}</Td>
              <Td>{log.amount}</Td>
              <Td>{log.donor}</Td>
              <Td>{log.purpose}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Mã số</Th>
            <Th>Dự án</Th>
            <Th>Ngày thu</Th>
            <Th>Số tiền/Hiện vật</Th>
            <Th>Nhà hảo tâm</Th>
            <Th>Mục đích</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
}

function Settings(): ReactElement | null {
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Đổi mật khẩu
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Đổi email
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
