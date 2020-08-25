import React, { useState, useEffect } from 'react';
import { format, parseISO, isValid, isSameDay, isSameMonth } from 'date-fns';
import { Dimensions, Alert, Vibration } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ptBR, enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';
import Snackbar from 'react-native-snackbar';

import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

import PageHeader from '~/components/PageHeader';
import Button from '~/components/Button';
import { petWeightAdd } from '~/store/modules/pets/actions';
import translate, { locale } from '~/locales';

import {
  Container,
  Scroll,
  Holder,
  InputHolder,
  InputLabel,
  MiniLabel,
  Input,
  ErrorLabel,
  ChartTitle,
  RegularTitle,
  ChartHolder,
  WeightHolder,
  WeightLabel,
} from './styles';

const windowWidth = Math.round(Dimensions.get('window').width);
export default function Weight({ route, navigation }) {
  const { petID } = route.params;

  const weightUnit = useSelector(state => state.weight);

  const pets = useSelector(state => state.pets.data);

  const petIndex = pets.findIndex(item => item.name === petID);
  const weightData = pets[petIndex].weight;
  const storedWeightData = pets[petIndex].storedWeight;

  const localeFNS = locale === 'pt_BR' ? ptBR : enUS;
  const date = format(new Date(), 'dd MMMM', { locale: localeFNS });
  const dispatch = useDispatch();

  const [weight, setWeight] = useState(null);
  const [editable, setEditable] = useState(true);
  const [chartData, setChart] = useState([]);
  const [byMonth, setMonthChart] = useState([]);
  const [loading, setLoading] = useState(false);

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

              const data = { weight, date, created_at: currentDate };
              dispatch(petWeightAdd(data, petID));
              Snackbar.show({
                text: translate('weightRegisteredSnack'),
                duration: Snackbar.LENGTH_LONG,
                action: {
                  text: translate('thk'),
                  textColor: 'green',
                },
              });
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
    setLoading(true);

    if (weightData) {
      const weightAux = [];
      weightData.map(item => {
        weightAux.push({
          ...item,
          weight: Number(item.weight),
        });
      });
      setChart(weightAux);
      const currentDate = new Date();

      const finalArray = [];

      let i = 0;
      if (storedWeightData) {
        while (i < storedWeightData.length) {
          const element = storedWeightData[i];
          let monthIndex = -1;
          finalArray.map((item, index) => {
            const itemValid = isValid(element.created_at);
            const elementValid = isValid(element.created_at);
            if (
              isSameMonth(
                itemValid ? item.created_at : parseISO(item.created_at),
                elementValid ? element.created_at : parseISO(element.created_at)
              )
            ) {
              monthIndex = index;
            }
          });
          if (monthIndex >= 0) {
            const countValue = Number(finalArray[monthIndex].counter) + 1;
            const value = (
              (Number(finalArray[monthIndex].weight) * countValue +
                Number(element.weight)) /
              countValue
            ).toFixed(2);
            finalArray[monthIndex].weight = Number(value);
            finalArray[monthIndex].counter =
              Number(finalArray[monthIndex].counter) + 1;
          } else {
            const elementValid = isValid(element.created_at);
            const data = {
              ...element,
              weight: parseFloat(element.weight),
              counter: 1,
              formattedDate: format(
                elementValid
                  ? element.created_at
                  : parseISO(element.created_at),
                'MMMM yyyy',
                {
                  locale: localeFNS,
                }
              ),
            };
            finalArray.push(data);
          }
          i++;
        }
      }
      while (i < weightData.length) {
        const element = weightData[i];
        let monthIndex = -1;
        finalArray.map((item, index) => {
          const itemValid = isValid(item.created_at);
          const elementValid = isValid(element.created_at);
          if (
            isSameMonth(
              itemValid ? item.created_at : parseISO(item.created_at),
              elementValid ? element.created_at : parseISO(element.created_at)
            )
          ) {
            monthIndex = index;
          }
        });
        if (monthIndex >= 0) {
          const countValue = Number(finalArray[monthIndex].counter);
          const value = (
            (Number(finalArray[monthIndex].weight) * countValue +
              Number(element.weight)) /
            (countValue + 1)
          ).toFixed(2);
          finalArray[monthIndex].weight = Number(value);
          finalArray[monthIndex].counter += 1;
        } else {
          const elementValid = isValid(element.created_at);
          const data = {
            ...element,
            weight: parseFloat(element.weight),
            counter: 1,
            formattedDate: format(
              elementValid ? element.created_at : parseISO(element.created_at),
              'MMMM yyyy',
              {
                locale: localeFNS,
              }
            ),
          };
          finalArray.push(data);
        }
        i++;
      }

      setMonthChart(finalArray);
      let alreadyRegistered = false;
      weightData.findIndex(item => {
        const dateValid = isValid(item.created_at);
        const parsedDate = dateValid
          ? item.created_at
          : parseISO(item.created_at);
        alreadyRegistered = isSameDay(parsedDate, currentDate);
        return 0;
      });
      if (alreadyRegistered) {
        setEditable(false);
      }
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <PageHeader
        navigation={navigation}
        source={require('~/assets/img/weight.png')}
        title={translate('weightTitle')}
      />
      <Scroll>
        {!editable ? (
          <ErrorLabel>{translate('weightAlready')}</ErrorLabel>
        ) : (
          <>
            <InputLabel>{translate('addWeightLabel')}</InputLabel>
            <Holder>
              <InputHolder>
                <Input
                  disabled={!editable}
                  onChangeText={setWeight}
                  maxLength={5}
                  value={weight}
                  keyboardType="number-pad"
                  placeholder="35.5"
                  onSubmitEditing={handleAddWeight}
                />
                <MiniLabel>{weightUnit}</MiniLabel>
              </InputHolder>
              <Button
                title={translate('registerLabel')}
                onPress={handleAddWeight}
                disabled={!editable}
              />
            </Holder>
          </>
        )}
        <ChartTitle>{translate('lastWeight')}</ChartTitle>
        <ChartHolder>
          <VictoryChart
            theme={VictoryTheme.material}
            width={windowWidth - 40}
            minDomain={{ y: 0 }}
          >
            <VictoryLine
              data={chartData}
              x="date"
              y="weight"
              style={{
                data: {
                  stroke: '#56a3a6',
                },
              }}
            />
          </VictoryChart>
        </ChartHolder>
        <ChartTitle>{translate('monthWeight')}</ChartTitle>
        <ChartHolder>
          <VictoryChart
            theme={VictoryTheme.material}
            width={windowWidth - 40}
            minDomain={{ y: 0 }}
          >
            <VictoryLine
              data={byMonth}
              x="formattedDate"
              y="weight"
              style={{
                data: {
                  stroke: '#56a3a6',
                },
              }}
            />
          </VictoryChart>
        </ChartHolder>
        <RegularTitle>{translate('registrationsWeight')}</RegularTitle>
        {weightData &&
          weightData
            .map(item => (
              <WeightHolder>
                <WeightLabel>
                  {`${item.date} - ${item.weight}${weightUnit}`}
                </WeightLabel>
              </WeightHolder>
            ))
            .reverse()}
        {storedWeightData &&
          storedWeightData.map(item =>
            (
              <WeightHolder>
                <WeightLabel>
                  {`${item.date} - ${item.weight}${weightUnit}`}
                </WeightLabel>
              </WeightHolder>
            ).reverse()
          )}
      </Scroll>
    </Container>
  );
}

Weight.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
