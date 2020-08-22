import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.main_background};
  padding: 10px 20px;
`;

export const Holder = styled.View`
  background-color: ${props => props.theme.secondary_background};
  border-radius: 5px;
  justify-content: center;
  padding: 20px;
`;

export const ProImage = styled.Image`
  height: 200px;
  width: 190px;
  align-self: center;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-BoldItalic';
  color: ${props => props.theme.general_label};
  font-size: 21px;
`;

export const Label = styled.Text`
  font-family: 'OpenSans-Bold';
  color: ${props => props.theme.general_label};
  font-size: 18px;
  text-align: left;
  color: #888282;
`;

export const BuyButton = styled.TouchableOpacity`
  align-self: center;
  margin-top: 20px;
  background-color: ${props => props.theme.pet_button};
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled(Title)`
  font-size: 35px;
  color: #fff;
`;

export const SmallLabel = styled(Title)`
  color: #fff;
`;
