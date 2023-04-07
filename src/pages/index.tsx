import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import TypewriterHeading from "../components/TypewriterHeading";

const Index = () => (
  <Container height="100vh">
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <TypewriterHeading />
    </Flex>
    <Main>
      
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontFamily="mono">By 0xjjpa</Text>
    </Footer>
    <CTA />
  </Container>
);

export default Index;
