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
  background-color: ${props => props.theme.main_background};
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const InputLabel = styled.Text`
  color: ${props => props.theme.general_label};
  font-size: 12px;
  text-align: left;
  font-family: 'OpenSans-Italic';
  margin-top: 5px;
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: ${props => props.theme.secondary_background};
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 8px 15px;
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-Regular';
`;

export const Submit = styled.TouchableOpacity`
  align-self: stretch;
  background-color: ${props => props.theme.general_label};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin: 10px 0px;
`;
export const SubmitTitle = styled.Text`
  font-size: 16px;
  font-family: 'OpenSans-Bold';
  color: ${props => props.theme.general_label};
`;

export const ErrorLabel = styled.Text`
  font-size: 12px;
  color: red;
  font-family: 'OpenSans-Regular';
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const ButtonHolder = styled.TouchableOpacity`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin-left: 10px;
  color: ${props => props.theme.general_label};
`;

export const CategoryPicker = styled(Picker)``;
