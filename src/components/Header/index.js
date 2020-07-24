import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Logo, Not, Ball } from './styles';

const Header = ({ navigation }) => {
  const notifications = useSelector(state => state.notifications.data.length);
  const [notEmpty, setEmpty] = useState(true);

  useEffect(() => {
    if (notifications > 0) {
      setEmpty(false);
    } else if (notifications === 0) {
      setEmpty(true);
    }
  }, [notifications]);

  return (
    <Container>
      <Logo source={require('../../assets/img/logo.png')} />
      <Not onPress={() => navigation.navigate('Notifications')}>
        <Ball empty={notEmpty} />
        <Icon name="bell" size={24} color="#470000" />
      </Not>
    </Container>
  );
};

export default Header;
