import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.main_background};
  padding: 0px 30px;
`;

export const PictureBox = styled.View`
  background-color: ${props => props.theme.main_background};
  align-self: center;
  height: 250px;
  width: 250px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const PictureButton = styled.TouchableOpacity`
  margin: 10px 0px;
`;

export const Label = styled.Text`
  font-family: 'OpenSans-Regular';
  text-align: center;
  font-size: 18px;
  color: ${props => props.theme.general_label};
`;

export const PetImage = styled.Image`
  height: ${props => props.width};
  width: ${props => props.width};
  border-radius: 10px;
  align-self: center;
`;
