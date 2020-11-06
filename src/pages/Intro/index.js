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
  const [currentPage, setPage] = useState(0);

  const dispatch = useDispatch();

  const setSliderPage = e => {
    const { x } = e.nativeEvent.contentOffset;
    let indexOfNextScreen = 1;
    const offsetPercentage = width * 0.4;
    if (x + width >= (width + offsetPercentage) * indexOfNextScreen) {
      indexOfNextScreen++;
    }
    if (x + width <= (width + offsetPercentage) * indexOfNextScreen) {
      indexOfNextScreen--;
    }
    if (indexOfNextScreen !== currentPage) {
      setPage(indexOfNextScreen);
    }
  };

  const handleBattery = () => {
    Linking.openSettings();
  };

  const handleHelp = () => {
    if (locale === 'pt_BR') {
      Alert.alert(
        'Retirando Maruska da economia de bateria',
        translate('ptBRTutorial')
      );
    } else {
      Linking.openURL('https://www.youtube.com/watch?v=rYxZWBlSdBE');
    }
  };

  useEffect(() => {
    if (currentPage === 2) {
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
  }, [currentPage]);

  const handleClose = () => {
    if (currentPage !== 0) {
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
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
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
        </Screen>
      </ScrollView>
      <DotsHolder>
        <ButtonHolder>
          <Icon name="close" color="#fff" size={25} />
        </ButtonHolder>
        <View style={{ flexDirection: 'row' }}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <Dot key={index} active={currentPage === index} />
          ))}
        </View>
        <ButtonHolder onPress={handleClose}>
          <Icon
            name="close"
            color={currentPage === 2 ? '#000' : '#fff'}
            size={25}
          />
        </ButtonHolder>
      </DotsHolder>
    </Container>
  );
};

export default Intro;
