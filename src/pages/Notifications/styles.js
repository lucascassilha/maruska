import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const NotifList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const Box = styled.View`
  background-color: #eb3349;
  margin: 10px 0px;
  border-radius: 4px;
  padding: 20px;
`;

export const PetTitle = styled.Text`
  font-size: 22px;
  font-family: 'OpenSans-Bold';
  color: #fff;
`;

export const Description = styled.Text`
  color: #fff;
  font-family: 'OpenSans-Regular';
`;

export const InfoHolder = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

export const InfoBox = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const InfoLabel = styled.Text`
  color: #fff;
  margin-left: 5px;
  font-family: 'OpenSans-Regular';
`;
