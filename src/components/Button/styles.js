import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Wrapper = styled(RectButton)`
  align-self: stretch;
  background-color: #eb3349;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
  elevation: 1;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'OpenSans-Bold';
`;
