import React, { useState } from 'react';

import { Alert, Linking, Share, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Button,
  Label,
  Version,
  IconHolder,
  Comment,
  Title,
  ModalContainer,
} from './styles';
import translate from '~/locales';
import terms from './terms';

import { darkMode } from '~/store/modules/account/actions';

export default function Settings({ navigation }) {
  const weight = useSelector(state => state.weight);
  const proAccount = useSelector(state => state.account.pro);
  const themeBoolean = !useSelector(state => state.account.darkMode);

  const [modalVisible, setVisible] = useState(false);

  const handleEmail = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy - HH:mm');
    Linking.openURL(
      `mailto:help@maruskapp.com?subject=Bug Report ${formattedDate}`
    );
  };

  const handleAlert = () => {
    Alert.alert(translate('supportersLabel'), translate('supportersList'));
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

  const handleTerms = () => {
    Alert.alert('Terms & conditions', terms);
  };

  const handlePrivacy = () => {
    Linking.openURL('https://lucaszawadneak.github.io/Maruska-Privacy-Policy/');
  };

  const handleDarkMode = () => {
    if (proAccount) {
      dispatch(darkMode());
    } else {
      Alert.alert('PRO FEATURE');
    }
  };

  return (
    <Container>
      <Box>
        <Title>{translate('config')}</Title>
        <Button onPress={() => navigation.navigate('Pro')}>
          <IconHolder color="#8ae3e6">
            <Icon name="star" color="#fff" size={20} />
          </IconHolder>
          <Label>Maruska PRO</Label>
        </Button>
        <Button onPress={handlePrivacy}>
          <IconHolder color="#eba833">
            <Icon name="file-document-box-multiple" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('privacy')}</Label>
        </Button>
        <Button onPress={handleTerms}>
          <IconHolder color="#42eb33">
            <Icon name="file-document" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('terms')}</Label>
        </Button>
        <Button
          onPress={() =>
            Share.share({
              title: `Maruska - ${translate('appForYourPet')}`,
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
        <Button onPress={handleEmail}>
          <IconHolder color="#6E33EB">
            <Icon name="bug" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('reportBug')}</Label>
        </Button>
        <Button onPress={handleAlert}>
          <IconHolder color="#EBE433">
            <Icon name="account-multiple" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('supporters')}</Label>
        </Button>
        <Button onPress={() => handleChangeUnit()}>
          <IconHolder color="#E733EB">
            <Icon name="weight" color="#fff" size={20} />
          </IconHolder>
          <Label>{`${translate('changeUnit')} (${weight}) `}</Label>
        </Button>
        <Button onPress={() => handleDarkMode()}>
          <IconHolder color={themeBoolean ? '#222327' : '#c4c4c4'}>
            <Icon name="sunglasses" color="#fff" size={20} />
          </IconHolder>
          <Label>
            {themeBoolean ? translate('darkMode') : translate('lightMode')}
          </Label>
        </Button>
        <Button onPress={() => Linking.openURL('https://lucaszawadneak.me/')}>
          <IconHolder color="#000">
            <Icon name="code-tags" color="#fff" size={20} />
          </IconHolder>
          <Label>{translate('developer')}</Label>
        </Button>
        <Version>v2.0.3</Version>
        <Version>NeakApps - 2020</Version>
        <Comment>{translate('byUsing')}</Comment>
      </Box>
    </Container>
  );
}
