import React, { useState, useRef } from 'react';
import { Picker, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Button from '~/components/Button/index';
import { addDoctor, deleteDoctor } from '~/store/modules/doctors/actions';

import { Container, InputLabel, Input } from './styles';

export default function DocAdd({ route, navigation }) {
  const { petID } = route.params;
  const places = useSelector(state => state.places.data);
  const doctors = useSelector(state => state.doctors.data);

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [selectedDoc, setDoc] = useState(null);
  const dispatch = useDispatch();

  const handleAddDoctor = async () => {
    let doc = { name, phone, clinic, pets: [petID] };
    if (!selectedDoc) {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        phone: Yup.string().required(),
        clinic: Yup.string().required(),
        pets: Yup.array().required(),
      });

      if (!(await schema.isValid(doc))) {
        return Alert.alert('Maruska', 'Please enter valid information');
      }
    }
    const inputDoctorIndex = doctors.findIndex(item => item.name === name);
    if (inputDoctorIndex >= 0) {
      return Alert.alert('Maruska', 'You already registered this vet!');
    }

    const pickerDoctorIndex = doctors.findIndex(
      item => item.name === selectedDoc
    );
    if (selectedDoc && pickerDoctorIndex === -1) {
      return Alert.alert('Maruska', 'Please enter valid information');
    }
    if (pickerDoctorIndex >= 0) {
      doc = doctors[pickerDoctorIndex];
    }

    dispatch(addDoctor(doc, petID));
    navigation.goBack();
  };

  const pickerPlaces = places.filter(item => item.kind === 'Clinic');
  const pickerDoctors = doctors.map(item => {
    if (!item.pets.includes(petID)) {
      return item;
    }
  });

  const phoneRef = useRef();

  return (
    <Container>
      <InputLabel>Name</InputLabel>
      <Input
        maxLength={20}
        onChangeText={setName}
        onSubmitEditing={() => phoneRef.current.focus()}
      />
      <InputLabel>Phone Number</InputLabel>
      <Input
        maxLength={20}
        keyboardType="number-pad"
        onChangeText={setPhone}
        ref={phoneRef}
      />
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
      <InputLabel>Or select a already registered vet</InputLabel>
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
      <Button title="Register" onPress={handleAddDoctor} />
    </Container>
  );
}

DocAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
