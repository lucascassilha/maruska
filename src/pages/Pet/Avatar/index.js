import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '~/components/Button/index';
import { editPicture } from '~/store/modules/pets/actions';
import translate from '~/locales';

import {
  Container,
  PictureBox,
  PictureButton,
  Label,
  PetImage,
} from './styles';

export default function Avatar({ route, navigation }) {
  const { petID } = route.params;
  const [picture, setPicture] = useState(null);

  const { width } = Dimensions.get('window');

  const dispatch = useDispatch();

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      allowsEditing: true,
      maxWidth: 500,
      maxHeight: 500,
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setPicture(response.data);
      }
    });
  };

  const handlePictureUpload = () => {
    dispatch(editPicture(picture, petID));
    navigation.navigate('Home');
  };

  return (
    <Container>
      {!picture ? (
        <>
          <PictureButton onPress={handleSelectImage}>
            <PictureBox>
              <LottieView
                source={require('~/assets/animations/camera.json')}
                autoPlay
                loop
              />
            </PictureBox>
          </PictureButton>
        </>
      ) : (
        <>
          <PictureButton onPress={handleSelectImage}>
            <PetImage
              width={width - 40}
              source={{
                uri: `data:image/*;base64,${picture}`,
              }}
            />
          </PictureButton>
        </>
      )}
      {!picture ? null : (
        <Label>
          {`${translate('wow')} ${petID} ${translate('looksGreat')}`}
        </Label>
      )}
      <Button
        onPress={handlePictureUpload}
        title={translate('saveLabel')}
        disabled={!picture}
      />
    </Container>
  );
}

Avatar.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
