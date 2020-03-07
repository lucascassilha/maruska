import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Maruska from '~/components/MaruskaLogo/index';

import FAB from '~/components/FAB/index';

import {
  Container,
  PetList,
  Box,
  PetImage,
  TextHolder,
  Name,
  Info,
} from './styles';

import logo from '~/assets/img/logo.png';

export default function Home() {
  const [pets, setPets] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Maruska source={logo} />
      <FAB
        onPress={() => {
          console.log('oi');
        }}
      />
      <PetList
        showsVerticalScrollIndicator={false}
        data={pets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <PetImage />
            <TextHolder>
              <Name>Cacau</Name>
              <Info>Female Basset</Info>
              <Info>1 year and 7 months</Info>
            </TextHolder>
          </Box>
        )}
      />
    </Container>
  );
}