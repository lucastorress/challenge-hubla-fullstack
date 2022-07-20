import apiClient from "services/apiClient";
import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import decode from "jwt-decode";
import { MAX_AGE } from "@constants";
import * as C from "@chakra-ui/react";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
  birthday: string;
};

export type DecodedToken = AuthenticatedUser;

type AuthLoginApiResponse = {
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextInterface = {
  authenticatedUser: AuthenticatedUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signInFormSchema: yup.ObjectSchema<any, any>;
  isAuthenticated: boolean;
  signOut(): void;
};

const AuthContext = createContext({} as AuthContextInterface);

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

export function signOut(): void {
  destroyCookie(undefined, "access_token");
  Router.push("/login");
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { access_token } = parseCookies();
  const toast = C.useToast();
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    {} as AuthenticatedUser
  );

  const isAuthenticated = !!authenticatedUser;

  const signInFormSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
  });

  const signIn: SubmitHandler<SignInCredentials> = async ({
    email,
    password,
  }) => {
    try {
      const response = await apiClient.post<AuthLoginApiResponse>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      setCookie(undefined, "access_token", token, {
        maxAge: MAX_AGE,
        path: "/",
      });

      const decodedToken: DecodedToken = decode(token);

      setAuthenticatedUser(decodedToken);

      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      if (response.status === 200) {
        Router.push("/");
        toast({
          title: "Successfully signed in",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (access_token && !authenticatedUser.id) {
      apiClient
        .get<AuthenticatedUser>(`/user`)
        .then((response) => {
          const currentAuthenticatedUser = response.data;
          setAuthenticatedUser(currentAuthenticatedUser);
        })
        .catch(() => {
          signOut();
        });
    }
  }, [access_token, authenticatedUser, signOut]);

  useEffect(() => {
    if (!access_token) {
      signOut();
    }
  }, [access_token, signOut]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticatedUser,
        signIn,
        signInFormSchema,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
