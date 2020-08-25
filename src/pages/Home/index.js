import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { formatDistanceStrict, parseISO } from 'date-fns';
import { StatusBar, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import { ptBR, enUS } from 'date-fns/locale';
import Config from 'react-native-config';
import * as Animatable from 'react-native-animatable';

import translate, { locale } from '~/locales';
import changeStatus from '~/store/modules/modalVisible/actions';
import Modal from './AddModal';
import FAB from '~/components/FAB';

import HomeHeader from '~/components/HomeHeader';

import {
  Container,
  PetList,
  Box,
  PetImage,
  TextHolder,
  Name,
  Info,
  AnimationHolder,
  AnimationLabel,
} from './styles';

export default function Home({ navigation }) {
  const theme = !useSelector(state => state.account.darkMode);
  const proAccont = useSelector(state => state.account.pro);
  const firstLogin = useSelector(state => state.account.firstLogin);
  const pets = useSelector(state => state.pets.data);
  const [petData, setPetData] = useState([]);

  const dispatch = useDispatch();
  const handleOpen = async () => {
    const petsLenght = pets.length;
    if (petsLenght >= 2 && !proAccont) {
      Alert.alert(translate('proFeatureTitle'), translate('proPets'), [
        { text: 'Ok', onPress: () => navigation.navigate('Pro') },
        { text: translate('cancelButton') },
      ]);
      return 0;
    }

    dispatch(changeStatus(0));
  };

  useEffect(() => {
    const currentDate = new Date();
    if (pets && pets[0]) {
      const list = produce(pets, draft => {
        draft.map(item => {
          const parsedDate = parseISO(item.originalDate);
          const localeFNS = locale === 'pt_BR' ? ptBR : enUS;

          try {
            item.date = formatDistanceStrict(parsedDate, currentDate, {
              locale: localeFNS,
            });
          } catch (err) {
            item.date = formatDistanceStrict(item.originalDate, currentDate, {
              locale: localeFNS,
            });
          }
        });
      });
      setPetData(list);
    }
    if (!pets[0]) {
      setPetData([]);
    }
  }, [pets]);

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={theme ? 'dark-content' : 'light-content'}
      />
      <Modal />
      <FAB onPress={handleOpen} />
      <HomeHeader navigation={navigation} />
      <PetList
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <AnimationHolder>
            <LottieView
              style={{
                width: '70%',
                alignSelf: 'center',
              }}
              source={require('~/assets/animations/cat_waiting.json')}
              autoPlay
              loop
            />
            <AnimationLabel>{translate('noPetsYet')}</AnimationLabel>
            <AnimationLabel>{translate('clickToAddPet')}</AnimationLabel>
          </AnimationHolder>
        )}
        showsVerticalScrollIndicator={false}
        data={petData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInLeft">
            <Box onPress={() => navigation.navigate('Pet', { pet: item })}>
              <PetImage
                source={
                  item.avatar
                    ? { uri: `data:image/*;base64,${item.avatar}` }
                    : require('~/assets/img/icon.png')
                }
              />
              <TextHolder>
                <Name>{item.name}</Name>
                {item.sex === translate('sexOther') && !item.breed ? null : (
                  <Info>
                    {`${item.sex !== translate('sexOther') ? item.sex : ''} ${
                      item.breed ? item.breed : ''
                    }`}
                  </Info>
                )}
                <Info>{item.date}</Info>
              </TextHolder>
            </Box>
          </Animatable.View>
        )}
      />
      {proAccont ? null : (
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={Config.BANNER_KEY}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      )}
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
