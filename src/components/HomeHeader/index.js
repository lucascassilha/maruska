import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Logo, Not, Ball } from './styles';

const Header = ({ navigation }) => {
  const theme = !useSelector(state => state.account.darkMode);
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
      <Logo
        source={
          theme
            ? require('../../assets/img/logo.png')
            : require('../../assets/img/logo_white.png')
        }
      />
      <Not onPress={() => navigation.navigate('Notifications')}>
        <Ball empty={notEmpty} />
        <Icon name="bell" size={24} color={theme ? '#470000' : '#fff'} />
      </Not>
    </Container>
  );
};

export default Header;
