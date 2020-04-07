import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Vibration } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
  ErrorLabel,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('mandatoryName')),
  kind: Yup.string().required(translate('mandatoryKind')),
  sex: Yup.string().required(translate('mandatorySex')),
  breed: Yup.string().nullable(),
  years: Yup.number()
    .positive()
    .nullable(),
  months: Yup.number()
    .max(12, translate('invalidMonth'))
    .positive()
    .nullable()
    .when('years', (value, field) =>
      value ? field.required(translate('mandatoryDate')) : field
    ),
  date: Yup.string().when('years', (value, field) =>
    value ? field : field.required()
  ),
});

const currentDate = new Date();

export default function AddModal() {
  const visible = useSelector(state => state.modal);
  const pets = useSelector(state => state.pets.data);
  const [undefDate, setUndef] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(changeStatus(0));
  };

  const handleAddPet = async values => {
    const { name } = values;

    const findOne = pets.findIndex(item => item.name === name);

    if (findOne >= 0) {
      Vibration.vibrate();
      return Alert.alert('Maruska', translate('doublePet'));
    }

    dispatch(addPet({ ...values, avatar: null }));

    handleClose();
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
          <Formik
            onSubmit={values => handleAddPet(values)}
            initialValues={{
              kind: '',
              sex: '',
              date: currentDate,
              years: '',
              months: '',
              name: '',
              breed: null,
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
                <Title>{translate('addPet')}</Title>
                <InputLabel>{translate('addKind')}</InputLabel>
                <SelectorBox>
                  <CheckHolder>
                    <Checkbox
                      status={
                        values.kind === translate('dogKind')
                          ? 'checked'
                          : 'unchecked'
                      }
                      color="#eb3349"
                      uncheckedColor="#eb3349"
                      value={values.kind}
                      onPress={() =>
                        setFieldValue('kind', translate('dogKind'))}
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
                        values.kind === translate('catKind')
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        setFieldValue('kind', translate('catKind'))
                      }
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
                        values.kind === translate('otherKind')
                          ? 'checked'
                          : 'unchecked'
                      }
                      color="#eb3349"
                      uncheckedColor="#eb3349"
                      onPress={() =>
                        setFieldValue('kind', translate('otherKind'))}
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
                {errors.kind && <ErrorLabel>{errors.kind}</ErrorLabel>}
                <InputLabel>{translate('addSex')}</InputLabel>
                <SelectorBox>
                  <CheckHolder>
                    <Checkbox
                      status={
                        values.sex === translate('sexMale')
                          ? 'checked'
                          : 'unchecked'
                      }
                      color="#eb3349"
                      uncheckedColor="#eb3349"
                      onPress={() => setFieldValue('sex', translate('sexMale'))}
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
                      status={
                        values.sex === translate('sexFem')
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => setFieldValue('sex', translate('sexFem'))}
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
                        values.sex === translate('sexOther')
                          ? 'checked'
                          : 'unchecked'
                      }
                      color="#eb3349"
                      uncheckedColor="#eb3349"
                      onPress={() =>
                        setFieldValue('sex', translate('sexOther'))
                      }
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
                {errors.sex && <ErrorLabel>{errors.sex}</ErrorLabel>}
                <InputLabel>{translate('selectBirth')}</InputLabel>
                <DateHolder disabled={undefDate}>
                  <DatePicker
                    date={values.date}
                    onDateChange={value => setFieldValue('date', value)}
                    mode="date"
                    maximumDate={new Date()}
                    locale={locale}
                  />
                </DateHolder>
                {errors.date && <ErrorLabel>{errors.date}</ErrorLabel>}
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
                      onChangeText={handleChange('years')}
                      onSubmitEditing={() => monthRef.current.focus()}
                      returnKeyType="next"
                    />
                    <InputLabel>{translate('addMonths')}</InputLabel>
                    <Input
                      keyboardType="number-pad"
                      maxLength={2}
                      ref={monthRef}
                      onSubmitEditing={() => nameRef.current.focus()}
                      onChangeText={handleChange('months')}
                      returnKeyType="next"
                    />
                    {errors.months && <ErrorLabel>{errors.months}</ErrorLabel>}
                  </>
                ) : null}
                <InputLabel>{translate('addName')}</InputLabel>
                <Input
                  onChangeText={handleChange('name')}
                  ref={nameRef}
                  returnKeyType="next"
                  onSubmitEditing={() => breedRef.current.focus()}
                  maxLength={20}
                />
                {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
                <InputLabel>{translate('addBreed')}</InputLabel>
                <Input
                  onChangeText={handleChange('breed')}
                  ref={breedRef}
                  maxLength={20}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                />
                <Button title={translate('addButton')} onPress={handleSubmit} />
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
