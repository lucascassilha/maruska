import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 30px;
`;

export const InputLabel = styled.Text`
  margin-top: 10px;
  color: #eb3349;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: #eb3349;
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'OpenSans-Regular';
  color: #f2f2f2;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;

export const ErrorLabel = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: 'OpenSans-Bold';
  color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
`;
