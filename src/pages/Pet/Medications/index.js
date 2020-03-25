import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import { Alert, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { produce } from 'immer';
import { formatDistanceStrict, parseISO, isValid, isAfter } from 'date-fns';
import PropTypes from 'prop-types';
import Button from '~/components/Button/index';
import FAB from '~/components/FAB';

import Notification from '~/config/NotificationService';

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
    console.log(pets[petIndex].medications);
    if (pets[petIndex].medications && pets[petIndex].medications[0]) {
      const list = pets[petIndex].medications;
      const returnable = produce(list, draft => {
        draft.map(item => {
          const currentDate = new Date();
          if (isValid(item.nextDoseDate)) {
            if (isAfter(currentDate, item.nextDoseDate)) {
              item.nextDoseString = 'Now!';
              console.tron.log('Oi');
              return 0;
            }
            item.nextDoseString = formatDistanceStrict(
              item.nextDoseDate,
              currentDate
            );
          } else if (item.nextDoseDate !== undefined) {
            const parsedDate = parseISO(item.nextDoseDate);
            if (isAfter(currentDate, parsedDate)) {
              item.nextDoseString = 'Now!';
              return 0;
            }
            console.log(`Parsed valid: ${isValid(parsedDate)}`);
            item.nextDoseString = formatDistanceStrict(parsedDate, currentDate);
          } else {
            item.nextDoseString = 'Finished!';
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
      return Alert.alert(
        'Maruska',
        'Please enter valid information! Check if any field is missing'
      );
    }

    const petIndex = pets.findIndex(item => item.name === petID);

    if (pets[petIndex].medications) {
      const medIndex = pets[petIndex].medications.findIndex(
        item => item.name === name
      );

      if (medIndex >= 0) {
        return Alert.alert(
          'Error',
          'You have already registered this medication!'
        );
      }
    }

    const currentDate = new Date();
    const nextDoseString = formatDistanceStrict(date, currentDate);

    const title = 'Medication time!';
    const message = `${petID} needs to take the first dose of ${name}!`;

    const notificationID = Notification.scheduleNotification(
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

  const handleCheckMedication = (medID, notificationID, notificationDate) => {
    const currentDate = new Date();
    if (isAfter(currentDate, notificationDate)) {
      dispatch(notificationCancel(notificationID));
    }

    dispatch(petCheckMedication(medID, petID, notificationID));
  };

  const handleDeleteMedication = (medID, notificationID) => {
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
              <SubTitle>{`Next dose: ${item.nextDoseString}`}</SubTitle>
              <SubTitle>{`Last dose: ${item.lastDoseString}`}</SubTitle>
              <SubTitle>{`Doses left: ${item.doses}`}</SubTitle>
            </TextBox>
            <ButtonBox>
              <ButtonHolder
                onPress={() =>
                  handleCheckMedication(
                    item.name,
                    item.notificationID,
                    item.nextDoseDate
                  )
                }
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
              <Label>Register a medication</Label>
              <InputLabel>Medication name</InputLabel>
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
                    <Picker.Item label="Hours" value={4} />
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
              <Button onPress={handleAddMedication} title="Register" />
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

Medications.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
