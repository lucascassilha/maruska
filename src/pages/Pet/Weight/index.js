import React, { useState, useEffect } from 'react';
import { format, parseISO, isValid, isSameDay, isSameMonth } from 'date-fns';
import { Dimensions, Alert, Vibration } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ptBR, enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';

import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

import PageHeader from '~/components/PageHeader';
import Button from '~/components/Button';
import { petWeightAdd } from '~/store/modules/pets/actions';
import translate, { locale } from '~/locales';

import {
  Container,
  Scroll,
  Holder,
  InputLabel,
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
    setLoading(true);

    if (weightData) {
      setChart(weightData);
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
            const value = (
              (Number(finalArray[monthIndex].weight) + Number(element.weight)) /
              2
            ).toFixed(2);
            finalArray[monthIndex].weight = Number(value);
          } else {
            const elementValid = isValid(element.created_at);
            const data = {
              ...element,
              weight: parseFloat(element.weight),
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
          const value = (
            (Number(finalArray[monthIndex].weight) + Number(element.weight)) /
            2
          ).toFixed(2);
          finalArray[monthIndex].weight = Number(value);
        } else {
          const elementValid = isValid(element.created_at);
          const data = {
            ...element,
            weight: parseFloat(element.weight),
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
      console.log(finalArray);

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

  console.log(byMonth);

  return (
    <Container>
      <PageHeader
        navigation={navigation}
        source={require('~/assets/img/weight.png')}
        title={translate('weightTitle')}
      />
      <Scroll>
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
        <ChartTitle>Last weight records</ChartTitle>
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
        <ChartTitle>Weight by month</ChartTitle>
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
        <RegularTitle>Weight registrations</RegularTitle>
        {weightData[0] &&
          weightData.map(item => (
            <WeightHolder>
              <WeightLabel>
                {`${item.date} - ${item.weight}${weightUnit}`}
              </WeightLabel>
            </WeightHolder>
          ))}
        {storedWeightData &&
          storedWeightData.map(item => (
            <WeightHolder>
              <WeightLabel>
                {`${item.date} - ${item.weight}${weightUnit}`}
              </WeightLabel>
            </WeightHolder>
          ))}
      </Scroll>
    </Container>
  );
}

Weight.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
