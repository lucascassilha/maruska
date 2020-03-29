import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px 30px;
`;

export const PictureBox = styled(LinearGradient).attrs({
  colors: ['#ffff', '#f2f2f2'],
})`
  align-self: stretch;
  height: 100%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  elevation: 1;
`;

export const PictureButton = styled.TouchableOpacity`
  margin: 10px 0px;
  height: 50%;
`;

export const Label = styled.Text`
  font-family: 'OpenSans-Regular';
  text-align: center;
  font-size: 18px;
  color: #eb3349;
`;

export const PetImage = styled.Image`
  height: 100%;
  border-radius: 10px;
`;
