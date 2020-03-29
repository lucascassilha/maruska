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
  background-color: #f4f4f4;
  border-radius: 4px;
  margin: 5px 0px;
  padding: 10px 0px;
  flex-direction: row;
  padding: 20px 10px;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: 'OpenSans-Regular';
  margin-left: 10px;
`;

export const Version = styled.Text`
  font-size: 16px;
  color: #000;
  opacity: 0.5;
  text-align: center;
  margin: 5px 0px;
  font-family: 'OpenSans-Regular';
`;

export const IconHolder = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
`;
