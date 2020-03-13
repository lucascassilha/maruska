import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import changeStatus from '~/store/modules/modalVisible/actions';
import addPet from '~/store/modules/pets/actions';

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
  Submit,
  SubmitTitle,
  CancelHolder,
  CancelLabel,
} from './styles';

export default function AddModal() {
  const visible = useSelector(state => state.modal);

  const [city, setCity] = useState(null);
  const [kind, setKind] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const dispatch = useDispatch();

  const resetStates = () => {
    setPhone(null);
    setAddress(null);
    setKind(null);
  };
  const handleClose = () => {
    resetStates();
    dispatch(changeStatus(1));
  };

  const addressRef = useRef();
  const phoneRef = useRef();

  return (
    <Wrapper
      visible={visible[1]}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Container>
        <Box>
          <Scroll showsVerticalScrollIndicator={false}>
            <Title>Add a location </Title>
            <InputLabel>Kind</InputLabel>
            <SelectorBox>
              <CheckHolder>
                <Checkbox
                  status={kind === 'PetShop' ? 'checked' : 'unchecked'}
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  onPress={() => setKind('PetShop')}
                />
                <Icon
                  name="bone"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Pet Shop</InputLabel>
              </CheckHolder>
              <CheckHolder>
                <Checkbox
                  color="#eb3349"
                  uncheckedColor="#eb3349"
                  status={kind === 'Clinic' ? 'checked' : 'unchecked'}
                  onPress={() => setKind('Clinic')}
                />
                <Icon
                  name="hospital"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>Clinic</InputLabel>
              </CheckHolder>
            </SelectorBox>
            <InputLabel>City</InputLabel>
            <Input
              onChangeText={setCity}
              returnKeyType="next"
              onSubmitEditing={() => addressRef.current.focus()}
              maxLength={20}
            />
            <InputLabel>Address</InputLabel>
            <Input
              onChangeText={setAddress}
              ref={addressRef}
              onSubmitEditing={() => phoneRef.current.focus()}
              returnKeyType="next"
            />
            <InputLabel>Phone Number</InputLabel>
            <Input
              onChangeText={setPhone}
              ref={phoneRef}
              maxLength={15}
              keyboardType="number-pad"
              returnKeyType="send"
            />
            <Submit>
              <SubmitTitle>Add location</SubmitTitle>
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
