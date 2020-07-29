import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Wrapper, Label } from './styles';

export default function Button({ title, onPress, disabled, secondary }) {
  return (
    <Wrapper onPress={onPress} disabled={disabled} secondary={secondary}>
      <Icon name="paw" color="#fff" size={25} />
      <Label>{title}</Label>
    </Wrapper>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  title: '',
  disabled: false,
  secondary: false,
};
