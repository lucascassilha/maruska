import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

export const Wrapper = styled.Modal``;

export const Container = styled(Animatable.View)`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
`;

export const Box = styled.View`
  margin: 10px 20px;
  border-radius: 4px;
  elevation: 2;
  background-color: #fff;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
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

export const CancelHolder = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  margin-top: 20px;
`;

export const Instruction = styled.Text`
  color: #eb3349;
  text-align: center;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  margin: 10px 0px;
`;

export const CancelLabel = styled.Text`
  color: #eb3349;
  font-family: 'OpenSans-Bold';
  text-decoration: underline;
`;

export const ErrorLabel = styled.Text`
  font-size: 12px;
  color: #120369;
  font-family: 'OpenSans-Regular';
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
`;
