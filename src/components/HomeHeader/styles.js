import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  padding: 0px 20px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Logo = styled.Image`
  height: 30px;
  width: 130px;
  margin-top: 5px;
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

export const BellIcon = styled(Icon).attrs({
  color: props => props.theme.logo_color,
})``;
