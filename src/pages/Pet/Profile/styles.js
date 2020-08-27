import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${props => props.theme.main_background};
  flex: 1;
  padding: 0px 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'OpenSans-BoldItalic';
  color: ${props => props.theme.general_label};
`;
export const Box = styled.View`
  background-color: ${props => props.theme.secondary_background};
  border-radius: 5px;
  padding: 20px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const InfoHolder = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-evenly;
`;

export const InfoTextHolder = styled.View``;

export const TextColumn = styled.View`
  width: 50%;
`;

export const Label = styled.Text`
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-Italic';
  font-size: 12px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-Bold';
`;

export const Picture = styled.Image`
  align-self: center;
  margin-top: 10px;
  height: ${props => props.width};
  width: ${props => props.width};
  border-radius: 5px;
`;

export const AnimationHolder = styled.View`
  height: 250px;
  width: 250px;
  align-self: center;
`;
