import { Box, Heading, Table, TableCaption, Thead, Tr, Tbody, Th, Td, Tfoot } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function CharityLog({ data }): ReactElement | null {
    return (
        <Box overflowX="auto" maxWidth="100%">
            <Heading as="h2" fontSize="xl" fontWeight="normal">
                Vừa từ thiện
            </Heading>
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
                    {data.map((log) => (
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
        </Box>
    );
}