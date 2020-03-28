import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const NotifList = styled.FlatList.attrs({})``;

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

export const AnimationHolder = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const AnimationLabel = styled.Text`
  font-size: 16px;
  color: #000;
  opacity: 0.5;
  font-family: 'OpenSans-Regular';
`;
