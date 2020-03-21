import React, { useState } from 'react';
import { Picker, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import Button from '~/components/Button/index';
import { petAppointment } from '~/store/modules/pets/actions';

import { Container, InputLabel, DateHolder } from './styles';

export default function AppointAdd({ route, navigation }) {
  const { petID } = route.params;
  const places = useSelector(state => state.places.data);
  const doctors = useSelector(state => state.doctors.data);

  const [clinic, setClinic] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDoc, setDoc] = useState(null);
  const dispatch = useDispatch();

  const handleAppointment = async () => {
    const appointment = { clinic, doctor: selectedDoc, date };
    const schema = Yup.object().shape({
      clinic: Yup.string().required(),
      doctor: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(appointment))) {
      return Alert.alert('Maruska', 'Please enter valid information');
    }

    const time = format(date, 'HH:mm');
    const day = format(date, 'dd/MM/yyyy');

    dispatch(petAppointment({ ...appointment, time, day }, petID));
    navigation.goBack();
  };

  const pickerPlaces = places.filter(item => item.kind === 'Clinic');
  const pickerDoctors = doctors.map(item => {
    if (item.pets.includes(petID)) {
      return item;
    }
  });

  console.log(doctors);
  console.log(pickerDoctors);

  return (
    <Container>
      <InputLabel>Appointment clinic</InputLabel>
      <Picker
        style={{ padding: 15 }}
        onValueChange={value => setClinic(value)}
        selectedValue={clinic}
      >
        <Picker.Item label="Select a clinic" value={null} />
        {pickerPlaces.map(item => (
          <Picker.Item
            label={`${item.name} - ${item.city}`}
            value={item.name}
          />
        ))}
      </Picker>
      <InputLabel>Appointment Vet</InputLabel>
      <Picker
        style={{ padding: 15 }}
        onValueChange={value => setDoc(value)}
        selectedValue={selectedDoc || null}
      >
        <Picker.Item label="Select a vet" value={null} />
        {pickerDoctors[0] &&
          pickerDoctors.map(item => (
            <Picker.Item
              label={`${item.name} - ${item.clinic}`}
              value={item.name}
            />
          ))}
      </Picker>
      <InputLabel>Please select the date and time</InputLabel>
      <DateHolder>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="datetime"
          minimumDate={new Date()}
          locale="en"
        />
      </DateHolder>
      <Button title="Add Appointment" onPress={handleAppointment} />
    </Container>
  );
}

AppointAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
