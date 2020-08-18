import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.main_background};
  padding: 0px 20px;
  align-items: center;
  padding-top: 20px;
`;

export const Box = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.settings_button};
  border-radius: 4px;
  margin: 5px 0px;
  padding: 10px 0px;
  flex-direction: row;
  padding: 20px 10px;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.general_label};
  font-family: 'OpenSans-Regular';
  margin-left: 10px;
  width: 80%;
`;

export const Version = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.general_label};
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

export const Comment = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.general_label};
  opacity: 0.5;
  text-align: center;
  margin-top: -5px;
  font-family: 'OpenSans-Regular';
`;

export const Title = styled.Text`
  font-family: 'OpenSans-BoldItalic';
  font-size: 18px;
  color: ${props => props.theme.general_label};
  margin: 10px 0px;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  background-color: ${props => props.theme.main_background};
  flex: 1;
`;

export const SwitchBox = styled.View`
  background-color: ${props => props.theme.settings_button};
  border-radius: 4px;
  margin: 5px 0px;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
  align-items: center;
`;
