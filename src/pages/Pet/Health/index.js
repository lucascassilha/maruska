import React, { useState, useEffect } from 'react';
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
  TitleInput,
  LabelInput,
  ExtraHolder,
  ExtraLabel,
  ExtraInput,
} from './styles';

export default function Health({ route, navigation }) {
  const { petID } = route.params;

  const [doctors, setDoctors] = useState([{ name: 'abc' }]);
  const [appointments, setAppointments] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  const [surgeries, setSurgeries] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [title, setTitle] = useState('Name');

  const handleOpen = type => {
    navigation.navigate('HealthAdd', { petID, type });
  };

  useEffect(() => {
    console.log('loaded!');
  }, []);

  return (
    <Container>
      <TitleBox>
        <Title>Doctors</Title>
        <ButtonBox>
          <IconHolder onPress={() => handleOpen('Doctor')}>
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
      </TitleBox>
      <List
        data={doctors}
        keyExtractor={item => item.name}
        renderItem={({ item }) =>
          item.name === '@input' ? (
            <Box>
              <TextBox>
                <TitleInput
                  defaultValue="Doctor Name"
                  onChangeText={setTitle}
                />
                <LabelInput defaultValue="Clinic" />
                <ExtraHolder>
                  <ExtraLabel>Phone: </ExtraLabel>
                  <ExtraInput />
                </ExtraHolder>
              </TextBox>
            </Box>
          ) : (
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
          )
        }
      />
      <TitleBox>
        <Title>Appointments</Title>
        <ButtonBox>
          <IconHolder>
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
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
        <ButtonBox>
          <IconHolder>
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
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
        <ButtonBox>
          <IconHolder>
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
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
