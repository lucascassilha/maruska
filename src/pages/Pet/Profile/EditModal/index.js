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
  const [date, setDate] = useState(petInformation.originalDate);
  const [years, setYears] = useState(petInformation.originalYears || null);
  const [months, setMonths] = useState(petInformation.originalMonths || null);

  const [undefDate, setUndef] = useState(false);

  useEffect(() => {
    if (petInformation.originalYears) {
      setUndef(true);
    }
  }, [years]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeStatus(2));
  };

  const handleEditPet = async () => {
    const schema = Yup.object().shape({
      chip: Yup.string().nullable(),
      breed: Yup.string().nullable(),
      years: Yup.number()
        .positive()
        .nullable(),
      months: Yup.number()
        .max(12)
        .positive()
        .nullable(),
      date: Yup.string(),
    });

    const pet = { breed, chip, date, years, months, name: petInformation.name };

    if (!(await schema.isValid(pet))) {
      return Alert.alert('Maruska', 'Invalid or missing information!');
    }
    dispatch(editPet(pet));

    handleClose();
    Alert.alert(
      'Maruska',
      'Please open the pet screen again to see the changes!'
    );
  };

  const monthRef = useRef();
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
            <Title>Edit pet </Title>
            <InputLabel>{translate('selectBirth')}</InputLabel>
            <DateHolder disabled={undefDate}>
              <DatePicker
                date={date}
                onDateChange={setDate}
                mode="date"
                maximumDate={new Date()}
                locale={locale}
              />
            </DateHolder>
            <CheckHolder>
              <Checkbox
                status={undefDate ? 'checked' : 'unchecked'}
                onPress={() => setUndef(!undefDate)}
                color="#eb3349"
                uncheckedColor="#eb3349"
              />
              <InputLabel>{translate('undefDate')}</InputLabel>
            </CheckHolder>
            {undefDate ? (
              <>
                <Instruction>{translate('undefLabel')}</Instruction>
                <InputLabel>{translate('addYears')}</InputLabel>
                <Input
                  value={years}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={setYears}
                  onSubmitEditing={() => monthRef.current.focus()}
                  returnKeyType="next"
                />
                <InputLabel>{translate('addMonths')}</InputLabel>
                <Input
                  value={months}
                  keyboardType="number-pad"
                  maxLength={2}
                  ref={monthRef}
                  onChangeText={setMonths}
                  onSubmitEditing={() => breedRef.current.focus()}
                  returnKeyType="next"
                />
              </>
            ) : null}
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
