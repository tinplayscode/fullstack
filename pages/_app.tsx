import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "../common/components/Layout";
import { default as theme } from "../common/config/charkaTheme";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
