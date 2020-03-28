import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import changeStatus from '~/store/modules/modalVisible/actions';
import { addPet } from '~/store/modules/pets/actions';
import Button from '~/components/Button/index';
import translate, { locale } from '~/locales';

import {
  Wrapper,
  Container,
  Box,
  Scroll,
  Title,
  InputLabel,
  SelectorBox,
  Input,
  CheckHolder,
  CancelHolder,
  Instruction,
  CancelLabel,
  DateHolder,
} from './styles';

export default function AddModal() {
  const visible = useSelector(state => state.modal);
  const pets = useSelector(state => state.pets.data);
  const [undefDate, setUndef] = useState(false);

  const [date, setDate] = useState(new Date());
  const [kind, setKind] = useState(null);
  const [sex, setSex] = useState(null);
  const [name, setName] = useState(null);
  const [breed, setBreed] = useState(null);
  const [years, setYears] = useState(null);
  const [months, setMonths] = useState(null);

  const dispatch = useDispatch();

  const resetStates = () => {
    setDate(new Date());
    setSex(null);
    setKind(null);
    setName(null);
    setBreed(null);
    setMonths(null);
    setYears(null);
    setUndef(false);
  };
  const handleClose = () => {
    resetStates();
    dispatch(changeStatus(0));
  };

  const handleAddPet = async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      kind: Yup.string().required(),
      sex: Yup.string().required(),
      breed: Yup.string().nullable(),
      years: Yup.number()
        .positive()
        .nullable(),
      months: Yup.number()
        .max(12)
        .positive()
        .nullable()
        .when('years', (value, field) => (value ? field.required() : field)),
      date: Yup.string().when('years', (value, field) =>
        value ? field : field.required()
      ),
    });

    const pet = { name, kind, sex, date, years, months, breed };

    if (!(await schema.isValid(pet))) {
      return Alert.alert('Maruska', 'Invalid or missing information');
    }

    const findOne = pets.findIndex(item => item.name === name);

    if (findOne >= 0) {
      return Alert.alert(
        'Maruska',
        "You can't add a two pets with the same name"
      );
    }

    dispatch(addPet({ ...pet, avatar: null }));

    handleClose();
    resetStates();
  };

  const monthRef = useRef();
  const nameRef = useRef();
  const breedRef = useRef();

  return (
    <Wrapper
      visible={visible[0]}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Container>
        <Box>
          <Scroll showsVerticalScrollIndicator={false}>
            <Title>{translate('addPet')}</Title>
            <InputLabel>{translate('addKind')}</InputLabel>
            <SelectorBox>
              <CheckHolder>
                <Checkbox
                  status={
                    kind === translate('dogKind') ? 'checked' : 'unchecked'
                  }
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setKind(translate('dogKind'))}
                />
                <Icon
                  name="dog"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('dogKind')}</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  status={
                    kind === translate('catKind') ? 'checked' : 'unchecked'
                  }
                  onPress={() => setKind(translate('catKind'))}
                />
                <Icon
                  name="cat"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('catKind')}</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  status={
                    kind === translate('otherKind') ? 'checked' : 'unchecked'
                  }
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setKind(translate('otherKind'))}
                />
                <Icon
                  name="duck"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('otherKind')}</InputLabel>
              </CheckHolder>
            </SelectorBox>
            <InputLabel>{translate('addSex')}</InputLabel>
            <SelectorBox>
              <CheckHolder>
                <Checkbox
                  status={
                    sex === translate('sexMale') ? 'checked' : 'unchecked'
                  }
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setSex(translate('sexMale'))}
                />
                <Icon
                  name="gender-male"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('sexMale')}</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  status={sex === translate('sexFem') ? 'checked' : 'unchecked'}
                  onPress={() => setSex(translate('sexFem'))}
                />
                <Icon
                  name="gender-female"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('sexFem')}</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  status={
                    sex === translate('sexOther') ? 'checked' : 'unchecked'
                  }
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setSex(translate('sexOther'))}
                />
                <Icon
                  name="gender-male-female"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('sexOther')}</InputLabel>
              </CheckHolder>
            </SelectorBox>
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
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={setYears}
                  onSubmitEditing={() => monthRef.current.focus()}
                  returnKeyType="next"
                />
                <InputLabel>{translate('addMonths')}</InputLabel>
                <Input
                  keyboardType="number-pad"
                  maxLength={2}
                  ref={monthRef}
                  onSubmitEditing={() => nameRef.current.focus()}
                  onChangeText={setMonths}
                  returnKeyType="next"
                />
              </>
            ) : null}
            <InputLabel>{translate('addName')}</InputLabel>
            <Input
              onChangeText={setName}
              ref={nameRef}
              returnKeyType="next"
              onSubmitEditing={() => breedRef.current.focus()}
              maxLength={20}
            />
            <InputLabel>{translate('addBreed')}</InputLabel>
            <Input
              onChangeText={setBreed}
              ref={breedRef}
              maxLength={20}
              returnKeyType="send"
              onSubmitEditing={handleAddPet}
            />
            <Button title={translate('addButton')} onPress={handleAddPet} />
            <CancelHolder onPress={handleClose}>
              <CancelLabel>{translate('cancelButton')}</CancelLabel>
            </CancelHolder>
          </Scroll>
        </Box>
      </Container>
    </Wrapper>
  );
}
