import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const PlaceList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const Box = styled.View`
  background-color: #eb3349;
  margin: 10px 0px;
  padding: 20px;
  border-radius: 4px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextHolder = styled.View``;

export const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export const Info = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const ButtonHolder = styled.View`
  flex-direction: row;
  margin: 10px 0px;
`;

export const Button = styled.TouchableOpacity`
  margin: 0px 10px;
`;
