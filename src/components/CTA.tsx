import { SimpleGrid, Icon } from '@chakra-ui/react'
import { NavButton } from './NavButton'
import { CiCircleInfo, CiMoneyBill, CiBoxList, CiFlag1 } from 'react-icons/ci'


export const CTA = () => (
  <SimpleGrid columns={[1, 2, 2, 2]} spacing={2} mt={8}>
    <NavButton
      href="/about"
      variant="ghost"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >

      <Icon as={CiCircleInfo} mr="2" /> About Passkeys
    </NavButton>
    <NavButton
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      variant="ghost"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      <Icon as={CiMoneyBill} mr="2" /> Passkeys & Crypto
    </NavButton>
    <NavButton
      href="/about"
      variant="ghost"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >

      <Icon as={CiBoxList} mr="2" /> Managing Passkeys
    </NavButton>
    <NavButton
      href="/about"
      variant="ghost"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >

      <Icon as={CiFlag1} mr="2" /> Passkeys' Caveats
    </NavButton>
  </SimpleGrid>
)
