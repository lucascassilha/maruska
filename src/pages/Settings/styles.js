import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px 30px;
  align-items: center;
`;

export const Box = styled.View`
  background-color: #eb3349;
  align-self: stretch;
  padding: 20px;
  border-radius: 4px;
`;

export const Button = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: #df273d;
  padding: 20px 0px;
  flex-direction: row;
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
