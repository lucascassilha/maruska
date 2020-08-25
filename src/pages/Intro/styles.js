import styled from 'styled-components/native';
import { PixelRatio } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Screen = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${props => props.color};
`;

export const Title = styled.Text`
  font-family: 'OpenSans-BoldItalic';
  color: #fff;
  margin-top: 20px;
  font-size: 21px;
`;

export const SubTitle = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #fff;
  margin-top: 20px;
  font-size: 16px;
  max-width: 280px;
  text-align: center;
`;

export const ImageHolder = styled.Image`
  height: ${PixelRatio.getPixelSizeForLayoutSize(120)};
  width: 100%;
  align-self: center;
`;

export const LogoHolder = styled(ImageHolder)`
  height: 160px;
  margin-top: 30px;
  width: 160px;
`;

export const DotsHolder = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

export const Dot = styled.View`
  background-color: ${props => (props.active ? '#000' : '#ddd')};
  height: 10px;
  width: 10px;
  border-radius: 10px;
  margin-right: 5px;
`;

export const ButtonHolder = styled.TouchableOpacity``;

export const ProButtonHolder = styled(RectButton)`
  background-color: #eb3349;
  padding: 15px;
  width: 220px;
  border-radius: 5px;
  margin-top: 20px;
`;

export const ButtonLabel = styled.Text`
  font-family: 'OpenSans-Bold';
  color: #fff;
  font-size: 18px;
  text-align: center;
`;
