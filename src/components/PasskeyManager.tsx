import { AddIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Text, Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { useLocalStorage } from 'usehooks-ts'

import { Passkey } from "../lib/passkey";
import { logger } from "../lib/logger";

export const PasskeyManager = () => {
  const toast = useToast()
  const [credentialRawIdAsBase64, setCredentialRawIdAsBase64] = useLocalStorage('credentialRawIdAsBase64', null)
  const [credentialId, setCredentialId] = useLocalStorage('credentialId', null)

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
          <MenuItem
            aria-label="Load Passkey"
            onClick={async () => {
              const { data: credential, error } = await Passkey.create({
                appName: 'Passkey',
                username: 'Demo Username',
                email: 'test@demo.com'
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
            }}
            icon={<AddIcon />} command="test@demo.com">
            <Text>Create Passkey</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}