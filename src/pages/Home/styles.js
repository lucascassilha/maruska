import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.main_background};
  padding-top: 30px;
`;

export const PetList = styled.FlatList.attrs({})``;

export const Box = styled(RectButton)`
  background-color: ${props => props.theme.button};
  margin: 5px 0px;
  padding: 15px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const PetImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 4px;
`;

export const TextHolder = styled.View`
  margin-left: 10px;
  width: 60%;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-family: 'OpenSans-Bold';
  color: #fff;
`;

export const Info = styled.Text`
  font-size: 14px;
  color: #fff;
  font-family: 'OpenSans-Regular';
`;

export const AnimationHolder = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const AnimationLabel = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.general_label};
  opacity: 0.5;
  font-family: 'OpenSans-Regular';
`;
