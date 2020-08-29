import React from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, TitleImage, Title } from './styles';

const ModalHeader = ({ onPress, title, source }) => {
  const theme = !useSelector(state => state.account.darkMode);

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="chevron-left" color={theme ? '#000' : '#fff'} size={25} />
        </TouchableOpacity>
        <Title>{title}</Title>
      </View>
      <TitleImage source={source} />
    </Container>
  );
};

export default ModalHeader;
