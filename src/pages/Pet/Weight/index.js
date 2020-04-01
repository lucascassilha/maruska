import React, { useState, useEffect } from 'react';
import {
  format,
  differenceInMonths,
  parseISO,
  isValid,
  addMonths,
} from 'date-fns';
import { Dimensions, Alert, Vibration } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import { ptBR, enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';
import Button from '~/components/Button/index';
import { petWeightAdd } from '~/store/modules/pets/actions';
import translate, { locale } from '~/locales';

import { Container, InputLabel, Input, ErrorLabel } from './styles';

import Notification from '~/config/NotificationService';

import { notificationAdd } from '~/store/modules/notifications/actions';

export default function Weight({ route, navigation }) {
  const { petID } = route.params;

  const weightUnit = useSelector(state => state.weight);

  const pets = useSelector(state => state.pets.data);

  const localeFNS = locale === 'pt_BR' ? ptBR : enUS;
  const date = format(new Date(), 'MMMM', { locale: localeFNS });
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(null);
  const [labels, setLabels] = useState(['Jan']);
  const [data, setData] = useState([0]);
  const [editable, setEditable] = useState(true);

  const handleAddWeight = () => {
    if (weight) {
      Alert.alert(
        `${weight} ${locale === 'en_US' ? 'lbs' : 'kg'}`,
        `${translate('thisMonth')} (${date}) ${translate('weightRight')}`,
        [
          {
            text: translate('itsRight'),
            onPress: async () => {
              const currentDate = new Date();
              const notificationDate = addMonths(currentDate, 1);
              const title = `${translate('timeToWeight')} ${petID}`;
              const message = `${translate(
                'dontForgetWeight'
              )} ${petID}${translate('weightThisMonth')}`;
              const notificationID = await Notification.scheduleNotification(
                notificationDate,
                title,
                message
              );
              const notification = {
                title,
                message,
                id: notificationID,
                petID,
                date: notificationDate,
              };
              dispatch(notificationAdd(notification));

              const weightData = { weight, date, created_at: currentDate };
              dispatch(petWeightAdd(weightData, petID));
              navigation.goBack();
            },
          },
          { text: translate('cancelButton') },
        ]
      );
    } else {
      Vibration.vibrate();
    }
  };

  useEffect(() => {
    const petIndex = pets.findIndex(item => item.name === petID);

    const weightData = pets[petIndex].weight;

    if (weightData) {
      const labelList = weightData.map(item => item.date);
      const weightList = weightData.map(item => parseFloat(item.weight));

      setLabels(labelList);
      setData(weightList);

      const currentDate = new Date();

      const monthRegistered = weightData.findIndex(item => {
        const dateValid = isValid(item.created_at);
        const parsedDate = dateValid
          ? item.created_at
          : parseISO(item.created_at);
        return differenceInMonths(parsedDate, currentDate) === 0;
      });
      console.log(monthRegistered);
      if (monthRegistered === 0) {
        setEditable(false);
      }
    }
  }, []);

  return (
    <Container style={{ flex: 1 }}>
      <LineChart
        fromZero
        data={{
          labels,
          datasets: [
            {
              data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 60}
        height={220}
        yAxisSuffix={locale === 'en_US' ? ' lbs' : ' kg'}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#eb3349',
          backgroundGradientTo: '#eb3349',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#3f4b5e',
          },
        }}
      />
      <InputLabel disabled={!editable}>
        {`${translate('addWeightLabel')} (${weightUnit})`}
      </InputLabel>
      <Input
        disabled={!editable}
        onChangeText={setWeight}
        maxLength={5}
        value={weight}
        keyboardType="number-pad"
        placeholder="35.5"
        onSubmitEditing={handleAddWeight}
      />
      {!editable ? <ErrorLabel>{translate('weightAlready')}</ErrorLabel> : null}
      <Button
        title={translate('registerLabel')}
        onPress={handleAddWeight}
        disabled={!editable}
      />
    </Container>
  );
}

Weight.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
