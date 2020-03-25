import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px 20px;
  align-items: center;
`;

export const Box = styled.View`
  align-self: stretch;
`;

export const Button = styled.TouchableOpacity`
  background-color: #eb3349;
  border-radius: 4px;
  margin: 5px 0px;
  padding: 20px 0px;
  flex-direction: row;
  padding: 20px 10px;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: 'OpenSans-Bold';
  margin-left: 5px;
`;

export const Version = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-family: 'OpenSans-Bold';
`;
