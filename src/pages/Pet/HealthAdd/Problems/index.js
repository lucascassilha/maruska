import React, { useState, useMemo, useRef } from 'react';
import { Alert, Vibration } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import Snackbar from 'react-native-snackbar';

import Button from '~/components/Button';
import { petProblem } from '~/store/modules/pets/actions';
import translate, { locale } from '~/locales';
import { Container, InputLabel, DateHolder, Input } from './styles';

export default function ProblemAdd({ route, navigation }) {
  const { petID } = route.params;

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleProblem = async () => {
    const surgery = { title, date, description };
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(surgery))) {
      Vibration.vibrate();
      return Alert.alert(translate('errorLabel'), translate('helpInfo'));
    }

    const timeString = locale === 'en_US' ? 'hh:mm aaaa' : 'HH:mm';
    const dateString = locale === 'en_US' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';

    const day = format(date, dateString);
    const time = format(date, timeString);

    dispatch(petProblem({ ...surgery, day, time }, petID));
    Snackbar.show({
      text: translate('problemScheduledSnack'),
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: translate('thk'),
        textColor: 'green',
      },
    });
    navigation.goBack();
  };

  const charactersLeft = useMemo(() => 150 - description.length, [description]);

  const descriptionRef = useRef();
  return (
    <Container>
      <InputLabel>{translate('problem')}</InputLabel>
      <Input
        maxLength={25}
        onChangeText={setTitle}
        onSubmitEditing={() => descriptionRef.current.focus()}
      />
      <InputLabel>
        {`${translate('addDescription')} (${charactersLeft})`}
      </InputLabel>
      <Input
        maxLength={150}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        onChangeText={setDescription}
        ref={descriptionRef}
      />
      <InputLabel>{translate('addWhen')}</InputLabel>
      <DateHolder>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="datetime"
          locale={locale}
          fadeToColor="none"
          textColor="#888282"
        />
      </DateHolder>
      <Button title={translate('registerLabel')} onPress={handleProblem} />
    </Container>
  );
}

ProblemAdd.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
