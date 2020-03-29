import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity`
  align-self: stretch;
  background-color: ${props => (props.disabled ? '#f2f2f2' : '#eb3340')};
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
  elevation: 1;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const Label = styled.Text`
  color: #ffff;
  font-size: 16px;
  font-family: 'OpenSans-Bold';
`;
