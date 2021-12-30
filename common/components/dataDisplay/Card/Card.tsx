import {
  Box,
  Flex,
  Image,
  Skeleton,
  useImage,
  Text,
  useColorModeValue,
  Link as CharkaLink,
  Tag,
  Stack,
} from "@chakra-ui/react";
import useThemeColor from "common/hooks/useThemeColor";
import Link from "next/link";

interface Props {
  variant?: "default";
  children?: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  link: string;
  tags?: Array<string>;
}

function Card(props: Props): JSX.Element {
  const { variant, children, title, description, image, link, tags, ...rest } =
    props;
  const status = useImage({ src: image });

  const cardBg = useColorModeValue("white", "gray.900");
  const cardHoverBg = useColorModeValue("gray.200", "gray.600");
  const cardText = useColorModeValue("black", "whiteAlpha.900");
  const { secondaryTextColor } = useThemeColor();

  // Pass the computed styles into the `__css` prop
  return (
    <Link href={link} passHref>
      <CharkaLink _hover={{ textDecoration: "none" }}>
        <Box
          bg={cardBg}
          p={2}
          rounded="md"
          shadow="md"
          color={cardText}
          _hover={{
            backgroundColor: cardHoverBg,
          }}
          transition="all .2s ease"
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
            // <Skeleton height={32} width="100%" />
            <Image
              src="https://ucarecdn.com/15c1606a-a175-4f83-8bf1-8187eeb8c264/noimage_food_viet247.jpg"
              width={{ base: "100%" }}
              objectFit="cover"
              rounded="md"
              height={{ base: 32 }}
            />
          )}
          <Box mt={1} mx={1}>
            <Text>{title}</Text>
            <Stack direction="row">
              {tags &&
                tags.map((tag) => (
                  <Tag key={tag} size="sm" variant="solid">
                    {tag}
                  </Tag>
                ))}
            </Stack>
            {description && (
              <Text fontSize="sm" color={secondaryTextColor}>
                {description}
              </Text>
            )}
          </Box>
        </Box>
      </CharkaLink>
    </Link>
  );
}

export default Card;
