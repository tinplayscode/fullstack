import { extendTheme, ThemeConfig, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme: ThemeConfig = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter",
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        lineHeight: "base",
        bg: mode(
          "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
          "gray.800"
        )(props),
        backgroundAttachment: "fixed",
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word",
      },
    }),
  },
  components: {
		Heading: {
			baseStyle: {
				fontWeight: "normal"
			}

		}

  },
});

export default theme;
