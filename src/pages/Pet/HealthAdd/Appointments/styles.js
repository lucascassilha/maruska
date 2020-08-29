import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 20px;
  background-color: ${props => props.theme.main_background};
`;

export const InputLabel = styled.Text`
  margin-top: 10px;
  color: ${props => props.theme.general_label};
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
