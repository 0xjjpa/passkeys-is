import { Text, Link, Flex } from "@chakra-ui/react";
import { LAST_UPDATED } from "../constants/lastUpdated";
import { Footer } from "./Footer";

export const PasskeyFooter = () => (
  <Footer>
    <Flex flexDir={'column'} alignItems={'center'}>
      <Text mb="4" fontFamily="mono">By <Link isExternal href='https://twitter.com/0xjjpa'>0xjjpa</Link>.</Text>
      <Text w="80%" textAlign={'center'} fontFamily="mono" fontSize="xs">{`Last updated - ${new Date(LAST_UPDATED)}`}</Text>
    </Flex>
  </Footer>

)