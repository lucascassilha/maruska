import React, { useState } from 'react';
import { Picker, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { format, isAfter } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import Button from '~/components/Button/index';
import { petSurgery } from '~/store/modules/pets/actions';
import { Container, InputLabel, DateHolder, Input } from './styles';

export default function SurgeryAdd({ route, navigation }) {
  const { petID } = route.params;
  const places = useSelector(state => state.places.data);

  const [surgeryName, setName] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleSurgery = async () => {
    const surgery = { clinic, date, name: surgeryName };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      clinic: Yup.string().nullable(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(surgery))) {
      return Alert.alert('Maruska', 'Please enter valid information');
    }

    const day = format(date, 'dd/MM/yyyy');

    dispatch(petSurgery({ ...surgery, day }, petID));
    navigation.goBack();
  };

  const pickerPlaces = places.filter(item => item.kind === 'Clinic');

  return (
    <Container>
      <InputLabel>Surgery Name</InputLabel>
      <Input maxLength={25} onChangeText={setName} />
      <InputLabel>Clinic (optional)</InputLabel>
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
      <InputLabel>Please select the date</InputLabel>
      <DateHolder>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          locale="en"
        />
      </DateHolder>
      <Button title="Register" onPress={handleSurgery} />
    </Container>
  );
}

SurgeryAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
