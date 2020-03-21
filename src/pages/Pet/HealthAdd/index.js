import React, { useState } from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from '~/components/Button/index';

import { Container, InputLabel, Input } from './styles';

export default function HealthAdd({ route, navigation }) {
  const { petID, type } = route.params;
  const places = useSelector(state => state.places.data);
  const doctors = useSelector(state => state.doctors.data);

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [clinic, setClinic] = useState('Clinic');

  const dispatch = useDispatch();

  const handleAddDoctor = () => {
    console.log(clinic);
  };

  return (
    <Container>
      <InputLabel>Name</InputLabel>
      <Input maxLength={20} onChangeText={setName} />
      <InputLabel>Phone Number</InputLabel>
      <Input maxLength={20} keyboardType="number-pad" />
      <Picker
        style={{ padding: 15 }}
        onValueChange={value => setClinic(value)}
        selectedValue={clinic}
      >
        <Picker.Item label="Choose a clinic" value={null} />
        {places.map(item => {
          if (item.kind === 'Clinic') {
            return (
              <Picker.Item
                label={`${item.name} - ${item.city}`}
                value={item.name}
              />
            );
          }
        })}
      </Picker>
      <Button title={`Add ${type}`} onPress={handleAddDoctor} />
    </Container>
  );
}
