import React, { useState, useEffect } from 'react';
import { format, differenceInDays, parseISO, isValid } from 'date-fns';
import { Dimensions, Alert, Vibration } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import { ptBR, enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';

import PageHeader from '~/components/PageHeader';
import Button from '~/components/Button';
import { petWeightAdd } from '~/store/modules/pets/actions';
import translate, { locale } from '~/locales';

import { Container, Holder, InputLabel, Input, ErrorLabel } from './styles';

export default function Weight({ route, navigation }) {
  const { petID } = route.params;

  const weightUnit = useSelector(state => state.weight);

  const pets = useSelector(state => state.pets.data);

  const localeFNS = locale === 'pt_BR' ? ptBR : enUS;
  const date = format(new Date(), 'dd MMMM', { locale: localeFNS });
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(null);
  const [labels, setLabels] = useState(['Jan']);
  const [data, setData] = useState([0]);
  const [editable, setEditable] = useState(true);

  const handleAddWeight = () => {
    if (weight) {
      Alert.alert(
        `${weight} ${weightUnit}`,
        `${translate('thisMonth')} (${date}) ${translate('weightRight')}`,
        [
          {
            text: translate('itsRight'),
            onPress: async () => {
              const currentDate = new Date();

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

      const dayRegistered = weightData.findIndex(item => {
        const dateValid = isValid(item.created_at);
        const parsedDate = dateValid
          ? item.created_at
          : parseISO(item.created_at);
        return differenceInDays(parsedDate, currentDate) === 0;
      });
      if (dayRegistered === 0) {
        setEditable(false);
      }
    }
  }, []);

  return (
    <Container style={{ flex: 1 }}>
      <PageHeader
        navigation={navigation}
        source={require('~/assets/img/weight.png')}
        title={translate('weightTitle')}
      />
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
        width={Dimensions.get('window').width}
        height={220}
        yAxisSuffix={weightUnit}
        withInnerLines={false}
        withShadow={false}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#470000',
          },
        }}
      />
      <Holder>
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
        {!editable ? (
          <ErrorLabel>{translate('weightAlready')}</ErrorLabel>
        ) : null}
        <Button
          title={translate('registerLabel')}
          onPress={handleAddWeight}
          disabled={!editable}
        />
      </Holder>
    </Container>
  );
}

Weight.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
