import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.main_background};
  margin-top: -20px;
`;

export const NotifList = styled.FlatList.attrs({})``;

export const Box = styled.View`
  background-color: ${props => props.theme.pet_button};
  margin: 5px 0px;
  border-radius: 4px;
  padding: 20px;
  display: ${props => (props.isPast ? 'none' : 'flex')};
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
