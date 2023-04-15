import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export const PasskeyManager = () => {
  return (
    <IconButton
      position="fixed"
      top={4}
      left={4}
      icon={<AddIcon />}
      aria-label="Load Passkey"
    />
  );
}