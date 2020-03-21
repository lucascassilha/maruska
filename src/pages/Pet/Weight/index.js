import React from 'react';
import { View, Dimensions } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import { Container } from './styles';

export default function Weight() {
  return (
    <Container style={{ flex: 1 }}>
      <LineChart
        bezier
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 50}
        height={220}
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#eb3349',
          backgroundGradientTo: '#eb3349',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
    </Container>
  );
}
