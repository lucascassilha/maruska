import React, { useState, useEffect } from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from '~/components/Button/index';
import addDoctor from '~/store/modules/doctors/actions';

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

  const handleAddDoctor = () => {
    let doc = { name, phone, clinic, pets: [petID] };
    if (selectedDoc) {
      const docIndex = doctors.findIndex(item => item.name === selectedDoc);
      doc = doctors[docIndex];
    }

    dispatch(addDoctor(doc, petID));
  };

  const pickerPlaces = places.filter(item => item.kind === 'Clinic');
  const pickerDoctors = doctors.map(item => {
    if (!item.pets.includes(petID)) {
      return item;
    }
  });

  console.log(doctors);
  console.log(pickerDoctors);

  return (
    <Container>
      <InputLabel>Name</InputLabel>
      <Input maxLength={20} onChangeText={setName} />
      <InputLabel>Phone Number</InputLabel>
      <Input maxLength={20} keyboardType="number-pad" onChangeText={setPhone} />
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
      <Button title="Add Vet" onPress={handleAddDoctor} />
    </Container>
  );
}
