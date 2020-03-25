import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO, isValid, isAfter } from 'date-fns';
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
  const notifications = useSelector(state => state.notifications.data);
  const [notList, setList] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const list = produce(notifications, draft => {
      draft
        .map(item => {
          let auxDate = item.date;
          if (!isValid(item.date)) {
            auxDate = parseISO(item.date);
          }
          const date = format(auxDate, 'dd/MM/yyyy');
          const time = format(auxDate, 'HH:mm');
          const isPast = isAfter(currentDate, auxDate);
          item.isPast = isPast;
          item.dateString = date;
          item.timeString = time;
        })
        .sort((a, b) => {
          const parsedA = parseISO(a.date);
          const parsedB = parseISO(b.date);
          return !isAfter(parsedA, parsedB);
        });
    });

    console.log(list[0].isPast);

    setList(list);
  }, [notifications]);

  return (
    <Container>
      <Maruska />
      <NotifList
        data={notList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box isPast={item.isPast}>
            <PetTitle>{item.petID}</PetTitle>
            <Description>{item.message}</Description>
            <InfoHolder>
              <InfoBox>
                <Icon name="calendar" size={20} color="#fff" />
                <InfoLabel>{item.dateString}</InfoLabel>
              </InfoBox>
              <InfoBox>
                <Icon name="clock" size={20} color="#fff" />
                <InfoLabel>{item.timeString}</InfoLabel>
              </InfoBox>
            </InfoHolder>
          </Box>
        )}
      />
    </Container>
  );
}
