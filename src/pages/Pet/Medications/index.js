import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';

import { useSelector, useDispatch } from 'react-redux';
import {
  petMedication,
  petCheckMedication,
  petDeleteMedication,
} from '~/store/modules/pets/actions';

import {
  Container,
  List,
  InputBox,
  Input,
  InputLabel,
  Label,
  DateHolder,
  Button,
  ButtonLabel,
  Box,
  TextBox,
  ButtonBox,
  ButtonHolder,
  Title,
  SubTitle,
} from './styles';

export default function Medications() {
  const [medications, setMedications] = useState([{ id: 1 }, { id: 2 }]);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(null);
  const [doses, setDoses] = useState(null);

  const dosesRef = useRef();
  return (
    <Container>
      <List
        data={medications}
        renderItem={({ item }) => (
          <Box>
            <TextBox>
              <Title>Label</Title>
              <SubTitle>Next Dose: 4 hours</SubTitle>
              <SubTitle>Last Dose: 13/05/2000 - 15:00</SubTitle>
            </TextBox>
            <ButtonBox>
              <ButtonHolder>
                <Icon name="clipboard-check" color="#fff" size={20} />
              </ButtonHolder>
              <ButtonHolder>
                <Icon name="trash-alt" color="#fff" size={20} />
              </ButtonHolder>
            </ButtonBox>
          </Box>
        )}
      />
      <Label>Register a medication</Label>
      <InputBox>
        <InputLabel>Medication name</InputLabel>
        <Input
          onChangeText={setName}
          maxLength={20}
          onSubmitEditing={() => dosesRef.current.focus()}
        />
        <InputLabel>Number of doses</InputLabel>
        <Input
          placeholder="10"
          maxLength={2}
          keyboardType="number-pad"
          ref={dosesRef}
        />
        <InputLabel>Next dose</InputLabel>
        <DateHolder>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="datetime"
            minimumDate={new Date()}
            locale="en"
            textColor="#ffffff"
            fadeToColor="none"
          />
        </DateHolder>
        <Button>
          <ButtonLabel>Register</ButtonLabel>
        </Button>
      </InputBox>
    </Container>
  );
}
