import { Layout, Loading } from 'components';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAuth, useTransactions } from 'context';
import * as C from '@chakra-ui/react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { withSSRAuth } from 'utils/auth/withSSRAuth';
import { MdRefresh } from 'react-icons/md';
import { Transactions } from '@types';

const DropzoneForm = dynamic(() => import('components/DropzoneForm'), {
  ssr: false,
  loading: () => <Loading />,
});

const Home = () => {
  const { authenticatedUser } = useAuth();
  const { data, handleChangeData, handleChangeCurrentProduct } =
    useTransactions();
  const { push } = useRouter();

  const isEmpty = !data.transactions?.products?.length;

  const homeContent = useMemo(() => {
    if (isEmpty) {
      return <DropzoneForm />;
    }

    return (
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
                marginBottom: '16px',
              }}
              _hover={{
                bg: 'gray.600',
              }}
              borderRadius="8px"
              onClick={() => {
                handleChangeCurrentProduct(product);
                push(`/product/${slug}`);
              }}
            >
              <C.Flex flexDirection="column">
                <C.Heading as="h3" fontSize={['12px', '20px']}>
                  {product.productTitle}
                </C.Heading>
                <C.Text
                  fontSize={['12px', '14px']}
                  position="absolute"
                  left="24px"
                  bottom="24px"
                  as="span"
                  mt="auto"
                  fontStyle="italic"
                >
                  {product.details[0].seller}
                </C.Text>
              </C.Flex>
            </C.ListItem>
          );
        })}
      </C.List>
    );
  }, [data, handleChangeCurrentProduct, isEmpty, push]);

  return (
    <Layout title="Home" description="Hubla's Homepage">
      <C.Heading as="h2" mb="32px" color="blue.400">
        Welcome, {authenticatedUser.name}!
      </C.Heading>
      {data.transactions && (
        <C.Flex mb="32px" justify={['center', 'flex-end']}>
          <C.Button
            display="flex"
            justifyContent="center"
            alignItems="center"
            variant="unstyled"
            leftIcon={<MdRefresh size="18px" />}
            w={['100%', '180px']}
            h="56px"
            bg="gray.700"
            borderColor="gray.50"
            _hover={{
              bg: 'gray.600',
            }}
            onClick={() => handleChangeData({} as Transactions)}
          >
            <C.Text fontSize={['12px', '14px']}>Clear</C.Text>
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
