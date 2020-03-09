import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import changeStatus from '~/store/modules/modalVisible/actions';
import addPet from '~/store/modules/pets/actions';

import {
  Wrapper,
  Container,
  Box,
  Scroll,
  Title,
  ButtonInput,
  Label,
  InputLabel,
  Input,
  CheckHolder,
  Submit,
  SubmitTitle,
  CancelHolder,
  Instruction,
  CancelLabel,
} from './styles';

export default function AddModal() {
  const visible = useSelector(state => state.modal);
  const pets = useSelector(state => state.pets.data);
  const [undefDate, setUndef] = useState(false);

  const [name, setName] = useState(null);
  const [breed, setBreed] = useState(null);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(changeStatus());
  };

  const breedInput = useRef();

  const handleAddPet = () => {
    pets.map(item => {
      if (item.name === name) {
        return Alert.alert(
          'Maruska',
          "You can't add two pets with the same name!"
        );
      }
    });

    const pet = {
      name,
      breed,
    };

    dispatch(addPet(pet));
  };

  return (
    <Wrapper visible={visible[0]} transparent animationType="slide">
      <Container>
        <Box>
          <Scroll showsVerticalScrollIndicator={false}>
            <Title>Add a pet </Title>
            <ButtonInput>
              <Label>Kind</Label>
            </ButtonInput>
            <ButtonInput>
              <Label>Select the sex</Label>
            </ButtonInput>
            <ButtonInput disabled={undefDate}>
              <Label>Select date of birth</Label>
            </ButtonInput>
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
                <Input keyboardType="number-pad" maxLength={2} />
                <InputLabel>Months</InputLabel>
                <Input keyboardType="number-pad" maxLength={2} />
              </>
            ) : null}
            <InputLabel>Name</InputLabel>
            <Input onChangeText={setName} returnKeyType="next" />
            <InputLabel>Breed (optional)</InputLabel>
            <Input
              onChangeText={setBreed}
              ref={breedInput}
              returnKeyType="next"
            />
            <Submit>
              <SubmitTitle>Add pet</SubmitTitle>
            </Submit>
            <CancelHolder onPress={handleClose}>
              <CancelLabel>Cancel</CancelLabel>
            </CancelHolder>
          </Scroll>
        </Box>
      </Container>
    </Wrapper>
  );
}

AddModal.propTypes = {
  visible: PropTypes.bool,
};
AddModal.defaultProps = {
  visible: false,
};
