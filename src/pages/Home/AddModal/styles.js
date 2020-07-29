import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-community/picker';

export const Wrapper = styled.Modal``;

export const Container = styled(Animatable.View)`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
`;

export const Box = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const InputLabel = styled.Text`
  color: #000000;
  font-size: 14px;
  text-align: left;
  font-family: 'OpenSans-Regular';
`;

export const Label = styled.Text`
  color: #000000;
  font-size: 12px;
  text-align: left;
  font-family: 'OpenSans-Italic';
  margin-bottom: 5px;
`;

export const SelectorBox = styled.View``;

export const DateHolder = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  margin: 0 20px;
`;
export const Input = styled.TextInput`
  align-self: stretch;
  background-color: #f8f8f8;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 8px 15px;
  color: #000;
  font-family: 'OpenSans-Regular';
`;

export const CheckHolder = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;
`;

export const Instruction = styled.Text`
  color: #000;
  text-align: center;
  font-family: 'OpenSans-BoldItalic';
  font-size: 16px;
  margin: 10px 0px;
`;

export const ErrorLabel = styled.Text`
  font-size: 12px;
  color: #120369;
  font-family: 'OpenSans-Regular';
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const CategoryPicker = styled(Picker)``;
