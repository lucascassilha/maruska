import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Vibration } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import changeStatus from '~/store/modules/modalVisible/actions';
import { addLocation } from '~/store/modules/places/actions';
import Button from '~/components/Button/index';
import translate from '~/locales';

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
  ErrorLabel,
} from './styles';

const schema = Yup.object().shape({
  phone: Yup.string().required(translate('mandatoryPhone')),
  address: Yup.string().required(translate('mandatoryAddress')),
  city: Yup.string().required(translate('mandatoryCity')),
  kind: Yup.string().required(translate('mandatoryPlaceKind')),
  name: Yup.string().required(translate('mandatoryPlaceName')),
});

export default function AddModal() {
  const visible = useSelector(state => state.modal);
  const locations = useSelector(state => state.places.data);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeStatus(1));
  };

  const handleAddLocation = values => {
    const { name } = values;

    const findIndex = locations.findIndex(item => item.name === name);

    if (findIndex >= 0) {
      Vibration.vibrate();
      return Alert.alert('Maruksa', translate('doubleLocation'));
    }

    dispatch(addLocation(values));

    handleClose();
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
          <Formik
            onSubmit={values => handleAddLocation(values)}
            initialValues={{
              city: '',
              name: '',
              kind: '',
              phone: '',
              address: '',
            }}
            validationSchema={schema}
            validateOnChange={false}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <Scroll showsVerticalScrollIndicator={false}>
                <Title>{translate('addPlace')}</Title>
                <InputLabel>{translate('placeKind')}</InputLabel>
                <SelectorBox>
                  <CheckHolder>
                    <Checkbox
                      status={
                        values.kind === 'PetShop' ? 'checked' : 'unchecked'
                      }
                      color="#eb3349"
                      uncheckedColor="#eb3349"
                      onPress={() => setFieldValue('kind', 'PetShop')}
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
                        values.kind === translate('clinic')
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => setFieldValue('kind', translate('clinic'))}
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
                {errors.kind && <ErrorLabel>{errors.kind}</ErrorLabel>}
                <InputLabel>{translate('name')}</InputLabel>
                <Input
                  onChangeText={handleChange('name')}
                  returnKeyType="next"
                  onSubmitEditing={() => cityRef.current.focus()}
                  maxLength={20}
                />
                {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
                <InputLabel>{translate('city')}</InputLabel>
                <Input
                  onChangeText={handleChange('city')}
                  returnKeyType="next"
                  ref={cityRef}
                  onSubmitEditing={() => addressRef.current.focus()}
                  maxLength={20}
                />
                {errors.city && <ErrorLabel>{errors.city}</ErrorLabel>}
                <InputLabel>{translate('address')}</InputLabel>
                <Input
                  onChangeText={handleChange('address')}
                  ref={addressRef}
                  onSubmitEditing={() => phoneRef.current.focus()}
                  returnKeyType="next"
                />
                {errors.address && <ErrorLabel>{errors.address}</ErrorLabel>}
                <InputLabel>{translate('phoneNumber')}</InputLabel>
                <Input
                  onChangeText={handleChange('phone')}
                  ref={phoneRef}
                  maxLength={15}
                  keyboardType="number-pad"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                />
                {errors.phone && <ErrorLabel>{errors.phone}</ErrorLabel>}
                <Button
                  onPress={handleSubmit}
                  title={translate('addLocation')}
                />
                <CancelHolder onPress={handleClose}>
                  <CancelLabel>{translate('cancelButton')}</CancelLabel>
                </CancelHolder>
              </Scroll>
            )}
          </Formik>
        </Box>
      </Container>
    </Wrapper>
  );
}
