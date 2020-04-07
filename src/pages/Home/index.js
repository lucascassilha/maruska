import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { formatDistanceStrict, parseISO } from 'date-fns';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { AdMobInterstitial } from 'react-native-admob';
import LottieView from 'lottie-react-native';
import { ptBR, enUS } from 'date-fns/locale';
import * as Animatable from 'react-native-animatable';
import Maruska from '~/components/MaruskaLogo/index';
import changeStatus from '~/store/modules/modalVisible/actions';
import Modal from './AddModal/index';
import translate, { locale } from '~/locales';

import FAB from '~/components/FAB/index';

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

import logo from '~/assets/img/logo.png';

export default function Home({ navigation }) {
  const pets = useSelector(state => state.pets.data);
  const [petDate, setPetData] = useState([]);

  const dispatch = useDispatch();
  const handleOpen = async () => {
    dispatch(changeStatus(0));
  };

  useEffect(() => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-7615541994083029/3957454243');
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

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
  }, [pets]);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Maruska source={logo} />
      <Modal />
      <FAB onPress={handleOpen} />
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
        data={petDate}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInLeft">
            <Box onPress={() => navigation.navigate('Pet', { pet: item })}>
              <PetImage
                nullImage={item.avatar}
                source={
                  item.avatar
                    ? { uri: `data:image/*;base64,${item.avatar}` }
                    : null
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
    </Container>
  );
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
