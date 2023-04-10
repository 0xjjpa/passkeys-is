import { Link as ChakraLink, Button } from '@chakra-ui/react'
import { NavButton } from './NavButton'


import { Container } from './Container'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    py={3}
  >
    <NavButton
      as={ChakraLink}
      href="/about"
      variant="outline"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >
      About Passkeys
    </NavButton>
    <NavButton
      as={ChakraLink}
      isExternal
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      variant="solid"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      Passkeys & Crypto
    </NavButton>
  </Container>
)
