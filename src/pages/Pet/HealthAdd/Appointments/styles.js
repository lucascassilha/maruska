import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 30px;
  background-color: #fff;
`;

export const InputLabel = styled.Text`
  margin-top: 10px;
  color: #000;
  font-family: 'OpenSans-Italic';
  font-size: 14px;
`;

export const DateHolder = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const ButtonHolder = styled.TouchableOpacity`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

export const ButtonLabel = styled.Text`
  font-family: 'OpenSans-Regular';
  margin-left: 10px;
  font-size: 16px;
`;
