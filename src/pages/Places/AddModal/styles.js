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

export const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const TitleImage = styled.Image`
  height: 40px;
  width: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #000000;
  font-family: 'OpenSans-BoldItalic';
  margin-left: 10px;
  margin-right: 10px;
`;

export const InputLabel = styled.Text`
  color: #000;
  font-size: 12px;
  text-align: left;
  font-family: 'OpenSans-Italic';
  margin-top: 5px;
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

export const Submit = styled.TouchableOpacity`
  align-self: stretch;
  background-color: #000;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin: 10px 0px;
`;
export const SubmitTitle = styled.Text`
  font-size: 16px;
  font-family: 'OpenSans-Bold';
  color: #fff;
`;

export const ErrorLabel = styled.Text`
  font-size: 12px;
  color: #eb3349;
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
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  margin-left: 10px;
`;

export const CategoryPicker = styled(Picker)``;
