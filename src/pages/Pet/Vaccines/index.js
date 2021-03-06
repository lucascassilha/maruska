import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import Snackbar from 'react-native-snackbar';
import { Alert, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import Config from 'react-native-config';
import PropTypes from 'prop-types';
import {
  formatDistanceStrict,
  format,
  parseISO,
  isValid,
  subDays,
  addYears,
  addMonths,
  addDays,
  isPast,
} from 'date-fns';
import { AdMobInterstitial } from 'react-native-admob';
import { ptBR, enUS } from 'date-fns/locale';
import { Formik } from 'formik';

import Button from '~/components/Button/index';
import FAB from '~/components/FAB';
import PageHeader from '~/components/PageHeader';
import translate, { locale } from '~/locales';
import Notification from '~/config/NotificationService';
import {
  notificationCancel,
  notificationAdd,
} from '~/store/modules/notifications/actions';
import {
  petVaccine,
  petCheckVaccine,
  petDeleteVaccine,
  petLastVaccine,
} from '~/store/modules/pets/actions';

import ModalHeader from '~/components/ModalHeader';

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
    .max(3, translate('mandatoryPeriod'))
    .required(translate('mandatoryPeriod')),
  date: Yup.date().required(),
  name: Yup.string().required(translate('mandatoryVaccineName')),
  doses: Yup.number()
    .typeError(translate('validValue'))
    .min(0, translate('biggerThan'))
    .max(99, translate('smallerThan'))
    .required(translate('mandatoryInterval')),
});

const now = new Date();

export default function Vaccines({ route, navigation }) {
  const { petID } = route.params;
  const pets = useSelector(state => state.pets.data);
  const proAccount = useSelector(state => state.account.pro);

  const [modalVisible, setVisible] = useState(false);

  const [vaccines, setVaccines] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const petIndex = pets.findIndex(item => item.name === petID);
    if (pets[petIndex].vaccines && pets[petIndex].vaccines[0]) {
      const list = pets[petIndex].vaccines;
      const returnable = produce(list, draft => {
        draft.map(item => {
          const currentDate = new Date();
          const localeFNS = locale === 'pt_BR' ? ptBR : enUS;
          if (isValid(item.nextDoseDate)) {
            if (isPast(item.nextDoseDate)) {
              item.nextDoseString = translate('late');
              return 0;
            }
            item.nextDoseString = formatDistanceStrict(
              item.nextDoseDate,
              currentDate,
              { locale: localeFNS }
            );
          } else if (item.nextDoseDate !== undefined) {
            if (isPast(parseISO(item.nextDoseDate))) {
              item.nextDoseString = translate('late');
              return 0;
            }
            const parsedDate = parseISO(item.nextDoseDate);
            item.nextDoseString = formatDistanceStrict(
              parsedDate,
              currentDate,
              { locale: localeFNS }
            );
          } else {
            item.nextDoseDate = addYears(new Date(), 100);
            item.nextDoseString = translate('vacDone');
            item.vaccinated = true;
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
      setVaccines(returnable);
    }
  }, [pets]);

  const handleAddVaccine = async values => {
    const { name, date, interval, intervalValue, doses } = values;
    const petIndex = pets.findIndex(item => item.name === petID);

    if (pets[petIndex].vaccines) {
      const vacIndex = pets[petIndex].vaccines.findIndex(
        item => item.name === name
      );
      if (vacIndex >= 0) {
        return Alert.alert(translate('error'), translate('doubleVac'));
      }
    }

    const nextDoseString = formatDistanceStrict(date, now);

    const notificationDate = subDays(date, 1);
    const title = translate('vacNotTitle');
    const message = `${petID} ${translate('firstDose')} ${name} ${translate(
      'tomorrow'
    )}!`;

    const notificationID = await Notification.scheduleNotification(
      notificationDate,
      title,
      message
    );

    dispatch(
      notificationAdd({
        id: notificationID,
        date: notificationDate,
        title,
        message,
        petID,
      })
    );

    dispatch(
      petVaccine(
        {
          name,
          notificationID,
          doses,
          nextDoseDate: date,
          created_at: now,
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

    if (!proAccount) {
      AdMobInterstitial.setAdUnitID(Config.INTERSTICIAL_ID);
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
  };

  const handleCheckVaccine = async (
    vacID,
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
              const title = translate('vacNotTitle');
              const hourString = locale === 'en_US' ? 'hh:mm aaaa' : 'HH:mm';
              const time = format(nextDoseDate, hourString);
              const message = `${petID} ${translate(
                'needsToTake'
              )} ${vacID} ${translate('tomorrowAt')} ${time}!`;
              nextDoseDate = subDays(nextDoseDate, 1);

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

              Snackbar.show({
                text: translate('vaccineCheckedSnack'),
                duration: Snackbar.LENGTH_LONG,
                action: {
                  text: translate('thk'),
                  textColor: 'green',
                },
              });
            }

            notificationData = {
              id: reminderNotification,
              date: nextDoseDate,
            };

            dispatch(petCheckVaccine(vacID, petID, notificationData));
            dispatch(petLastVaccine(petID));

            if (!proAccount) {
              AdMobInterstitial.setAdUnitID(Config.INTERSTICIAL_ID);
              AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
              AdMobInterstitial.requestAd().then(() =>
                AdMobInterstitial.showAd()
              );
            }
          },
        },
        { text: translate('cancelButton') },
      ]
    );
  };

  const handleDeleteVaccine = (ID, notificationID) => {
    Alert.alert(translate('areYouSure'), translate('vacRecom'), [
      {
        text: translate('sure'),
        onPress: () => {
          if (vaccines.length === 1) {
            setVaccines([]);
          }
          Notification.cancelNotification(notificationID);
          dispatch(notificationCancel(notificationID));
          dispatch(petDeleteVaccine(ID, petID));
          Snackbar.show({
            text: translate('vaccineDeletedSnack'),
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
        navigation={navigation}
        title={translate('vacTitle')}
        source={require('~/assets/img/vaccine.png')}
      />
      <Container>
        <FAB onPress={() => setVisible(true)} />
        <Animatable.View animation="slideInUp">
          <List
            data={vaccines}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <Box vaccinated={item.vaccinated}>
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
                  <ButtonHolder
                    onPress={() => {
                      const notificationInfo = {
                        doses: item.doses,
                        interval: item.interval,
                        intervalValue: item.intervalValue,
                      };
                      handleCheckVaccine(
                        item.name,
                        item.notificationID,
                        item.nextDoseDate,
                        notificationInfo
                      );
                    }}
                  >
                    <Icon name="clipboard-check" color="#fff" size={20} />
                  </ButtonHolder>
                  <ButtonHolder
                    onPress={() =>
                      handleDeleteVaccine(item.name, item.notificationID)
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
                onSubmit={values => handleAddVaccine(values)}
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
                      title={translate('registerVaccine')}
                      source={require('~/assets/img/vaccine.png')}
                      onPress={() => setVisible(false)}
                    />
                    <InputLabel>{translate('addVacName')}</InputLabel>
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

Vaccines.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
