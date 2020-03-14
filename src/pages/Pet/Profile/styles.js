import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
`;

export const PetInfo = styled.View`
  flex: 1;
  background-color: #eb3349;
  elevation: 2;
  padding: 5px 30px;
  justify-content: center;
`;

export const PetMenu = styled.ScrollView`
  flex: 2;
  padding: 0px 30px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  background-color: #fff;
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
  font-size: 12px;
`;

export const Info = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const MenuTitle = styled.Text`
  font-weight: bold;
  color: #eb3349;
  font-size: 18px;
  margin-top: 20px;
`;

export const EmergencyHolder = styled.View`
  margin-top: 5px;
`;

export const EmergencyButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: stretch;
  background-color: #eb3349;
  border-radius: 4px;
  padding: 15px;
  margin-top: 10px;
`;

export const EmergencyLabel = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
`;

export const MenuHolder = styled.FlatList``;
