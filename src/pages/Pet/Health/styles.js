import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})``;

export const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 21px;
  color: #eb3349;
  margin-left: 10px;
`;

export const List = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 10px 0px;
`;

export const Box = styled.View`
  background-color: #eb3349;
  align-self: stretch;
  width: 300px;
  border-radius: 4px;
  margin: 0px 10px;
  padding: 20px 15px;
  flex-direction: row;
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
