import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import { Alert, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import Config from 'react-native-config';
import {
  formatDistanceStrict,
  parseISO,
  isValid,
  isAfter,
  addYears,
  addMonths,
  addDays,
  addHours,
} from 'date-fns';
import PropTypes from 'prop-types';
import { ptBR, enUS } from 'date-fns/locale';
import { Formik } from 'formik';
import Snackbar from 'react-native-snackbar';

import PageHeader from '~/components/PageHeader';
import ModalHeader from '~/components/ModalHeader';
import Button from '~/components/Button/index';
import FAB from '~/components/FAB';
import Notification from '~/config/NotificationService';
import translate, { locale } from '~/locales';
import {
  petMedication,
  petCheckMedication,
  petDeleteMedication,
} from '~/store/modules/pets/actions';
import {
  notificationCancel,
  notificationAdd,
} from '~/store/modules/notifications/actions';

import {
  Container,
  List,
  Input,
  InputLabel,
  Label,
  DateHolder,
  Box,
  TextBox,
  ButtonBox,
  ButtonHolder,
  Title,
  SubTitle,
  Scroll,
  ModalHolder,
  ModalContainer,
  ModalBox,
  IntervalBox,
  SubBox,
  CancelBox,
  ErrorLabel,
} from './styles';

const schema = Yup.object().shape({
  intervalValue: Yup.number()
    .typeError(translate('validIntervalValue'))
    .min(0, translate('biggerThan'))
    .required(translate('mandatoryIntervalValue')),
  interval: Yup.number()
    .typeError(translate('mandatoryPeriod'))
    .min(1, translate('mandatoryPeriod'))
    .max(4, translate('mandatoryPeriod'))
    .required(translate('mandatoryPeriod')),
  date: Yup.date().required(),
  name: Yup.string().required(translate('mandatoryMedicineName')),
  doses: Yup.number()
    .typeError(translate('validValue'))
    .min(0, translate('biggerThan'))
    .max(99, translate('smallerThan'))
    .required(translate('mandatoryInterval')),
});

const now = new Date();
export default function Medications({ route, navigation }) {
  const { petID } = route.params;
  const pets = useSelector(state => state.pets.data);
  const proAccount = useSelector(state => state.account.pro);

  const [modalVisible, setVisible] = useState(false);

  const [medications, setMedications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const petIndex = pets.findIndex(item => item.name === petID);
    if (pets[petIndex].medications && pets[petIndex].medications[0]) {
      const list = pets[petIndex].medications;
      const returnable = produce(list, draft => {
        draft.map(item => {
          const currentDate = new Date();
          const localeFNS = locale === 'pt_BR' ? ptBR : enUS;
          if (item.nextDoseDate) {
            if (isValid(item.nextDoseDate)) {
              if (isAfter(currentDate, item.nextDoseDate)) {
                item.nextDoseString = translate('nowMed');
                return 0;
              }
              item.nextDoseString = formatDistanceStrict(
                item.nextDoseDate,
                currentDate,
                {
                  locale: localeFNS,
                }
              );
            } else if (item.nextDoseDate !== undefined) {
              const parsedDate = parseISO(item.nextDoseDate);
              if (isAfter(currentDate, parsedDate)) {
                item.nextDoseString = translate('nowMed');
                return 0;
              }
              item.nextDoseString = formatDistanceStrict(
                parsedDate,
                currentDate,
                {
                  locale: localeFNS,
                }
              );
            }
          }
          if (item.doses === 0) {
            item.nextDoseDate = addYears(new Date(), 100);
            item.nextDoseString = translate('medFinished');
            item.finished = true;
          }
        });
        draft.sort(function(a, b) {
          const aValid = isValid(a.nextDoseDate);
          const bValid = isValid(b.nextDoseDate);
          const parsedA = !aValid ? parseISO(a.nextDoseDate) : a.nextDoseDate;
          const parsedB = !bValid ? parseISO(b.nextDoseDate) : b.nextDoseDate;
          return parsedA - parsedB;
        });
      });
      setMedications(returnable);
    }
  }, [pets]);

  const handleAddMedication = async values => {
    const { name, date, interval, intervalValue, doses } = values;
    if (!(await schema.isValid(values))) {
      return Alert.alert('Maruska', translate('missingInfo'));
    }

    const petIndex = pets.findIndex(item => item.name === petID);

    if (pets[petIndex].medications) {
      const medIndex = pets[petIndex].medications.findIndex(
        item => item.name === name
      );

      if (medIndex >= 0) {
        return Alert.alert(translate('error'), translate('doubleMed'));
      }
    }

    const currentDate = new Date();
    const nextDoseString = formatDistanceStrict(date, currentDate);

    const title = translate('medNotTitle');
    const message = `${petID} ${translate('medFirstDose')} ${name}!`;

    const notificationID = await Notification.scheduleNotification(
      date,
      title,
      message
    );

    dispatch(
      notificationAdd({ id: notificationID, date, title, message, petID })
    );

    dispatch(
      petMedication(
        {
          notificationID,
          name,
          doses,
          nextDoseDate: date,
          created_at: currentDate,
          interval,
          intervalValue,
          lastDose: null,
          lastDoseString: '----',
          nextDoseString,
        },
        petID
      )
    );

    setVisible(false);
  };

  const handleCheckMedication = async (
    medID,
    notificationID,
    notificationDate,
    notificationInfo
  ) => {
    Alert.alert(
      translate('justConfirming'),
      translate('justConfirmingDescription'),
      [
        {
          text: translate('yes'),
          onPress: async () => {
            const currentDate = new Date();

            dispatch(notificationCancel(notificationID));
            Notification.cancelNotification(notificationID);

            const dosesLeft = notificationInfo.doses;
            const intervalPeriod = notificationInfo.interval;
            const intervalData = notificationInfo.intervalValue;

            let notificationData = {};

            let nextDoseDate = null;
            let reminderNotification = -1;
            if (parseInt(dosesLeft, 10) > 1) {
              if (intervalPeriod === 1) {
                nextDoseDate = addYears(
                  currentDate,
                  parseInt(intervalData, 10)
                );
              }
              if (intervalPeriod === 2) {
                nextDoseDate = addMonths(
                  currentDate,
                  parseInt(intervalData, 10)
                );
              }
              if (intervalPeriod === 3) {
                nextDoseDate = addDays(currentDate, parseInt(intervalData, 10));
              }
              if (intervalPeriod === 4) {
                nextDoseDate = addHours(
                  currentDate,
                  parseInt(intervalData, 10)
                );
              }
              const title = translate('medNotTitle');
              const message = `${petID} ${translate(
                'medNeedsToTake'
              )} ${medID}!`;

              reminderNotification = await Notification.scheduleNotification(
                nextDoseDate,
                title,
                message
              );
              notificationData = {
                title,
                message,
                date: nextDoseDate,
                id: reminderNotification,
                petID,
              };

              dispatch(notificationAdd(notificationData));
            }

            notificationData = {
              id: reminderNotification,
              date: nextDoseDate,
            };

            dispatch(petCheckMedication(medID, petID, notificationData));
            Snackbar.show({
              text: translate('medCheckedSnack'),
              duration: Snackbar.LENGTH_LONG,
              action: {
                text: translate('thk'),
                textColor: 'green',
              },
            });
          },
        },
        { text: translate('cancelButton') },
      ]
    );
  };

  const handleDeleteMedication = async (medID, notificationID) => {
    Alert.alert(translate('areYouSure'), translate('notGetInfoBack'), [
      {
        text: translate('sure'),
        onPress: () => {
          if (medications.length === 1) {
            setMedications([]);
          }
          Notification.cancelNotification(notificationID);
          dispatch(notificationCancel(notificationID));
          dispatch(petDeleteMedication(medID, petID));
          Snackbar.show({
            text: translate('medDeletedSnack'),
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: translate('thk'),
              textColor: 'green',
            },
          });
        },
      },
      { text: translate('cancelButton') },
    ]);
  };

  const dosesRef = useRef();
  const intervalRef = useRef();

  return (
    <>
      <PageHeader
        title={translate('medTitle')}
        navigation={navigation}
        source={require('~/assets/img/pills.png')}
      />
      <Container>
        <FAB onPress={() => setVisible(true)} />
        <Animatable.View animation="slideInUp">
          <List
            data={medications}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <Box finished={item.finished}>
                <TextBox>
                  <Title>{item.name}</Title>
                  <SubTitle>
                    {`${translate('nextDose')}: ${item.nextDoseString}`}
                  </SubTitle>
                  <SubTitle>
                    {`${translate('lastDose')}: ${item.lastDoseString}`}
                  </SubTitle>
                  <SubTitle>{`${translate('dosesLeft')}: ${
                    item.doses
                  }`}</SubTitle>
                </TextBox>
                <ButtonBox>
                  {item.finished ? null : (
                    <ButtonHolder
                      onPress={() => {
                        const notificationInfo = {
                          doses: item.doses,
                          interval: item.interval,
                          intervalValue: item.intervalValue,
                        };
                        handleCheckMedication(
                          item.name,
                          item.notificationID,
                          item.nextDoseDate,
                          notificationInfo
                        );
                      }}
                    >
                      <Icon name="clipboard-check" color="#fff" size={20} />
                    </ButtonHolder>
                  )}
                  <ButtonHolder
                    onPress={() =>
                      handleDeleteMedication(item.name, item.notificationID)
                    }
                  >
                    <Icon name="trash-alt" color="#fff" size={20} />
                  </ButtonHolder>
                </ButtonBox>
              </Box>
            )}
          />
        </Animatable.View>
        <ModalHolder
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setVisible(false)}
        >
          <ModalContainer>
            <ModalBox>
              <Formik
                onSubmit={values => handleAddMedication(values)}
                initialValues={{
                  name: '',
                  doses: '',
                  interval: null,
                  intervalValue: '',
                  date: now,
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
                  <Scroll>
                    <ModalHeader
                      title={translate('medRegister')}
                      source={require('~/assets/img/pills.png')}
                      onPress={() => setVisible(false)}
                    />
                    <InputLabel>{translate('medName')}</InputLabel>
                    <Input
                      onChangeText={handleChange('name')}
                      maxLength={20}
                      onSubmitEditing={() => dosesRef.current.focus()}
                    />
                    {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
                    <InputLabel>{translate('addDoses')}</InputLabel>
                    <Input
                      placeholder="10"
                      maxLength={2}
                      keyboardType="number-pad"
                      ref={dosesRef}
                      onChangeText={handleChange('doses')}
                      onSubmitEditing={() => intervalRef.current.focus()}
                    />
                    {errors.doses && <ErrorLabel>{errors.doses}</ErrorLabel>}
                    <IntervalBox>
                      <SubBox>
                        <InputLabel>{translate('addInterval')}</InputLabel>
                        <Input
                          style={{ textAlign: 'right' }}
                          placeholder="10"
                          maxLength={2}
                          keyboardType="number-pad"
                          ref={intervalRef}
                          onChangeText={handleChange('intervalValue')}
                        />
                      </SubBox>
                      <SubBox>
                        <InputLabel>{translate('addPeriod')}</InputLabel>
                        <Picker
                          style={{ padding: 15 }}
                          onValueChange={value =>
                            setFieldValue('interval', value)
                          }
                          selectedValue={values.interval || null}
                          style={{ color: '#888282' }}
                        >
                          <Picker.Item label="" value={null} />
                          <Picker.Item
                            label={translate('addYears')}
                            value={1}
                          />
                          <Picker.Item
                            label={translate('addMonths')}
                            value={2}
                          />
                          <Picker.Item label={translate('addDays')} value={3} />
                          <Picker.Item
                            label={translate('addHours')}
                            value={4}
                          />
                        </Picker>
                      </SubBox>
                    </IntervalBox>
                    {errors.interval && (
                      <ErrorLabel>{errors.interval}</ErrorLabel>
                    )}
                    {errors.intervalValue && (
                      <ErrorLabel>{errors.intervalValue}</ErrorLabel>
                    )}
                    <InputLabel>{translate('nextDose')}</InputLabel>
                    <DateHolder>
                      <DatePicker
                        date={values.date}
                        onDateChange={value => setFieldValue('date', value)}
                        mode="datetime"
                        minimumDate={now}
                        locale={locale}
                        fadeToColor="none"
                        textColor="#888282"
                      />
                    </DateHolder>
                    <Button
                      onPress={handleSubmit}
                      title={translate('registerLabel')}
                    />
                  </Scroll>
                )}
              </Formik>
            </ModalBox>
          </ModalContainer>
        </ModalHolder>
      </Container>
    </>
  );
}

Medications.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
