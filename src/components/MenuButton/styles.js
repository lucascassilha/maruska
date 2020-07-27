import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: ${props => props.color};
  padding: 10px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  margin: 5px 0px;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-family: 'Nunito-Italic';
  color: #fff;
  margin-left: 5px;
`;

export const Logo = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  margin: 10px;
`;
