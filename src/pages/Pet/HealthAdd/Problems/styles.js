import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 30px;
  background-color: #fff;
`;

export const InputLabel = styled.Text`
  margin-top: 10px;
  color: #eb3349;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: #eb3349;
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'OpenSans-Regular';
  color: #f2f2f2;
`;

export const DateHolder = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
