import React, { useState } from 'react';
import { Picker, Alert, Vibration } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { format, subDays } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import Button from '~/components/Button/index';
import {
  petAppointment,
  petLastAppointment,
} from '~/store/modules/pets/actions';
import { notificationAdd } from '~/store/modules/notifications/actions';
import translate, { locale } from '~/locales';

import Notification from '~/config/NotificationService';

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
      doctor: Yup.string().nullable(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(appointment))) {
      Vibration.vibrate();
      return Alert.alert('Maruska', translate('helpInfo'));
    }

    const clinicIndex = places.findIndex(item => item.name === clinic);
    let phone = null;
    if (clinicIndex >= 0) {
      phone = places[clinicIndex].phone;
    }

    const timeString = locale === 'en_US' ? 'hh:mm aaaa' : 'HH:mm';
    const dateString = locale === 'en_US' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';

    const time = format(date, timeString);
    const day = format(date, dateString);

    const notificationDate = subDays(date, 1);
    const title = translate('appNotTitle');
    const message = `${translate('appDontForget')} ${petID} ${translate(
      'appTomorrow'
    )} ${time}`;

    const notificationID = await Notification.scheduleNotification(
      notificationDate,
      title,
      message
    );

    const notification = {
      title,
      message,
      id: notificationID,
      date: notificationDate,
      petID,
    };

    dispatch(notificationAdd(notification));

    dispatch(
      petAppointment(
        { ...appointment, time, day, phone, notificationID },
        petID
      )
    );

    dispatch(petLastAppointment(petID, day));
    navigation.goBack();
  };

  const pickerPlaces = places.filter(item => item.kind === translate('clinic'));
  const pickerDoctors = doctors.map(item => {
    if (item.pets.includes(petID)) {
      return item;
    }
  });

  console.log(doctors);
  console.log(pickerDoctors);

  return (
    <Container>
      <InputLabel>{translate('appWhere')}</InputLabel>
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
      <InputLabel>{translate('appWho')}</InputLabel>
      <Picker
        style={{ padding: 15 }}
        onValueChange={value => setDoc(value)}
        selectedValue={selectedDoc || null}
      >
        <Picker.Item label={translate('appVetSelect')} value={null} />
        {pickerDoctors[0] &&
          pickerDoctors.map(item => (
            <Picker.Item label={`${item.name}`} value={item.name} />
          ))}
      </Picker>
      <InputLabel>{translate('dateTime')}</InputLabel>
      <DateHolder>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="datetime"
          minimumDate={new Date()}
          locale={locale}
        />
      </DateHolder>
      <Button title={translate('registerLabel')} onPress={handleAppointment} />
    </Container>
  );
}

AppointAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
