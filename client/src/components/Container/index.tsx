import { FunctionalComponent } from "@types";
import * as C from "@chakra-ui/react";
import { CONTAINER_ANIMATION, TRANSITION } from "animations";
import { motion } from "framer-motion";

export const MotionFlex = motion<Omit<C.FlexProps, "transition">>(C.Flex);

export const Container: React.FC<FunctionalComponent> = ({ children }) => {
  return (
    <C.Box
      maxW="100%"
      minH="100vh"
      position="relative"
      p={["16px 24px 24px", "42px 24px 24px"]}
      transition="padding 0.5s ease"
    >
      <MotionFlex
        display="block"
        as="main"
        m="0 auto"
        maxW="1180px"
        variants={CONTAINER_ANIMATION}
        transition={TRANSITION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
      >
        {children}
      </MotionFlex>
    </C.Box>
  );
};
