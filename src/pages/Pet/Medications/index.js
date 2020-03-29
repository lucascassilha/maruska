import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import { Alert, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
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
} from './styles';

console.disableYellowBox = true;

export default function Medications({ route }) {
  const { petID } = route.params;
  const pets = useSelector(state => state.pets.data);

  const [modalVisible, setVisible] = useState(false);

  const [medications, setMedications] = useState([]);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(null);
  const [doses, setDoses] = useState(null);
  const [interval, setInterval] = useState(null);
  const [intervalValue, setIntervalValue] = useState(null);

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
            item.nextDoseString = translate('medFinished');
          }
        });
      });
      setMedications(returnable);
    }
  }, [pets]);

  const handleAddMedication = async () => {
    const schema = Yup.object().shape({
      intervalValue: Yup.number()
        .min(0)
        .required(),
      interval: Yup.number()
        .min(1)
        .max(4)
        .required(),
      date: Yup.date().required(),
      name: Yup.string().required(),
      doses: Yup.number()
        .min(0)
        .max(99)
        .required(),
    });

    if (
      !(await schema.isValid({ name, date, doses, interval, intervalValue }))
    ) {
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
        nextDoseDate = addYears(currentDate, parseInt(intervalData, 10));
      }
      if (intervalPeriod === 2) {
        nextDoseDate = addMonths(currentDate, parseInt(intervalData, 10));
      }
      if (intervalPeriod === 3) {
        nextDoseDate = addDays(currentDate, parseInt(intervalData, 10));
      }
      if (intervalPeriod === 4) {
        nextDoseDate = addHours(currentDate, parseInt(intervalData, 10));
      }
      const title = translate('medNotTitle');
      const message = `${petID} ${translate('medNeedsToTake')} ${medID}!`;

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
  };

  const handleDeleteMedication = async (medID, notificationID) => {
    if (medications.length === 1) {
      setMedications([]);
    }
    Notification.cancelNotification(notificationID);
    dispatch(notificationCancel(notificationID));
    dispatch(petDeleteMedication(medID, petID));
  };

  const dosesRef = useRef();
  const intervalRef = useRef();

  return (
    <Container>
      <FAB onPress={() => setVisible(true)} />
      <List
        data={medications}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <Title>{item.name}</Title>
              <SubTitle>
                {`${translate('nextDose')}: ${item.nextDoseString}`}
              </SubTitle>
              <SubTitle>
                {`${translate('lastDose')}: ${item.lastDoseString}`}
              </SubTitle>
              <SubTitle>{`${translate('dosesLeft')}: ${item.doses}`}</SubTitle>
            </TextBox>
            <ButtonBox>
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
              <ButtonHolder
                onPress={() =>
                  handleDeleteMedication(item.name, item.notificationID)}
              >
                <Icon name="trash-alt" color="#fff" size={20} />
              </ButtonHolder>
            </ButtonBox>
          </Box>
        )}
      />
      <ModalHolder
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <ModalContainer>
          <ModalBox>
            <Scroll>
              <Label>{translate('medRegister')}</Label>
              <InputLabel>{translate('medName')}</InputLabel>
              <Input
                onChangeText={setName}
                maxLength={20}
                onSubmitEditing={() => dosesRef.current.focus()}
              />
              <InputLabel>{translate('addDoses')}</InputLabel>
              <Input
                placeholder="10"
                maxLength={2}
                keyboardType="number-pad"
                ref={dosesRef}
                onChangeText={setDoses}
                onSubmitEditing={() => intervalRef.current.focus()}
              />
              <IntervalBox>
                <SubBox>
                  <InputLabel>{translate('addInterval')}</InputLabel>
                  <Input
                    style={{ textAlign: 'right' }}
                    placeholder="10"
                    maxLength={2}
                    keyboardType="number-pad"
                    ref={intervalRef}
                    onChangeText={setIntervalValue}
                  />
                </SubBox>
                <SubBox>
                  <InputLabel>{translate('addPeriod')}</InputLabel>
                  <Picker
                    style={{ padding: 15 }}
                    onValueChange={value => setInterval(value)}
                    selectedValue={interval || null}
                  >
                    <Picker.Item label="" value={null} />
                    <Picker.Item label={translate('addYears')} value={1} />
                    <Picker.Item label={translate('addMonths')} value={2} />
                    <Picker.Item label={translate('addDays')} value={3} />
                    <Picker.Item label={translate('addHours')} value={4} />
                  </Picker>
                </SubBox>
              </IntervalBox>
              <InputLabel>{translate('nextDose')}</InputLabel>
              <DateHolder>
                <DatePicker
                  date={date}
                  onDateChange={setDate}
                  mode="datetime"
                  minimumDate={new Date()}
                  locale={locale}
                  textColor="#000000"
                  fadeToColor="none"
                />
              </DateHolder>
              <Button
                onPress={handleAddMedication}
                title={translate('registerLabel')}
              />
              <CancelBox onPress={() => setVisible(false)}>
                <Label>{translate('cancelButton')}</Label>
              </CancelBox>
            </Scroll>
          </ModalBox>
        </ModalContainer>
      </ModalHolder>
    </Container>
  );
}

Medications.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
