import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {},
})`
  background-color: ${props => props.theme.main_background};
`;

export const ButtonHolder = styled.View`
  padding: 0px 20px;
`;

export const TitleBox = styled.View`
  margin: 0px 20px;
  margin-top: 20px;
  margin-bottom: -5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-Italic';
  font-size: 16px;
  color: ${props => props.theme.general_label};
  text-align: left;
`;

export const List = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 10px 0px;
`;

export const Box = styled.View`
  background-color: ${props => (props.theme.light ? '#56a3a6' : '#37383A')};
  align-self: stretch;
  width: 300px;
  border-radius: 4px;
  margin: 0px 5px;
  padding: 20px 15px;
  flex-direction: row;
  opacity: ${props => (props.isPast ? 0.6 : 1)};
`;

export const TextBox = styled.View`
  width: 80%;
  justify-content: center;
`;

export const LabelTitle = styled.Text`
  color: #fff;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const LabelSubtitle = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #fff;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

export const ButtonBoxSmall = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

export const IconHolder = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const DateBox = styled.View``;

export const DateLabel = styled.Text`
  color: #fff;
`;
