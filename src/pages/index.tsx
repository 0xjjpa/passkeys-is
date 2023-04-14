import {
  Link as ChakraLink,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import MainHeading from "../components/MainHeading";

const Index = () => (
  <Container height="100vh">
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <MainHeading />
    </Flex>
    <Main>
    <CTA />  
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontFamily="mono">By 0xjjpa.</Text>
    </Footer>
    
  </Container>
);

export default Index;
