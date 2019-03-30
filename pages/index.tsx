import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Heading } from 'rebass';
import { Button } from '../client/components/Button';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default () => (
  <React.Fragment>
    <ul>
      <li>
        <Link href="/a" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          <a>b</a>
        </Link>
      </li>
      <li>
        <Title>Heyo</Title>
      </li>
    </ul>
    <Box>
      <Heading>Hello</Heading>
      <Button>Rebass</Button>
      <Button variant="primary">Rebass</Button>
      <Button variant="outline">Rebass</Button>
    </Box>
  </React.Fragment>
);
