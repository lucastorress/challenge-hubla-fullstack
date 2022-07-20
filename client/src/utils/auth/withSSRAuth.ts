import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { access_token } = parseCookies(ctx);

    if (!access_token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
