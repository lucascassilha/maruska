import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const PetList = styled.FlatList.attrs({})``;

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

export const Not = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 10px;
  margin-right: 20px;
`;

export const Ball = styled.View`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: #f5cb42;
  position: absolute;
  right: 0;
  margin-right: 3px;
  margin-top: 3px;
  z-index: 1;
  opacity: ${props => (props.empty ? 0 : 1)};
`;
