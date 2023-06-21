import { HamburgerIcon, SmallAddIcon, ViewIcon } from "@chakra-ui/icons";
import { Text, Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast, MenuGroup, Tag, Icon, Flex, SimpleGrid } from "@chakra-ui/react";
import { useLocalStorage } from 'usehooks-ts'

import { Passkey, truncate } from "../lib/passkey";
import { logger } from "../lib/logger";
import { CircleIcon } from "./atoms/CircleIcon";
import { Wallet } from "../lib/wallet";

export const PasskeyManager = () => {
  const toast = useToast()
  const [credentialRawIdAsBase64, setCredentialRawIdAsBase64] = useLocalStorage('credentialRawIdAsBase64', null)
  const [publicKeyAsHexString, setPublicKeyAsHexstring] = useLocalStorage('publicKeyAsHexString', null)
  const [credentialId, setCredentialId] = useLocalStorage('credentialId', null)
  const [walletAddress, setWalletAddress] = useLocalStorage('walletAddress', null)

  const createCredentialHandler = async ({ yubikeyOnly }: { yubikeyOnly?: boolean }) => {
    const { data: credential, response, error } = await Passkey.create({
      appName: 'Passkey',
      username: 'Demo Username',
      email: 'test@demo.com',
      yubikeyOnly
    });
    if (error) {
      logger.error('(🪪,❌) Error', error)
      toast({
        title: 'Error creating credential.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (credential) {
      logger.info('(🪪,✅) Credential', credential)
      toast({
        title: 'Credential created.',
        description: 'Your credential has been created.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      const rawIdAsBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(credential.rawId)))
      setCredentialId(credential.id)
      setCredentialRawIdAsBase64(rawIdAsBase64)
    }
    if (response) {
      const { data: publicKey } = Passkey.getPublicKeyFromAttestationResponse({ response } as { response: AuthenticatorAttestationResponse });
      const publicKeyAsCryptoKey = await Passkey.importPublicKeyAsCryptoKey(publicKey);
      const exported = await window.crypto.subtle.exportKey("jwk", publicKeyAsCryptoKey);
      logger.info('Public Key as Crypto Key and JWT', publicKeyAsCryptoKey, exported)
      const wallet = new Wallet(publicKeyAsCryptoKey)
      setWalletAddress(await wallet.getAddress());
      setPublicKeyAsHexstring(publicKeyAsHexString)
    }
  }

  const getAssertionHandler = async () => {
    const { data: assertion, response, error } = await Passkey.get({});
    if (error) {
      logger.error('(🪪,❌) Error', error)
      toast({
        title: 'Error retrieving assertion.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (assertion) {
      logger.info('(🪪,✅) Assertion', assertion)
      toast({
        title: 'Assertion obtained.',
        description: 'Your assertion has been retrieved.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      const signature = (response as AuthenticatorAssertionResponse).signature;
    }
  }

  return (
    <Box
      position="fixed"
      top={4}
      left={4}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
        />
        <MenuList>
          <MenuGroup title='Operations'>
            <MenuItem
              aria-label="Create Passkey"
              onClick={() => createCredentialHandler({})}
              icon={<SmallAddIcon />} command="test@demo.com">
              <Text>New Passkey</Text>
            </MenuItem>
            <MenuItem
              aria-label="Create Passkey"
              onClick={() => createCredentialHandler({ yubikeyOnly: true })}
              icon={<SmallAddIcon />} command="roaming@demo.com">
              <Text>New (Roaming) Passkey</Text>
            </MenuItem>
          </MenuGroup>
          <MenuItem
            aria-label="Load Passkey"
            onClick={getAssertionHandler}
            icon={<ViewIcon />} command="Any available">
            <Text>Load Passkey</Text>
          </MenuItem>
          <MenuGroup title='Current key'>
            {
              (credentialId && walletAddress) ?
                <MenuItem icon={<CircleIcon color='green.500' />}>
                  <SimpleGrid columns={1}>
                    <Text fontFamily='mono' fontSize='xs'>Credential Id: {credentialId}</Text>
                    <Text fontFamily='mono' fontSize='xs'>Public Key Account: {`0x${walletAddress}`}</Text>
                  </SimpleGrid>
                </MenuItem>
                :
                <MenuItem icon={<CircleIcon color='red.500' />}>
                  <Text fontFamily='mono' fontSize='xs'>No key available in local storage.</Text>
                </MenuItem>
            }
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}