import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import changeStatus from '~/store/modules/modalVisible/actions';
import { editPet } from '~/store/modules/pets/actions';
import Button from '~/components/Button/index';
import translate, { locale } from '~/locales';

import {
  Wrapper,
  Container,
  Box,
  Scroll,
  Title,
  InputLabel,
  Input,
  CheckHolder,
  CancelHolder,
  CancelLabel,
  DateHolder,
  Instruction,
} from './styles';

export default function EditPet({ petInformation, navigation }) {
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
            <Title>{translate('editTitle')}</Title>
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
            <CancelHolder onPress={handleClose}>
              <CancelLabel>{translate('cancelButton')}</CancelLabel>
            </CancelHolder>
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
