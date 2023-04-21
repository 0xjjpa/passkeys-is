import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import { useLocalStorage } from 'usehooks-ts'

import { Passkey } from "../lib/passkey";

export const PasskeyManager = () => {
  const toast = useToast()
  const [credentialRawId, setCredentialRawId] = useLocalStorage('credentialRawId', true)


  return (
    <IconButton
      position="fixed"
      top={4}
      left={4}
      icon={<AddIcon />}
      aria-label="Load Passkey"
      onClick={async () => {
        const { data, error } = await Passkey.create({
          appName: 'Passkey',
          username: 'Demo Username',
          email: 'test@demo.com'
        });
        if (error) {
          toast({
            title: 'Error creating credential.',
            description: error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }}
    />
  );
}