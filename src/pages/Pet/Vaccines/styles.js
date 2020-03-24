import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0px 30px;
`;

export const List = styled.FlatList`
  height: 50%;
`;

export const Label = styled.Text`
  color: #eb3349;
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  margin: 10px 0px;
  text-align: center;
`;

export const InputBox = styled.View`
  align-self: stretch;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin: 10px 0px;
`;

export const Input = styled.TextInput`
  background-color: #eb3349;
  padding: 5px 10px;
  border-radius: 4px;
  margin: 5px 0px;
  color: #fff;
`;

export const InputLabel = styled.Text`
  color: #eb3349;
  margin-top: 5px;
  font-size: 16px;
  font-family: 'OpenSans-Regular';
`;

export const DateHolder = styled.View`
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  align-self: stretch;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  elevation: 1;
  border-radius: 4px;
  margin: 10px 0px;
`;

export const ButtonLabel = styled.Text`
  color: #eb3349;
  font-size: 16px;
  font-family: 'OpenSans-Bold';
`;

export const Box = styled.View`
  background-color: #eb3349;
  margin: 10px 0px;
  border-radius: 4px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextBox = styled.View``;

export const ButtonBox = styled.View`
  flex-direction: row;
`;

export const ButtonHolder = styled.TouchableOpacity`
  margin: 0px 5px;
`;

export const Title = styled.Text`
  font-family: 'OpenSans-Bold';
  color: #fff;
  font-size: 16px;
`;

export const SubTitle = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #fff;
`;

export const ModalHolder = styled.Modal``;

export const ModalContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
`;

export const Scroll = styled.ScrollView``;

export const ModalBox = styled.View`
  background-color: #fff;
  margin: 30px;
  padding: 15px;
  border-radius: 10px;
`;

export const IntervalBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubBox = styled.View`
  width: 48%;
`;

export const CancelBox = styled.TouchableOpacity``;
