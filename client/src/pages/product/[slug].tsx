import { Layout, Table } from "components";
import { useTransactions } from "context";
import * as C from "@chakra-ui/react";
import { useMemo } from "react";
import { useRouter } from "next/router";

import { DetailsTransactionClassifiedByProduct } from "@types";
import { withSSRAuth } from "utils/auth/withSSRAuth";

const columns: ColumnDefinitionType<
  DetailsTransactionClassifiedByProduct,
  keyof DetailsTransactionClassifiedByProduct
>[] = [
  {
    key: "seller",
    title: "Name",
  },

  {
    key: "type",
    title: "Type",
  },
  {
    key: "price",
    title: "Price",
    isNumber: true,
  },
  {
    key: "date",
    title: "Date",
  },
];

const Product = () => {
  const { data, currentProduct } = useTransactions();
  const { push } = useRouter();

  const isEmpty = !data.transactions || !data.transactions.products.length;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-br", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toCurrency = (
    value: number,
    formatOptions = {
      style: "currency",
      currency: "BRL",
    }
  ) => {
    return new Intl.NumberFormat("pt-br", formatOptions).format(value);
  };

  const setType = (type: number) => {
    const TYPES = {
      [1]: "Producer Seller",
      [2]: "Affiliate Seller",
      [3]: "Commission Paid",
      [4]: "Commission Received",
    };

    const COLOR_TYPES = {
      [1]: "red.400",
      [2]: "yellow.400",
      [3]: "blue.400",
      [4]: "green.400",
    };

    return {
      type: TYPES[type],
      color: COLOR_TYPES[type],
    };
  };

  const productContent = useMemo(() => {
    if (isEmpty && typeof window !== "undefined") {
      push("/");
    }

    if (!isEmpty) {
      const productIndex = data.transactions.products.findIndex(
        (product) => product.productId === currentProduct.productId
      );

      return (
        <>
          <C.Heading as="h2" mb="32px" color="white">
            {currentProduct.productTitle}
          </C.Heading>
          <Table
            data={data.transactions.products[productIndex].details}
            columns={columns}
            customRenderers={{
              price: ({ price }) => <>{toCurrency(price)}</>,
              date: ({ date }) => <>{formatDate(date)}</>,
              type: ({ type }) => (
                <C.Badge
                  bg={setType(type).color}
                  color="white"
                  minW="130px"
                  textAlign="center"
                  py="8px"
                >
                  {setType(type).type}
                </C.Badge>
              ),
            }}
          />
        </>
      );
    }
  }, [isEmpty, push, data, currentProduct]);

  return (
    <Layout title={currentProduct.productTitle} description="">
      {productContent}
    </Layout>
  );
};
export default Product;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
