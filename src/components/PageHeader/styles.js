import styled from 'styled-components/native';

export const Wrapper = styled.View`
  background-color: ${props => props.theme.main_background};
`;

export const Container = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  background-color: ${props => props.theme.main_background};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'OpenSans-BoldItalic';
  color: ${props => props.theme.general_label};
  margin-left: 5px;
`;

export const HolderView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  margin-left: 10px;
`;
