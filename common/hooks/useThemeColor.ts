import { useColorModeValue } from "@chakra-ui/color-mode";

const useThemeColor = (): { boxBackground: string, cardBg: string } => {
	const boxBackground = useColorModeValue("white", "gray.700");
	const cardBg = useColorModeValue("white", "gray.900");

	return { boxBackground, cardBg };
}

export default useThemeColor;
