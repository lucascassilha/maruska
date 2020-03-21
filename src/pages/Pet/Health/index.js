import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';

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

  const doctors = useSelector(state => state.doctors.data);
  const [appointments, setAppointments] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  const [surgeries, setSurgeries] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [title, setTitle] = useState('Name');
  const [docList, setDocList] = useState([]);

  const handleOpen = type => {
    navigation.navigate('HealthAdd', { petID, type });
  };

  useEffect(() => {
    const docs = doctors.map(item => {
      if (item.pets.includes(petID)) {
        return item;
      }
    });
    console.log(docs);
    if (docs[0]) {
      setDocList(docs);
    }
  }, [doctors]);

  useEffect(() => {
    console.log('loaded!');
  }, []);

  return (
    <Container>
      <TitleBox>
        <Title>Doctors</Title>
        <ButtonBox>
          <IconHolder onPress={() => navigation.navigate('DocAdd', { petID })}>
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
      </TitleBox>
      <List
        data={docList}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>{item.name}</LabelTitle>
              <LabelSubtitle>{item.clinic}</LabelSubtitle>
            </TextBox>
            <ButtonBox>
              <IconHolder
                onPress={() => {
                  Linking.openURL(`tel://${item.phone}`);
                }}
              >
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
        <ButtonBox>
          <IconHolder onPress={() => handleOpen('Appointment')}>
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
