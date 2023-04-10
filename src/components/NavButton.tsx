import React from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

export const NavButton = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Button as="a" {...props}>
        {children}
      </Button>
    </NextLink>
  );
};
