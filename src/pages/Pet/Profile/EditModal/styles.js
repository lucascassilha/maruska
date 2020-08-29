import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export const Wrapper = styled.Modal``;

export const Container = styled(Animatable.View)`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
`;

export const Box = styled.View`
  margin: 30px;
  border-radius: 4px;
  elevation: 2;
  background-color: ${props => props.theme.main_background};
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const InputLabel = styled.Text`
  color: ${props => props.theme.general_label};
  font-size: 12px;
  text-align: left;
  font-family: 'OpenSans-Italic';
  margin-bottom: 5px;
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

export const CheckHolder = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const DateHolder = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  margin: 0 20px;
`;

export const Instruction = styled.Text`
  color: #eb3349;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0px;
`;

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
