import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props => props.theme.main_background};
  flex: 1;
  padding-top: 20px;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-BoldItalic';
  font-size: 18px;
  color: ${props => props.theme.general_label};
  margin: 20px;
  margin-left: 20px;
  margin-bottom: -20px;
`;

export const PlaceList = styled.FlatList``;

export const Box = styled.View`
  background-color: ${props => props.theme.button};
  margin: 5px 0px;
  padding: 20px;
  border-radius: 4px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextHolder = styled.View`
  width: 55%;
`;

export const Name = styled.Text`
  font-size: 24px;
  font-family: 'OpenSans-Bold';
  color: #fff;
`;

export const Info = styled.Text`
  font-size: 14px;
  color: #fff;
  font-family: 'OpenSans-Regular';
`;

export const ButtonHolder = styled.View`
  flex-direction: row;
  margin: 10px 0px;
`;

export const Button = styled.TouchableOpacity`
  margin: 0px 10px;
`;

export const AnimationHolder = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: -40px;
`;

export const AnimationLabel = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.general_label};
  opacity: 0.5;
  text-align: center;
  font-family: 'OpenSans-Regular';
`;
