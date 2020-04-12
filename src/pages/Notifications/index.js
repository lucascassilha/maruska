import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO, isValid, isAfter } from 'date-fns';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { AdMobBanner } from 'react-native-admob';
import { clearPastNotifications } from '~/store/modules/notifications/actions';
import Maruska from '~/components/MaruskaLogo/index';
import { locale } from '~/locales';
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearPastNotifications());
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const list = produce(notifications, draft => {
      draft.map(item => {
        if (item.date) {
          let auxDate = item.date;
          if (!isValid(item.date)) {
            auxDate = parseISO(item.date);
          }
          const dateString = locale === 'en_US' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
          const timeString = locale === 'en_US' ? 'hh:mm aaaa' : 'HH:mm';

          const date = format(auxDate, dateString);
          const time = format(auxDate, timeString);
          const isPast = isAfter(currentDate, auxDate);
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
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-7615541994083029/1276434098"
        onAdFailedToLoad={error => console.error(error)}
      />
    </Container>
  );
}
