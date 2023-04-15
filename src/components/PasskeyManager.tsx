import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Passkey } from "../lib/passkey";

export const PasskeyManager = () => {
  return (
    <IconButton
      position="fixed"
      top={4}
      left={4}
      icon={<AddIcon />}
      aria-label="Load Passkey"
      onClick={() => {
        Passkey.create({
          appName: 'Passkey',
          username: 'Demo Username'
        });
      }}
    />
  );
}