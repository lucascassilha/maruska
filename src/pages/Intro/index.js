import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Dimensions,
  StatusBar,
  View,
  Linking,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import translate, { locale } from '~/locales';
import { firstLogin } from '~/store/modules/account/actions';

import {
  Container,
  Screen,
  Title,
  SubTitle,
  ImageHolder,
  LogoHolder,
  DotsHolder,
  Dot,
  ButtonHolder,
  ProButtonHolder,
  ButtonLabel,
} from './styles';

const Intro = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const dispatch = useDispatch();

  const setSliderPage = e => {
    const { currentPage } = sliderState;
    const { x } = e.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  const handleBattery = () => {
    Linking.openSettings();
  };

  const handleHelp = () => {
    if (locale === 'pt_BR') {
      Linking.openURL(
        'https://www.tecmundo.com.br/android-marshmallow/90879-android-6-0-remova-apps-modo-economia-mantenha-notificacoes-ativas.htm'
      );
    } else {
      Linking.openURL('https://www.youtube.com/watch?v=rYxZWBlSdBE');
    }
  };

  useEffect(() => {
    if (pageIndex === 2) {
      Alert.alert(
        translate('introAlertTitle'),
        translate('introAlertDescription'),
        [
          { text: translate('understand') },
          { text: translate('helpMe'), onPress: handleHelp },
          {
            text: translate('goToSettings'),
            onPress: handleBattery,
          },
        ]
      );
    }
  }, [pageIndex]);

  const handleClose = () => {
    if (pageIndex === 2) {
      dispatch(firstLogin());
    }
  };

  const handlePurchase = () => {
    navigation.navigate('Pro');
    handleClose();
  };

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        hidden
        barStyle="dark-content"
      />
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={e => setSliderPage(e)}
      >
        <Screen width={width} height={height} color="#F9564F">
          <ImageHolder source={require('~/assets/img/screen1.jpg')} />
          <Title>{translate('screen1title')}</Title>
          <SubTitle>{translate('screen1')}</SubTitle>
        </Screen>
        <Screen width={width} height={height} color="#B33F62">
          <ImageHolder source={require('~/assets/img/screen2.jpg')} />
          <Title>{translate('screen2title')}</Title>
          <SubTitle>{translate('screen2')}</SubTitle>
          <ProButtonHolder onPress={handleBattery}>
            <ButtonLabel>{translate('goToSettings')}</ButtonLabel>
          </ProButtonHolder>
        </Screen>

        <Screen width={width} height={height} color="#0C0A3E">
          <LogoHolder source={require('~/assets/img/pro_white.png')} />
          <Title>{translate('screen3title')}</Title>
          <SubTitle>{translate('screen3')}</SubTitle>
          <ProButtonHolder onPress={handlePurchase}>
            <ButtonLabel>{translate('purchase')}</ButtonLabel>
          </ProButtonHolder>
        </Screen>
      </ScrollView>
      <DotsHolder>
        <ButtonHolder>
          <Icon name="close" color="#fff" size={25} />
        </ButtonHolder>
        <View style={{ flexDirection: 'row' }}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <Dot key={index} active={pageIndex === index} />
          ))}
        </View>
        <ButtonHolder onPress={handleClose}>
          <Icon
            name="close"
            color={pageIndex === 2 ? '#000' : '#fff'}
            size={25}
          />
        </ButtonHolder>
      </DotsHolder>
    </Container>
  );
};

export default Intro;
