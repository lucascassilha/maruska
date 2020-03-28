import React from 'react';

import { Alert, Linking, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { Container, Box, Button, Label, Version } from './styles';

import Maruska from '~/components/MaruskaLogo/index';

export default function Settings() {
  const handleEmail = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy - HH:mm');
    Linking.openURL(
      `mailto:support@example.com?subject=BugReport${formattedDate}`
    );
  };

  const handleAlert = () => {
    Alert.alert(
      'These people supported our project!',
      `Pet Menu icons from FlatIcon \nProject assets from romannurik`
    );
  };

  const handleLink = () => {
    Linking.openURL('https://ko-fi.com/lcdev');
  };

  return (
    <Container>
      <Maruska />
      <Box>
        <Button
          onPress={() =>
            Share.share({
              title: 'Maruska - The app for your pets!',
              message:
                'Check out this app: https://play.google.com/store/apps/details?id=com.lcdev.maruska',
            })
          }
        >
          <Icon name="share" color="#fff" size={25} />
          <Label>Share the app</Label>
        </Button>
        <Button onPress={handleEmail}>
          <Icon name="bug" color="#fff" size={25} />
          <Label>Report a bug</Label>
        </Button>
        <Button
          onPress={() =>
            Linking.openURL('market://details?id=com.lcdev.maruska')
          }
        >
          <Icon name="star" color="#fff" size={25} />
          <Label>Rate us</Label>
        </Button>
        <Button onPress={handleAlert}>
          <Icon name="account-multiple" color="#fff" size={25} />
          <Label>Acknowledgments</Label>
        </Button>
        <Button onPress={handleLink}>
          <Icon name="coffee" color="#fff" size={25} />
          <Label>Buy me a coffee</Label>
        </Button>
        <Version>alpha 0.1.2</Version>
        <Version>LCdev - 2020</Version>
      </Box>
    </Container>
  );
}
