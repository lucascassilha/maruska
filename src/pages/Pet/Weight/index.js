import React, { useState, useEffect } from 'react';
import {
  format,
  differenceInMonths,
  parseISO,
  isValid,
  addMonths,
} from 'date-fns';
import { Dimensions, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import Button from '~/components/Button/index';
import { petWeightAdd } from '~/store/modules/pets/actions';

import { Container, InputLabel, Input, ErrorLabel } from './styles';

import Notification from '~/config/NotificationService';

import { notificationAdd } from '~/store/modules/notifications/actions';

export default function Weight({ route, navigation }) {
  const { petID } = route.params;

  const pets = useSelector(state => state.pets.data);

  const date = format(new Date(), 'MMMM');
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(null);
  const [labels, setLabels] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ]);
  const [data, setData] = useState([0, 0, 0, 0, 0, 0]);
  const [editable, setEditable] = useState(true);

  const handleAddWeight = () => {
    if (weight) {
      Alert.alert(
        `${weight} kg`,
        `Is this month (${date}) weight right? You can't change this later!`,
        [
          {
            text: "It's right",
            onPress: async () => {
              const currentDate = new Date();
              const notificationDate = addMonths(currentDate, 1);
              const title = `It's time to weight ${petID}`;
              const message = `Don't forget to register ${petID}'s weight this month!`;
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
          { text: 'Cancel' },
        ]
      );
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
        yAxisSuffix=" kg"
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
        Please input this month weight (kg)
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
      {!editable ? (
        <ErrorLabel>
          You have already registered a weight this month!
        </ErrorLabel>
      ) : null}
      <Button
        title="Register weight"
        onPress={handleAddWeight}
        disabled={!editable}
      />
    </Container>
  );
}
