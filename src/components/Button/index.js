import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Label } from './styles';

export default function Button({ title, onPress, disabled }) {
  return (
    <Wrapper onPress={onPress} disabled={disabled}>
      <Label>{title}</Label>
    </Wrapper>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  title: '',
  disabled: false,
};
