import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO, isValid, isAfter } from 'date-fns';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
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
  AnimationHolder,
} from './styles';

export default function Notifications() {
  const notifications = useSelector(state => state.notifications.data);
  const [notList, setList] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const list = produce(notifications, draft => {
      draft.map(item => {
        if (item.date) {
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
        }
      });
    });

    setList(list);
  }, [notifications]);

  return (
    <Container>
      <Maruska />
      <NotifList
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <AnimationHolder>
            <LottieView
              style={{ width: '100%' }}
              source={require('~/assets/animations/no_notifications.json')}
              autoPlay
              loop
            />
          </AnimationHolder>
        )}
        data={notList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInLeft">
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
          </Animatable.View>
        )}
      />
    </Container>
  );
}
