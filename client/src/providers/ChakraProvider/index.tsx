import { ChakraProvider as DefaultChakraProvider } from "@chakra-ui/react";
import { FunctionalComponent } from "@types";

import { theme } from "styles/theme";

export const ChakraProvider: React.FC<FunctionalComponent> = ({ children }) => {
  return (
    <DefaultChakraProvider theme={theme}>{children}</DefaultChakraProvider>
  );
};
