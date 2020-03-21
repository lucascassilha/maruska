import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
`;

export const PetInfo = styled.View`
  flex: 1;
  background-color: #eb3349;
  elevation: 2;
  padding: 10px 30px;
  justify-content: center;
`;

export const PetMenu = styled.ScrollView`
  flex: 2;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const Avatar = styled.Image`
  height: 250px;
  width: 250px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-top: -10px;
  opacity: ${props => (props.nullImage ? 1 : 0.3)};
`;

export const InfoHolder = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

export const InfoTextHolder = styled.View``;

export const TextLine = styled.View``;

export const Label = styled.Text`
  color: #fff;
  font-family: 'OpenSans-Regular';
  font-size: 12px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: 'OpenSans-Bold';
`;

export const MenuTitle = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #eb3349;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 30px;
`;

export const EmergencyHolder = styled.View`
  margin: 5px 0px;
  padding: 0px 30px;
`;

export const MenuHolder = styled.FlatList``;

export const ButtonHolder = styled.TouchableOpacity`
  height: 120px;
  width: 120px;
  margin: 10px;
`;

export const Gradient = styled(LinearGradient)`
  border-radius: 20px;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ImageIcon = styled.Image`
  height: 80px;
  width: 80px;
`;
