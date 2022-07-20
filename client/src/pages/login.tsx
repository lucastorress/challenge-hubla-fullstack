import Head from 'next/head';
import * as C from '@chakra-ui/react';
import { Input } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'context/AuthContext';
import { withSSRGuest } from 'utils/auth/withSSRGuest';

export default function LoginComponent(): JSX.Element {
  const { signIn, signInFormSchema } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <>
      <Head>
        <title> Login | Hubla</title>
        <meta
          name="description"
          content="Hubla is a platform to manage transactions for products made in the producer and affiliate model."
        />
      </Head>
      <C.Center
        minH="100vh"
        py="20px"
        px={['20px', '40px']}
        flex="1"
        bg="transparent"
      >
        <C.Box maxW="100%" w="480px">
          <C.Heading color="white.400" mb="32px">
            Hubla | Login
          </C.Heading>
          <C.VStack as="form" spacing="16px" onSubmit={handleSubmit(signIn)}>
            <Input
              name="email"
              type="email"
              error={errors.email}
              label="Email"
              {...register('email')}
            />
            <Input
              autoComplete="current-password"
              name="password"
              error={errors.password}
              {...register('password')}
              label="Password"
            />
            <C.Button
              variant="solid"
              bg="blue.400"
              _hover={{
                bg: 'blue.500',
              }}
              fontSize={['12px', '16px']}
              h={['auto', '56px']}
              p="12px"
              width="100%"
              type="submit"
              isLoading={isSubmitting}
            >
              Enter
            </C.Button>
          </C.VStack>
        </C.Box>
      </C.Center>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
