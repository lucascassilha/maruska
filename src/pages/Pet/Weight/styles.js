import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 0px;
  background-color: ${props => props.theme.main_background};
`;

export const Scroll = styled.ScrollView``;

export const Holder = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InputHolder = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  width: 50%;
`;

export const InputLabel = styled.Text`
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-Italic';
  font-size: 14px;
  margin-left: 20px;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const MiniLabel = styled(InputLabel)`
  margin-left: 5px;
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: ${props => props.theme.secondary_background};
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.general_label};
  display: ${props => (props.disabled ? 'none' : 'flex')};
  width: 50%;
  text-align: right;
`;

export const ErrorLabel = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: 'OpenSans-Bold';
  color: #eb3349;
  margin: 10px 0px;
`;

export const ChartTitle = styled.Text`
  font-size: 18px;
  font-family: 'OpenSans-BoldItalic';
  color: ${props => props.theme.general_label};
  margin-left: 20px;
  margin-bottom: -20px;
`;

export const RegularTitle = styled(ChartTitle)`
  margin-bottom: 0px;
`;

export const ChartHolder = styled.View`
  align-items: center;
`;

export const WeightHolder = styled.View`
  align-self: stretch;
  margin: 5px 20px;
  background-color: ${props => props.theme.secondary_background};
  border-radius: 5px;
  padding: 15px;
`;

export const WeightLabel = styled.Text`
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-Regular';
`;
