import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';

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

export default function Health({ route, navigation }) {
  const { petID } = route.params;

  const doctors = useSelector(state => state.doctors.data);
  const pets = useSelector(state => state.pets.data);
  const [appointments, setAppointments] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [problems, setProblems] = useState([]);
  const [docList, setDocList] = useState([]);

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
    const petIndex = pets.findIndex(item => item.name === petID);
    if (pets[petIndex].appointments && pets[petIndex].appointments[0]) {
      setAppointments(pets[petIndex].appointments);
    }
    if (pets[petIndex].surgeries && pets[petIndex].surgeries[0]) {
      setSurgeries(pets[petIndex].surgeries);
    }
    if (pets[petIndex].problems && pets[petIndex].problems[0]) {
      setProblems(pets[petIndex].problems);
    }
  }, [pets]);

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
          <IconHolder
            onPress={() => navigation.navigate('AppointAdd', { petID })}
          >
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
      </TitleBox>
      <List
        data={appointments}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>{item.clinic}</LabelTitle>
              <LabelSubtitle>{item.doctor}</LabelSubtitle>
              <DateBox>
                <DateLabel>{`${item.day} - ${item.time}`}</DateLabel>
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
          <IconHolder
            onPress={() => navigation.navigate('SurgeryAdd', { petID })}
          >
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
              <LabelTitle>{item.name || ''}</LabelTitle>
              <LabelSubtitle>{item.clinic}</LabelSubtitle>
              <DateBox>
                <DateLabel>{item.day}</DateLabel>
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
          <IconHolder
            onPress={() => navigation.navigate('ProblemAdd', { petID })}
          >
            <Icon name="plus" color="#eb3349" size={20} />
          </IconHolder>
        </ButtonBox>
      </TitleBox>
      <List
        data={problems}
        keyExtractor={item => item.description}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <LabelTitle>{item.title}</LabelTitle>
              <LabelSubtitle>{`${item.day} - ${item.time}`}</LabelSubtitle>
              <LabelSubtitle>{item.description}</LabelSubtitle>
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

Health.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
