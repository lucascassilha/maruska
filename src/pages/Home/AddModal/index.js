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
            <Title>Add a pet </Title>
            <InputLabel>Kind</InputLabel>
            <SelectorBox>
              <CheckHolder>
                <Checkbox
                  status={kind === 'Dog' ? 'checked' : 'unchecked'}
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setKind('Dog')}
                />
                <Icon
                  name="dog"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Dog</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  status={kind === 'Cat' ? 'checked' : 'unchecked'}
                  onPress={() => setKind('Cat')}
                />
                <Icon
                  name="cat"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Cat</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  status={kind === 'Other' ? 'checked' : 'unchecked'}
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setKind('Other')}
                />
                <Icon
                  name="duck"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Other</InputLabel>
              </CheckHolder>
            </SelectorBox>
            <InputLabel>Sex</InputLabel>
            <SelectorBox>
              <CheckHolder>
                <Checkbox
                  status={sex === 'Male' ? 'checked' : 'unchecked'}
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setSex('Male')}
                />
                <Icon
                  name="gender-male"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Male</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  status={sex === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => setSex('Female')}
                />
                <Icon
                  name="gender-female"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Female</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  status={sex === 'Other' ? 'checked' : 'unchecked'}
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setSex('Other')}
                />
                <Icon
                  name="gender-male-female"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>None of those</InputLabel>
              </CheckHolder>
            </SelectorBox>
            <InputLabel>Select the date of birth</InputLabel>
            <DateHolder disabled={undefDate}>
              <DatePicker
                date={date}
                onDateChange={setDate}
                mode="date"
                maximumDate={new Date()}
                locale="en"
              />
            </DateHolder>
            <CheckHolder>
              <Checkbox
                status={undefDate ? 'checked' : 'unchecked'}
                onPress={() => setUndef(!undefDate)}
                color="#eb3349"
                uncheckedColor="#eb3349"
              />
              <InputLabel>I don't know the exact date</InputLabel>
            </CheckHolder>
            {undefDate ? (
              <>
                <Instruction>Then please input an aproximate Date</Instruction>
                <InputLabel>Years</InputLabel>
                <Input
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={setYears}
                  onSubmitEditing={() => monthRef.current.focus()}
                  returnKeyType="next"
                />
                <InputLabel>Months</InputLabel>
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
            <InputLabel>Name</InputLabel>
            <Input
              onChangeText={setName}
              ref={nameRef}
              returnKeyType="next"
              onSubmitEditing={() => breedRef.current.focus()}
              maxLength={20}
            />
            <InputLabel>Breed (optional)</InputLabel>
            <Input
              onChangeText={setBreed}
              ref={breedRef}
              maxLength={20}
              returnKeyType="send"
              onSubmitEditing={handleAddPet}
            />
            <Button title="Add pet" onPress={handleAddPet} />
            <CancelHolder onPress={handleClose}>
              <CancelLabel>Cancel</CancelLabel>
            </CancelHolder>
          </Scroll>
        </Box>
      </Container>
    </Wrapper>
  );
}
