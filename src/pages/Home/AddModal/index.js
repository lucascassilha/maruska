import React, { useState, useRef } from 'react';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Vibration, useColorScheme } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import { Formik } from 'formik';

import changeStatus from '~/store/modules/modalVisible/actions';
import { addPet } from '~/store/modules/pets/actions';
import Button from '~/components/Button';
import ModalHeader from '~/components/ModalHeader';
import translate, { locale } from '~/locales';

import {
  Wrapper,
  Container,
  Box,
  Scroll,
  InputLabel,
  Label,
  SelectorBox,
  Input,
  CheckHolder,
  Instruction,
  DateHolder,
  ErrorLabel,
  CategoryPicker,
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
  const theme = !useSelector(state => state.account.darkMode);
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
              kind: translate('dogKind'),
              sex: translate('sexMale'),
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
                <ModalHeader
                  title={translate('addPet')}
                  onPress={handleClose}
                  source={require('~/assets/img/addpet.png')}
                />
                <Label>{translate('addKind')}</Label>
                <CategoryPicker
                  selectedValue={values.kind}
                  onValueChange={category => setFieldValue('kind', category)}
                  style={{ color: '#888282' }}
                >
                  <CategoryPicker.Item
                    label={`🐕 ${translate('dogKind')}`}
                    value={translate('dogKind')}
                    key={0}
                  />
                  <CategoryPicker.Item
                    label={`🐈 ${translate('catKind')}`}
                    value={translate('catKind')}
                    key={1}
                  />
                  <CategoryPicker.Item
                    label={`🐎 ${translate('otherKind')}`}
                    value={translate('otherKind')}
                    key={2}
                  />
                </CategoryPicker>
                {errors.kind && <ErrorLabel>{errors.kind}</ErrorLabel>}
                <Label>{translate('addSex')}</Label>
                <SelectorBox>
                  <CategoryPicker
                    selectedValue={values.sex}
                    onValueChange={category => setFieldValue('sex', category)}
                    style={{ color: '#888282' }}
                  >
                    <CategoryPicker.Item
                      label={`${translate('sexMale')}`}
                      value={translate('sexMale')}
                      key={0}
                    />
                    <CategoryPicker.Item
                      label={`${translate('sexFem')}`}
                      value={translate('sexFem')}
                      key={1}
                    />
                    <CategoryPicker.Item
                      label={`${translate('sexOther')}`}
                      value={translate('sexOther')}
                      key={2}
                    />
                  </CategoryPicker>
                </SelectorBox>
                {errors.sex && <ErrorLabel>{errors.sex}</ErrorLabel>}
                <Label>{translate('selectBirth')}</Label>
                <DateHolder disabled={undefDate}>
                  <DatePicker
                    date={values.date}
                    onDateChange={value => setFieldValue('date', value)}
                    mode="date"
                    maximumDate={new Date()}
                    locale={locale}
                    fadeToColor="none"
                    textColor="#888282"
                  />
                </DateHolder>
                {errors.date && <ErrorLabel>{errors.date}</ErrorLabel>}
                <CheckHolder>
                  <Checkbox
                    status={undefDate ? 'checked' : 'unchecked'}
                    onPress={() => setUndef(!undefDate)}
                    color={theme ? '#470000' : '#888282'}
                    uncheckedColor={theme ? '#470000' : '#888282'}
                  />
                  <InputLabel>{translate('undefDate')}</InputLabel>
                </CheckHolder>
                {undefDate ? (
                  <>
                    <Instruction>{translate('undefLabel')}</Instruction>
                    <Label>{translate('addYears')}</Label>
                    <Input
                      keyboardType="number-pad"
                      maxLength={2}
                      onChangeText={handleChange('years')}
                      onSubmitEditing={() => monthRef.current.focus()}
                      returnKeyType="next"
                    />
                    <Label>{translate('addMonths')}</Label>
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
                <Label>{translate('addName')}</Label>
                <Input
                  onChangeText={handleChange('name')}
                  ref={nameRef}
                  returnKeyType="next"
                  onSubmitEditing={() => breedRef.current.focus()}
                  maxLength={20}
                />
                {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
                <Label>{translate('addBreed')}</Label>
                <Input
                  onChangeText={handleChange('breed')}
                  ref={breedRef}
                  maxLength={20}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                />
                <Button
                  title={translate('registerPet')}
                  onPress={handleSubmit}
                />
              </Scroll>
            )}
          </Formik>
        </Box>
      </Container>
    </Wrapper>
  );
}
