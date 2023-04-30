import {
  Box,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import MainHeading from "../components/MainHeading";
import { PasskeyManager } from "../components/PasskeyManager";
import { PasskeyFooter } from "../components/PasskeyFooter";
import { PasskeyCode } from "../components/PasskeyCode";


const Index = () => (
  <Container height="100vh">
    <Flex justifyContent="center" alignItems="center" height="100vh" direction="column">
      <Box mb="5" mx="auto">
        <Image
          alt="Passkeys.is"
          width={36}
          height={18}
          src="/passkeys.svg"
        />
      </Box>
      <MainHeading />
    </Flex>
    <Main>
      <Box mb="5">
        <Text mx="5" textAlign="center" mb="5">
          An introduction to everything Passkeys from a <PasskeyCode>developer</PasskeyCode> perspective.
        </Text>
        <Text mx="5" textAlign="center" fontSize="xs">
          For a more generic introduction, we recommend <Link isExternal href='https://passkeys.io'>Passkeys.io</Link>
        </Text>
      </Box>
      <CTA />
    </Main>

    <DarkModeSwitch />
    <PasskeyManager />
    <PasskeyFooter />

  </Container>
);

export default Index;
