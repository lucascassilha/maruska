import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';

import { Wrapper, Container, Title, HolderView, HeaderImage } from './styles';

const PageHeader = ({ navigation, title, icons, source, onDelete, onEdit }) => {
  let imageSource = '';
  if (source && icons) {
    imageSource = {
      uri: source,
    };
  } else if (source && !icons) {
    imageSource = source;
  } else {
    imageSource = require('~/assets/img/icon.png');
  }

  return (
    <Wrapper>
      <Animatable.View animation="flipInX" style={{ backgroundColor: '#fff' }}>
        <Container>
          <HolderView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color="#000" size={25} />
            </TouchableOpacity>
            <Title>{title}</Title>
          </HolderView>
          <HolderView>
            {icons ? (
              <>
                <TouchableOpacity onPress={onDelete}>
                  <Icon name="trash-can" color="#000" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onEdit}>
                  <Icon name="pencil" color="#000" size={20} />
                </TouchableOpacity>
              </>
            ) : null}
            <HeaderImage source={imageSource} />
          </HolderView>
        </Container>
      </Animatable.View>
    </Wrapper>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  icons: PropTypes.bool,
  onDelete: PropTypes.oneOfType([PropTypes.func]),
  onEdit: PropTypes.oneOfType([PropTypes.func]),
  source: PropTypes.oneOfType([PropTypes.string]),
};

PageHeader.defaultProps = {
  icons: false,
  onDelete: '',
  onEdit: '',
  source: undefined,
};
