import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Box, Button, Label, Version } from './styles';

import Maruska from '~/components/MaruskaLogo/index';

export default function Settings() {
  return (
    <Container>
      <Maruska />
      <Box>
        <Button>
          <Icon name="trash-can" color="#fff" size={25} />
          <Label>Reset Informations</Label>
        </Button>
        <Button>
          <Icon name="share" color="#fff" size={25} />
          <Label>Share the app</Label>
        </Button>
        <Button>
          <Icon name="bug" color="#fff" size={25} />
          <Label>Report a bug</Label>
        </Button>
        <Button>
          <Icon name="star" color="#fff" size={25} />
          <Label>Rate us</Label>
        </Button>
        <Button>
          <Icon name="thumb-up" color="#fff" size={25} />
          <Label>Acknowledgments</Label>
        </Button>
      </Box>
      <Version>2020 - v2.0.0</Version>
    </Container>
  );
}
