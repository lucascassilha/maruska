import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Vibration, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import changeStatus from '~/store/modules/modalVisible/actions';
import { editPet } from '~/store/modules/pets/actions';
import Button from '~/components/Button';
import ModalHeader from '~/components/ModalHeader';
import translate from '~/locales';

import {
  Wrapper,
  Container,
  Box,
  Scroll,
  Title,
  TitleBox,
  TitleImage,
  InputLabel,
  Input,
} from './styles';

export default function EditPet({ petInformation }) {
  const visible = useSelector(state => state.modal);

  const [breed, setBreed] = useState(petInformation.breed || null);
  const [chip, setChip] = useState(petInformation.chip || null);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeStatus(2));
  };

  const handleEditPet = async () => {
    const schema = Yup.object().shape({
      chip: Yup.string().nullable(),
      breed: Yup.string().nullable(),
    });

    const pet = { breed, chip, name: petInformation.name };

    if (!(await schema.isValid(pet))) {
      Vibration.vibrate();
      return Alert.alert('Maruska', translate('missingInfo'));
    }
    dispatch(editPet(pet));

    handleClose();
    Alert.alert('Maruska', translate('reOpen'));
  };
  const chipRef = useRef();
  const breedRef = useRef();

  return (
    <Wrapper
      visible={visible[2]}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Container>
        <Box>
          <Scroll showsVerticalScrollIndicator={false}>
            <ModalHeader
              title={translate('editTitle')}
              onPress={handleClose}
              source={require('~/assets/img/editpet.png')}
            />
            <InputLabel>{translate('infoBreed')}</InputLabel>
            <Input
              value={breed}
              onChangeText={setBreed}
              returnKeyType="next"
              ref={breedRef}
              onSubmitEditing={() => chipRef.current.focus()}
              maxLength={20}
            />
            <InputLabel>{translate('chip')}</InputLabel>
            <Input
              value={chip}
              onChangeText={setChip}
              ref={chipRef}
              returnKeyType="send"
              onSubmitEditing={handleEditPet}
            />
            <Button onPress={handleEditPet} title={translate('editLabel')} />
          </Scroll>
        </Box>
      </Container>
    </Wrapper>
  );
}

EditPet.propTypes = {
  petInformation: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};
