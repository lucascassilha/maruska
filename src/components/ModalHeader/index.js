import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, TitleImage, Title } from './styles';

const ModalHeader = ({ onPress, title, source }) => {
  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="chevron-left" color="#000" size={25} />
        </TouchableOpacity>
        <Title>{title}</Title>
      </View>
      <TitleImage source={source} />
    </Container>
  );
};

export default ModalHeader;
