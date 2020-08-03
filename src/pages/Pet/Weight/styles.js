import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 0px;
  background-color: #fff;
`;

export const Scroll = styled.ScrollView``;

export const Holder = styled.View`
  padding: 10px 20px;
`;

export const InputLabel = styled.Text`
  color: #000;
  font-family: 'OpenSans-Italic';
  font-size: 12px;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'OpenSans-Regular';
  color: #000;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const ErrorLabel = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: 'OpenSans-Bold';
  color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
`;

export const ChartTitle = styled.Text`
  font-size: 18px;
  font-family: 'OpenSans-BoldItalic';
  color: #000;
  margin-left: 20px;
  margin-bottom: -20px;
`;

export const RegularTitle = styled.Text`
  font-size: 18px;
  font-family: 'OpenSans-BoldItalic';
  color: #000;
  margin-left: 20px;
`;

export const ChartHolder = styled.View`
  align-items: center;
`;

export const WeightHolder = styled.View`
  align-self: stretch;
  margin: 5px 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 15px;
`;

export const WeightLabel = styled.Text`
  color: #000;
  font-family: 'OpenSans-Regular';
`;
