import * as C from "@chakra-ui/react";
import { CARDS_ANIMATION, TRANSITION } from "animations";
import { useAuth } from "context";
import { motion } from "framer-motion";

import { MdExitToApp } from "react-icons/md";
import Link from "next/link";

const MotionFlex = motion<Omit<C.FlexProps, "transition">>(C.Flex);

export const Header = () => {
  const { isOpen, onOpen, onClose } = C.useDisclosure();
  const { authenticatedUser, signOut } = useAuth();

  return (
    <>
      <MotionFlex
        w="100%"
        h="56px"
        bg="gray.700"
        borderRadius="6px"
        p="12px 24px"
        align="center"
        justify="space-between"
        mb="32px"
        variants={CARDS_ANIMATION}
        transition={TRANSITION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
      >
        <Link passHref href="/">
          <C.Text
            cursor="pointer"
            as="h1"
            fontSize={["1xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tight"
          >
            Hubla
            <C.Text as="span" ml="2px" color="blue.400">
              .
            </C.Text>
          </C.Text>
        </Link>
        <C.Flex>
          <C.Menu>
            <C.MenuButton zIndex="999">
              <C.Avatar
                cursor="pointer"
                w="32px"
                h="32px"
                ml="16px"
                name={authenticatedUser.name}
              />
            </C.MenuButton>
            <C.MenuList>
              <C.MenuItem
                color="gray.600"
                icon={<MdExitToApp size="16px" />}
                onClick={onOpen}
              >
                Logout
              </C.MenuItem>
            </C.MenuList>
          </C.Menu>
        </C.Flex>
      </MotionFlex>

      <C.Modal isOpen={isOpen} onClose={onClose}>
        <C.ModalOverlay />
        <C.ModalContent bg="gray.600">
          <C.ModalHeader>Confirmation</C.ModalHeader>
          <C.ModalCloseButton />
          <C.ModalBody>Are you sure that want to logout?</C.ModalBody>
          <C.ModalFooter>
            <C.Button
              variant="solid"
              bg="green.400"
              _hover={{
                bg: "green.500",
              }}
              fontSize={["12px", "16px"]}
              p="12px"
              type="submit"
              onClick={signOut}
            >
              Yes
            </C.Button>
          </C.ModalFooter>
        </C.ModalContent>
      </C.Modal>
    </>
  );
};
