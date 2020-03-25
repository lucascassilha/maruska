import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding: 0px 30px;
`;

export const LabelInput = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const Input = styled.TextInput`
  background-color: #eb3349;
  align-self: stretch;
  border-radius: 4px;
  margin: 10px 0px;
  padding: 10px;
  color: #fff;
  font-size: 22px;
`;

export const ModalHolder = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 10px 30px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 250px;
  width: 250px;
  border-radius: 4px;
  align-self: center;
`;

export const ImportantInfo = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 22px;
  color: #eb3349;
  margin: 8px 0px;
`;

export const CompInfo = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;
