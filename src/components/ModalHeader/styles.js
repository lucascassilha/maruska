import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const TitleImage = styled.Image`
  height: 40px;
  width: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-BoldItalic';
  margin-left: 10px;
  margin-right: 10px;
`;
