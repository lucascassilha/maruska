import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  Title,
  TitleBox,
  List,
  Box,
  LabelTitle,
  TextBox,
  ButtonBox,
  IconHolder,
  LabelSubtitle,
  DateBox,
  DateLabel,
  ButtonBoxSmall,
} from './styles';

export default function Health() {
  const [doctors, setDoctors] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [appointments, setAppointments] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  const [surgeries, setSurgeries] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  return (
    <Container>
      <TitleBox>
        <Title>Doctors </Title>
      </TitleBox>
      <List
        data={doctors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>Doutor Estranho</LabelTitle>
              <LabelSubtitle>Animal Clinic</LabelSubtitle>
            </TextBox>
            <ButtonBox>
              <IconHolder>
                <Icon name="phone" color="#fff" size={20} />
              </IconHolder>
              <IconHolder>
                <Icon name="trash-alt" color="#fff" size={20} />
              </IconHolder>
            </ButtonBox>
          </Box>
        )}
      />
      <TitleBox>
        <Title>Appointments</Title>
      </TitleBox>
      <List
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>Animal Clinic</LabelTitle>
              <LabelSubtitle>Doutor Estranho</LabelSubtitle>
              <DateBox>
                <DateLabel>13/05/2000 - 14:00</DateLabel>
              </DateBox>
            </TextBox>
            <ButtonBox>
              <IconHolder>
                <Icon name="phone" color="#fff" size={20} />
              </IconHolder>
              <IconHolder>
                <Icon name="trash-alt" color="#fff" size={20} />
              </IconHolder>
            </ButtonBox>
          </Box>
        )}
      />
      <TitleBox>
        <Title>Surgeries</Title>
      </TitleBox>
      <List
        data={surgeries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>Castration</LabelTitle>
              <LabelSubtitle>Animal Clinic</LabelSubtitle>
              <DateBox>
                <DateLabel>13/05/2000</DateLabel>
              </DateBox>
            </TextBox>
            <ButtonBoxSmall>
              <IconHolder>
                <Icon name="trash-alt" color="#fff" size={20} />
              </IconHolder>
            </ButtonBoxSmall>
          </Box>
        )}
      />
      <TitleBox>
        <Title>Problems</Title>
      </TitleBox>
      <List
        data={surgeries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>Epilepsy</LabelTitle>
              <LabelSubtitle>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                maximus lacus vitae viverra ultricies. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </LabelSubtitle>
            </TextBox>
            <ButtonBoxSmall>
              <IconHolder>
                <Icon name="trash-alt" color="#fff" size={20} />
              </IconHolder>
            </ButtonBoxSmall>
          </Box>
        )}
      />
    </Container>
  );
}
