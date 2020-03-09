import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export const Wrapper = styled.Modal``;

export const Container = styled(Animatable.View)`
  flex: 1;
  justify-content: center;
`;

export const Box = styled(LinearGradient).attrs({
  colors: ['#fff', '#EFEFEF'],
})`
  margin: 40px;
  border-radius: 10px;
  border-radius: 10px;
  elevation: 2;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const Title = styled.Text`
  font-size: 24px;
  color: #eb3349;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export const ButtonInput = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: stretch;
  background-color: #eb3349;
  padding: 14px;
  border-radius: 4px;
  margin: 15px 0px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const Label = styled.Text`
  color: #fff;
`;

export const InputLabel = styled.Text`
  color: #eb3349;
  font-size: 14px;
  text-align: left;
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: #eb3349;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 8px 15px;
  color: #fff;
`;

export const CheckHolder = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Submit = styled.TouchableOpacity`
  align-self: stretch;
  background-color: #eb3349;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin: 10px 0px;
`;
export const SubmitTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const CancelHolder = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  margin-top: 20px;
`;

export const Instruction = styled.Text`
  color: #eb3349;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0px;
`;

export const CancelLabel = styled.Text`
  color: #eb3349;
  font-weight: bold;
  text-decoration: underline;
`;
