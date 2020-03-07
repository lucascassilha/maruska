import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Maruska from '~/components/MaruskaLogo/index';
import {
  Container,
  NotifList,
  Box,
  PetTitle,
  Description,
  InfoHolder,
  InfoBox,
  InfoLabel,
} from './styles';

export default function Notifications() {
  const [notList, setList] = useState([{ id: 1 }, { id: 2 }]);

  return (
    <Container>
      <Maruska />
      <NotifList
        data={notList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <PetTitle>Cacau</PetTitle>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Description>
            <InfoHolder>
              <InfoBox>
                <Icon name="calendar" size={20} color="#fff" />
                <InfoLabel>14/02/2020</InfoLabel>
              </InfoBox>
              <InfoBox>
                <Icon name="clock" size={20} color="#fff" />
                <InfoLabel>16:00</InfoLabel>
              </InfoBox>
            </InfoHolder>
          </Box>
        )}
      />
    </Container>
  );
}
