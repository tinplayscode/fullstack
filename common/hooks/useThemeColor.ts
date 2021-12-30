import { useColorModeValue } from "@chakra-ui/color-mode";

const useThemeColor = () => {
  const boxBackground = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("white", "gray.900");
  const secondaryTextColor = useColorModeValue("gray.600", "whiteAlpha.600");

  return { boxBackground, cardBg, secondaryTextColor };
};

export default useThemeColor;
