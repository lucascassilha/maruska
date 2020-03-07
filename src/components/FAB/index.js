import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from './styles';

export default function FAB({ onPress }) {
  return (
    <Button onPress={onPress}>
      <Icon name="plus" size={25} color="#fff" />
    </Button>
  );
}

FAB.propTypes = {
  onPress: PropTypes.func.isRequired,
};
