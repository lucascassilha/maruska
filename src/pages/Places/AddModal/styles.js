import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export const Wrapper = styled.Modal``;

export const Container = styled(Animatable.View)`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
`;

export const Box = styled(LinearGradient).attrs({
  colors: ['#fff', '#EFEFEF'],
})`
  margin: 30px;
  border-radius: 4px;
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
  margin-bottom: 20px;
  text-align: center;
  font-family: 'OpenSans-Bold';
`;

export const InputLabel = styled.Text`
  color: #eb3349;
  font-size: 14px;
  text-align: left;
  font-family: 'OpenSans-Regular';
`;

export const SelectorBox = styled.View``;

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
  font-family: 'OpenSans-Bold';
  color: #fff;
`;

export const CancelHolder = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  margin-top: 20px;
`;

export const CancelLabel = styled.Text`
  color: #eb3349;
  font-family: 'OpenSans-Bold';
  text-decoration: underline;
`;
