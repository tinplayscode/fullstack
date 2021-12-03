import {
  Box,
  Flex,
  Image,
  Skeleton,
  useImage,
  Text,
  useColorModeValue,
  Link as CharkaLink,
} from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  variant?: "default";
  children?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  link: string;
}

function Card(props: Props): JSX.Element {
  const { variant, children, title, description, image, link, ...rest } = props;
  const status = useImage({ src: image });

  const cardBg = useColorModeValue("white", "gray.900");
  const cardText = useColorModeValue("black", "whiteAlpha.900");
  // Pass the computed styles into the `__css` prop
  return (
    <Link href={link}>
      <CharkaLink _hover={{ textDecoration: "none" }}>
        <Box
          bg={cardBg}
          p={2}
          rounded="md"
          shadow="xl"
          color={cardText}
          _hover={{
            transform: "scale(1.01)",
          }}
          transition="all .5s ease"
          {...rest}
        >
          {status == "loaded" ? (
            <Image
              src={image}
              width={{ base: "100%" }}
              objectFit="cover"
              rounded="md"
              height={{ base: 32 }}
            />
          ) : (
            <Skeleton height={32} width="100%" />
          )}
          <Flex flexDirection="column" mt={1} mx={1}>
            <Text>{title}</Text>
            {description && <Text fontSize="sm">{description}</Text>}
          </Flex>
        </Box>
      </CharkaLink>
    </Link>
  );
}

export default Card;
