import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { AdMobBanner } from 'react-native-admob';
import Config from 'react-native-config';

import changeStatus from '~/store/modules/modalVisible/actions';
import Modal from './AddModal/index';
import { deleteLocation } from '~/store/modules/places/actions';
import translate from '~/locales';

import {
  Container,
  PlaceList,
  Box,
  Name,
  Info,
  ButtonHolder,
  Button,
  TextHolder,
  AnimationHolder,
  AnimationLabel,
  Title,
} from './styles';
import FAB from '~/components/FAB/index';

export default function Places({ navigation }) {
  const places = useSelector(state => state.places.data);
  const proAccont = useSelector(state => state.account.pro);

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(changeStatus(1));
  };

  const handleCall = phone => {
    const url = `tel://${phone}`;
    Linking.openURL(url);
  };

  const handleMaps = (address, city) => {
    const url = `geo://0,0?q=${address} - ${city}`;
    Linking.openURL(url);
  };

  const handleDelete = ID => {
    Alert.alert(translate('areYouSure'), translate('notGetInfoBack'), [
      {
        text: translate('sure'),
        onPress: () => {
          dispatch(deleteLocation(ID));
        },
      },
      { text: translate('cancelButton') },
    ]);
  };

  return (
    <Container>
      <FAB onPress={handleOpen} />
      <Modal />
      <Title>{translate('places')}</Title>
      <PlaceList
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
                marginBottom: -40,
              }}
              source={require('~/assets/animations/sqr.json')}
              autoPlay
              loop
            />
            <AnimationLabel>{translate('noPlaces')}</AnimationLabel>
            <AnimationLabel>{translate('clickToAddPet')}</AnimationLabel>
          </AnimationHolder>
        )}
        data={places}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Animatable.View animation="slideInLeft">
            <Box>
              <TextHolder>
                <Name>{item.name}</Name>
                <Info>
                  {`${item.kind === translate('clinic') ? '🏥' : '🛍️'} ${
                    item.kind
                  }`}
                </Info>
                <Info>{item.city}</Info>
              </TextHolder>
              <ButtonHolder>
                <Button onPress={() => handleCall(item.phone)}>
                  <Icon name="phone" size={28} color="#fff" />
                </Button>
                <Button onPress={() => handleMaps(item.address, item.city)}>
                  <Icon name="car" size={28} color="#fff" />
                </Button>
                <Button onPress={() => handleDelete(item.name)}>
                  <Icon name="trash-can" size={28} color="#fff" />
                </Button>
              </ButtonHolder>
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
