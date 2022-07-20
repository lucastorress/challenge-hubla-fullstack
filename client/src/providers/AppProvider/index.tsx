import { FunctionalComponent } from "@types";
import { AuthProvider, TransactionsProvider } from "context";
import { ChakraProvider } from "providers";

export const AppProvider: React.FC<FunctionalComponent> = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <TransactionsProvider>{children}</TransactionsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
