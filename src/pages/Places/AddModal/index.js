import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import changeStatus from '~/store/modules/modalVisible/actions';
import { addLocation } from '~/store/modules/places/actions';
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
  CancelLabel,
} from './styles';

export default function AddModal() {
  const visible = useSelector(state => state.modal);
  const locations = useSelector(state => state.places.data);

  const [city, setCity] = useState(null);
  const [name, setName] = useState(null);
  const [kind, setKind] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const dispatch = useDispatch();

  const resetStates = () => {
    setPhone(null);
    setAddress(null);
    setKind(null);
    setCity(null);
    setName(null);
  };
  const handleClose = () => {
    resetStates();
    dispatch(changeStatus(1));
  };

  const handleAddLocation = async () => {
    const schema = Yup.object().shape({
      phone: Yup.string().required(),
      address: Yup.string().required(),
      city: Yup.string().required(),
      kind: Yup.string().required(),
      name: Yup.string().required(),
    });

    const location = { phone, address, city, kind, name };

    if (!(await schema.isValid(location))) {
      return Alert.alert('Maruska', translate('missingInfo'));
    }

    const findIndex = locations.findIndex(item => item.name === name);

    if (findIndex >= 0) {
      return Alert.alert('Maruksa', translate('doubleLocation'));
    }

    dispatch(addLocation(location));

    handleClose();
    resetStates();
  };

  const cityRef = useRef();
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
                  status={
                    kind === translate('clinic') ? 'checked' : 'unchecked'
                  }
                  onPress={() => setKind(translate('clinic'))}
                />
                <Icon
                  name="hospital"
                  color="#eb3349"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <InputLabel>{translate('clinic')}</InputLabel>
              </CheckHolder>
            </SelectorBox>
            <InputLabel>{translate('name')}</InputLabel>
            <Input
              onChangeText={setName}
              returnKeyType="next"
              onSubmitEditing={() => cityRef.current.focus()}
              maxLength={20}
            />
            <InputLabel>{translate('city')}</InputLabel>
            <Input
              onChangeText={setCity}
              returnKeyType="next"
              ref={cityRef}
              onSubmitEditing={() => addressRef.current.focus()}
              maxLength={20}
            />
            <InputLabel>{translate('address')}</InputLabel>
            <Input
              onChangeText={setAddress}
              ref={addressRef}
              onSubmitEditing={() => phoneRef.current.focus()}
              returnKeyType="next"
            />
            <InputLabel>{translate('phoneNumber')}</InputLabel>
            <Input
              onChangeText={setPhone}
              ref={phoneRef}
              maxLength={15}
              keyboardType="number-pad"
              returnKeyType="send"
              onSubmitEditing={handleAddLocation}
            />
            <Button
              onPress={handleAddLocation}
              title={translate('addLocation')}
            />
            <CancelHolder onPress={handleClose}>
              <CancelLabel>{translate('cancelButton')}</CancelLabel>
            </CancelHolder>
          </Scroll>
        </Box>
      </Container>
    </Wrapper>
  );
}
