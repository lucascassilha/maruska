import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 0px;
  flex: 1;
  background-color: #fff;
`;

export const Holder = styled.View`
  padding: 10px 30px;
`;

export const InputLabel = styled.Text`
  color: #000;
  font-family: 'OpenSans-Italic';
  font-size: 12px;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'OpenSans-Regular';
  color: #000;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const ErrorLabel = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: 'OpenSans-Bold';
  color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
`;
