import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px 20px;
  align-items: center;
`;

export const Box = styled.View`
  align-self: stretch;
  flex: 1;
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
  font-family: 'OpenSans-Regular';
  margin-left: 5px;
`;

export const Version = styled.Text`
  font-size: 16px;
  color: #000;
  opacity: 0.5;
  text-align: center;
  margin: 5px 0px;
  font-family: 'OpenSans-Regular';
`;
