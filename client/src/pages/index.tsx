import { Layout, Loading } from "components";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useAuth, useTransactions } from "context";
import * as C from "@chakra-ui/react";
import { useRouter } from "next/router";
import slugify from "slugify";
import { withSSRAuth } from "utils/auth/withSSRAuth";
import { MdClose } from "react-icons/md";
import { Transactions } from "@types";
import { toCurrency } from "utils";

const DropzoneForm = dynamic(() => import("components/DropzoneForm"), {
  ssr: false,
  loading: () => <Loading />,
});

const Home = () => {
  const { authenticatedUser } = useAuth();
  const { data, handleChangeData, handleChangeCurrentProduct } =
    useTransactions();
  const { push } = useRouter();

  const isEmpty =
    !data.totalValueByTypes || !data.transactions?.products?.length;

  const homeContent = useMemo(() => {
    if (isEmpty) {
      return <DropzoneForm />;
    }

    return (
      <>
        <C.List>
          {data.transactions.products.map((product) => {
            const slug = slugify(product.productTitle, { lower: true });

            return (
              <C.ListItem
                position="relative"
                key={product.productId}
                listStyleType="none"
                cursor="pointer"
                bg="gray.700"
                flex="1"
                minH="120px"
                p="24px"
                transition="all 0.2s ease-in-out"
                _notLast={{
                  marginBottom: "16px",
                }}
                _hover={{
                  bg: "gray.600",
                }}
                borderRadius="8px"
                onClick={() => {
                  handleChangeCurrentProduct(product);
                  push(`/product/${slug}`);
                }}
              >
                <C.Flex flexDirection="column">
                  <C.Heading as="h3" fontSize={["12px", "20px"]}>
                    {product.productTitle}
                  </C.Heading>
                  <C.Text
                    fontSize={["12px", "14px"]}
                    position="absolute"
                    left="24px"
                    bottom="24px"
                    as="span"
                    mt="auto"
                    fontStyle="italic"
                  >
                    by {product.details[0].seller}
                  </C.Text>
                </C.Flex>
              </C.ListItem>
            );
          })}
        </C.List>
        <C.Heading as="h4" my="32px" fontSize={["14px", "18px"]}>
          Summary
        </C.Heading>
        <C.Flex
          sx={{
            "@media (max-width: 650px)": {
              flexDir: " column",
            },
          }}
        >
          <C.Stat my="12px">
            <C.StatLabel>Affiliate Sales</C.StatLabel>
            <C.StatNumber
              transition="color 0.2s ease-in-out"
              _hover={{
                color: "blue.300",
              }}
            >
              {toCurrency(data.totalValueByTypes.affiliateSales)}
            </C.StatNumber>
          </C.Stat>
          <C.Stat my="12px">
            <C.StatLabel>Producer Sales</C.StatLabel>
            <C.StatNumber
              transition="color 0.2s ease-in-out"
              _hover={{
                color: "blue.300",
              }}
            >
              {toCurrency(data.totalValueByTypes.producerSales)}
            </C.StatNumber>
          </C.Stat>
          <C.Stat my="12px">
            <C.StatLabel>Commission Paid</C.StatLabel>
            <C.StatNumber
              transition="color 0.2s ease-in-out"
              _hover={{
                color: "blue.300",
              }}
            >
              {toCurrency(data.totalValueByTypes.commisionPaid)}
            </C.StatNumber>
          </C.Stat>
          <C.Stat my="12px">
            <C.StatLabel>Commission Received</C.StatLabel>
            <C.StatNumber
              transition="color 0.2s ease-in-out"
              _hover={{
                color: "blue.300",
              }}
            >
              {toCurrency(data.totalValueByTypes.commissionReceived)}
            </C.StatNumber>
          </C.Stat>
        </C.Flex>
      </>
    );
  }, [data, handleChangeCurrentProduct, isEmpty, push]);

  return (
    <Layout title="Home" description="Hubla's homepage">
      {authenticatedUser.name ? (
        <C.Heading as="h2" mb="32px" color="white.300">
          Welcome,{" "}
          <C.Text as="strong" color="blue.300">
            {authenticatedUser.name}
          </C.Text>
          !
        </C.Heading>
      ) : (
        <C.Spinner size="lg" mb="32px" />
      )}
      {data.transactions && (
        <C.Flex mb="32px" justify={["center", "flex-end"]}>
          <C.Button
            display="flex"
            justifyContent="center"
            alignItems="center"
            variant="unstyled"
            leftIcon={<MdClose size="18px" />}
            w={["100%", "180px"]}
            h="56px"
            bg="gray.700"
            border="1px solid"
            borderColor="gray.700"
            _hover={{
              borderColor: "red.600",
              bg: "gray.600",
            }}
            onClick={() => handleChangeData({} as Transactions)}
          >
            <C.Text fontSize={["12px", "14px"]}>Clear</C.Text>
          </C.Button>
        </C.Flex>
      )}
      {homeContent}
    </Layout>
  );
};

export default Home;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
