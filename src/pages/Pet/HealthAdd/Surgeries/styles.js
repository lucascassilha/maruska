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

export const Input = styled.TextInput`
  align-self: stretch;
  background-color: ${props => props.theme.secondary_background};
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.general_label};
`;

export const DateHolder = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
