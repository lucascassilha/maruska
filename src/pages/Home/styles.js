import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const PetList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const Box = styled.TouchableOpacity`
  background-color: #eb3349;
  margin: 5px 0px;
  padding: 20px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const PetImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  background-color: #fff;
  opacity: ${props => (props.nullImage ? 1 : 0.3)};
`;

export const TextHolder = styled.View`
  margin-left: 10px;
  width: 60%;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-family: 'OpenSans-Bold';
  color: #fff;
`;

export const Info = styled.Text`
  font-size: 14px;
  color: #fff;
  font-family: 'OpenSans-Regular';
`;
