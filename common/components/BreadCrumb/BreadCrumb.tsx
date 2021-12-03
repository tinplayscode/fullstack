import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Link from 'next/link'

interface Link {
  name: string;
  url: string;
}

interface Props {
  items: Array<Link>;
}

export default function BreadCrumb({ items }: Props): ReactElement {
  return (
    <Breadcrumb fontWeight="medium" fontSize="sm" mt={2} mx={2}>
      {items.map((item, index) => (
        <BreadcrumbItem isCurrentPage={index == items.length} key={index}>
				<Link href={item.url} passHref>
          <BreadcrumbLink>{item.name}</BreadcrumbLink>
				</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
