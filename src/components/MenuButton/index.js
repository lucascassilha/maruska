import React from 'react';
import PropTypes from 'prop-types';

import { Container, Label, Logo } from './styles';

const MenuButton = ({ onPress, title, image, color }) => {
  return (
    <Container onPress={onPress} color={color}>
      <Logo source={image} />
      <Label>{title}</Label>
    </Container>
  );
};

export default MenuButton;

MenuButton.propTypes = {
  onPress: PropTypes.oneOfType([PropTypes.func]).isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
