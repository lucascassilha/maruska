import React, { useState } from 'react';
import { Alert, Vibration } from 'react-native';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import Button from '~/components/Button/index';
import { petSurgery } from '~/store/modules/pets/actions';
import { Container, InputLabel, DateHolder, Input } from './styles';
import translate, { locale } from '~/locales';

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
      Vibration.vibrate();
      return Alert.alert('Maruska', translate('missingInfo'));
    }

    const dateString = locale === 'en_US' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
    const day = format(date, dateString);

    dispatch(petSurgery({ ...surgery, day }, petID));
    navigation.goBack();
  };

  const pickerPlaces = places.filter(item => item.kind === translate('clinic'));

  return (
    <Container>
      <InputLabel>{translate('surgName')}</InputLabel>
      <Input maxLength={25} onChangeText={setName} />
      <InputLabel>{translate('surgClinic')}</InputLabel>
      <Picker
        style={{ padding: 15 }}
        onValueChange={value => setClinic(value)}
        selectedValue={clinic}
      >
        <Picker.Item label={translate('appClinicSelect')} value={null} />
        {pickerPlaces.map(item => (
          <Picker.Item
            label={`${item.name} - ${item.city}`}
            value={item.name}
          />
        ))}
      </Picker>
      <InputLabel>{translate('surgDate')}</InputLabel>
      <DateHolder>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          locale={locale}
        />
      </DateHolder>
      <Button title={translate('registerLabel')} onPress={handleSurgery} />
    </Container>
  );
}

SurgeryAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
