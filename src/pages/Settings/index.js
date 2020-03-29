import React from 'react';

import { Alert, Linking, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Button, Label, Version, IconHolder } from './styles';
import translate from '~/locales';

import Maruska from '~/components/MaruskaLogo/index';

export default function Settings() {
  const weight = useSelector(state => state.weight);

  const handleEmail = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy - HH:mm');
    Linking.openURL(
      `mailto:lcdevpetcare@gmail.com?subject=BugReport ${formattedDate}`
    );
  };

  const handleAlert = () => {
    Alert.alert(translate('supportersLabel'), translate('supportersList'));
  };

  const handleLink = () => {
    Linking.openURL('https://ko-fi.com/lcdev');
  };

  const dispatch = useDispatch();
  const handleChangeUnit = () => {
    const changeUnit = () => {
      return {
        type: '@weight/CHANGE',
      };
    };
    dispatch(changeUnit());
  };

  return (
    <Container>
      <Maruska />
      <Box>
        <Button
          onPress={() =>
            Share.share({
              title: `Maruska - ${translate('appForYoutPet')}`,
              message: `${translate(
                'checkOut'
              )} app: https://play.google.com/store/apps/details?id=com.lcdev.maruska`,
            })
          }
        >
          <IconHolder color="#eb3349">
            <Icon name="share" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('shareTheApp')}</Label>
        </Button>
        <Button onPress={handleEmail}>
          <IconHolder color="#6E33EB">
            <Icon name="bug" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('reportBug')}</Label>
        </Button>
        <Button
          onPress={() =>
            Linking.openURL('market://details?id=com.lcdev.maruska')
          }
        >
          <IconHolder color="#33EBBF">
            <Icon name="star" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('rateUs')}</Label>
        </Button>
        <Button onPress={handleAlert}>
          <IconHolder color="#EBE433">
            <Icon name="account-multiple" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('supporters')}</Label>
        </Button>
        <Button onPress={handleChangeUnit}>
          <IconHolder color="#E733EB">
            <Icon name="weight" color="#fff" size={20} />
          </IconHolder>
          <Label>{`${translate('changeUnit')} - ${weight} `}</Label>
        </Button>
        <Button onPress={handleLink}>
          <IconHolder color="#33BFEB">
            <Icon name="coffee" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('coffee')}</Label>
        </Button>
        <Version>alpha 0.1.3</Version>
        <Version>LCdev - 2020</Version>
      </Box>
    </Container>
  );
}
