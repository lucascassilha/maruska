import React, { useState, useRef } from 'react';
import { Alert, Vibration } from 'react-native';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Snackbar from 'react-native-snackbar';

import Button from '~/components/Button';
import { addDoctor } from '~/store/modules/doctors/actions';
import translate from '~/locales';
import { Container, InputLabel, Input } from './styles';

export default function DocAdd({ route, navigation }) {
  const { petID } = route.params;
  const places = useSelector(state => state.places.data);
  const doctors = useSelector(state => state.doctors.data);

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [clinic, setClinic] = useState(translate('none'));
  const [selectedDoc, setDoc] = useState(translate('noneDoc'));
  const dispatch = useDispatch();

  const handleAddDoctor = async () => {
    let doc = { name, phone, clinic, pets: [petID] };
    if (selectedDoc === translate('noneDoc')) {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        phone: Yup.string().nullable(),
        clinic: Yup.string(),
        pets: Yup.array().required(),
      });

      if (!(await schema.isValid(doc))) {
        Vibration.vibrate();
        return Alert.alert(translate('errorLabel'), translate('helpInfo'));
      }
    }
    const inputDoctorIndex = doctors.findIndex(item => item.name === name);
    if (inputDoctorIndex >= 0) {
      return Alert.alert(translate('errorLabel'), translate('doubleVet'));
    }

    const pickerDoctorIndex = doctors.findIndex(
      item => item.name === selectedDoc
    );
    if (selectedDoc !== translate('noneDoc') && pickerDoctorIndex === -1) {
      Vibration.vibrate();
      console.log(selectedDoc);
      return Alert.alert(translate('errorLabel'), translate('helpInfo'));
    }
    if (pickerDoctorIndex >= 0) {
      doc = doctors[pickerDoctorIndex];
    }

    dispatch(addDoctor(doc, petID));
    Snackbar.show({
      text: translate('docScheduledSnack'),
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: translate('thk'),
        textColor: 'green',
      },
    });

    navigation.goBack();
  };

  const pickerPlaces = places.filter(item => item.kind === translate('clinic'));
  const pickerDoctors = doctors.map(item => {
    if (!item.pets.includes(petID)) {
      return item;
    }
  });

  const phoneRef = useRef();

  return (
    <Container>
      <InputLabel>{translate('name')}</InputLabel>
      <Input
        maxLength={20}
        onChangeText={setName}
        onSubmitEditing={() => phoneRef.current.focus()}
      />
      <InputLabel>{translate('vetPhoneNumber')}</InputLabel>
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
        style={{ color: '#888282' }}
      >
        <Picker.Item label={translate('specify')} value={translate('none')} />
        {pickerPlaces.map(item => (
          <Picker.Item
            label={`${item.name} - ${item.city}`}
            value={item.name}
          />
        ))}
      </Picker>
      <InputLabel>{translate('alreadyRegistered')}</InputLabel>
      <Picker
        style={{ padding: 15 }}
        onValueChange={value => setDoc(value)}
        selectedValue={selectedDoc}
        style={{ color: '#888282' }}
      >
        <Picker.Item
          label={translate('appVetSelect')}
          value={translate('noneDoc')}
        />
        {pickerDoctors[0] &&
          pickerDoctors.map(item => (
            <Picker.Item
              label={`${item.name} - ${item.clinic}`}
              value={item.name}
            />
          ))}
      </Picker>
      <Button title={translate('registerLabel')} onPress={handleAddDoctor} />
    </Container>
  );
}

DocAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
