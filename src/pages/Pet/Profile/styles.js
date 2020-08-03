import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding: 0px 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'OpenSans-BoldItalic';
  color: #000;
`;
export const Box = styled.View`
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 20px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const InfoHolder = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

export const InfoTextHolder = styled.View``;

export const TextColumn = styled.View``;

export const Label = styled.Text`
  color: #000;
  font-family: 'OpenSans-Italic';
  font-size: 12px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: 'OpenSans-Bold';
`;

export const Picture = styled.Image`
  align-self: center;
  margin-top: 10px;
  height: 250px;
  width: 250px;
  border-radius: 5px;
`;

export const AnimationHolder = styled.View`
  height: 250px;
  width: 250px;
  align-self: center;
`;
