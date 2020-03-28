import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import { Alert, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import {
  formatDistanceStrict,
  format,
  parseISO,
  isValid,
  subDays,
  addYears,
  addMonths,
  addDays,
} from 'date-fns';
import Button from '~/components/Button/index';
import FAB from '~/components/FAB';

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

export default function Vaccines({ route }) {
  const { petID } = route.params;
  const pets = useSelector(state => state.pets.data);

  const [modalVisible, setVisible] = useState(false);

  const [vaccines, setVaccines] = useState([]);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(null);
  const [doses, setDoses] = useState(null);
  const [interval, setInterval] = useState(null);
  const [intervalValue, setIntervalValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const petIndex = pets.findIndex(item => item.name === petID);
    if (pets[petIndex].vaccines && pets[petIndex].vaccines[0]) {
      const list = pets[petIndex].vaccines;
      const returnable = produce(list, draft => {
        draft.map(item => {
          const currentDate = new Date();
          if (isValid(item.nextDoseDate)) {
            item.nextDoseString = formatDistanceStrict(
              item.nextDoseDate,
              currentDate
            );
          } else if (item.nextDoseDate !== undefined) {
            const parsedDate = parseISO(item.nextDoseDate);
            item.nextDoseString = formatDistanceStrict(parsedDate, currentDate);
          } else {
            item.nextDoseString = 'Vaccinated!';
          }
        });
      });
      setVaccines(returnable);
    }
  }, [pets]);

  const handleAddVaccine = async () => {
    const schema = Yup.object().shape({
      intervalValue: Yup.number()
        .min(0)
        .required(),
      interval: Yup.number()
        .min(1)
        .max(3)
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
      return Alert.alert(
        'Maruska',
        'Please enter valid information! Check if any field is missing'
      );
    }

    const petIndex = pets.findIndex(item => item.name === petID);

    if (pets[petIndex].vaccines) {
      const vacIndex = pets[petIndex].vaccines.findIndex(
        item => item.name === name
      );
      if (vacIndex >= 0) {
        return Alert.alert(
          'Error',
          'You have already registered this vaccine!'
        );
      }
    }

    const currentDate = new Date();
    const nextDoseString = formatDistanceStrict(date, currentDate);

    const notificationDate = subDays(date, 1);
    const title = 'Vaccine time!';
    const message = `${petID} needs to take the first dose of ${name} tomorrow!`;

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

  const handleCheckVaccine = async (
    vacID,
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
      const title = 'Vaccine tomorrow!';
      const time = format(nextDoseDate, 'HH:mm');
      const message = `${petID} needs to take ${vacID} tomorrow at ${time}!`;
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
    }

    notificationData = {
      id: reminderNotification,
      date: nextDoseDate,
    };

    dispatch(petCheckVaccine(vacID, petID, notificationData));
    dispatch(petLastVaccine(petID));
  };

  const handleDeleteVaccine = (ID, notificationID) => {
    Alert.alert(
      'Are you sure?',
      "We don't recommend deleting any vaccine data, once it may be valuable information for your pet's health!",
      [
        {
          text: "I'm sure",
          onPress: () => {
            if (vaccines.length === 1) {
              setVaccines([]);
            }
            Notification.cancelNotification(notificationID);
            dispatch(notificationCancel(notificationID));
            dispatch(petDeleteVaccine(ID, petID));
          },
        },
        { text: 'CANCEL' },
      ]
    );
  };

  const dosesRef = useRef();
  const intervalRef = useRef();

  return (
    <Container>
      <FAB onPress={() => setVisible(true)} />
      <List
        data={vaccines}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <Title>{item.name}</Title>
              <SubTitle>{`Next dose: ${item.nextDoseString}`}</SubTitle>
              <SubTitle>{`Last dose: ${item.lastDoseString}`}</SubTitle>
              <SubTitle>{`Doses left: ${item.doses}`}</SubTitle>
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
      <ModalHolder
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <ModalContainer>
          <ModalBox>
            <Scroll>
              <Label>Register a vaccine</Label>
              <InputLabel>Vaccine name</InputLabel>
              <Input
                onChangeText={setName}
                maxLength={20}
                onSubmitEditing={() => dosesRef.current.focus()}
              />
              <InputLabel>Number of doses</InputLabel>
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
                  <InputLabel>Interval between doses</InputLabel>
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
                  <InputLabel>Period</InputLabel>
                  <Picker
                    style={{ padding: 15 }}
                    onValueChange={value => setInterval(value)}
                    selectedValue={interval || null}
                  >
                    <Picker.Item label="" value={null} />
                    <Picker.Item label="Years" value={1} />
                    <Picker.Item label="Months" value={2} />
                    <Picker.Item label="Days" value={3} />
                  </Picker>
                </SubBox>
              </IntervalBox>
              <InputLabel>Next dose</InputLabel>
              <DateHolder>
                <DatePicker
                  date={date}
                  onDateChange={setDate}
                  mode="datetime"
                  minimumDate={new Date()}
                  locale="en"
                  textColor="#000000"
                  fadeToColor="none"
                />
              </DateHolder>
              <Button onPress={handleAddVaccine} title="Register" />
              <CancelBox onPress={() => setVisible(false)}>
                <Label>Cancel</Label>
              </CancelBox>
            </Scroll>
          </ModalBox>
        </ModalContainer>
      </ModalHolder>
    </Container>
  );
}
