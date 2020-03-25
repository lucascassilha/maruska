import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '~/components/Button/index';

import {
  Container,
  LabelInput,
  Input,
  ModalHolder,
  ModalContainer,
  Avatar,
  ImportantInfo,
  CompInfo,
} from './styles';

export default function LostPet({ route }) {
  const { changeInfo, pet } = route.params;

  const [modalVisible, setVisible] = useState(false);
  const [auxInfo, setAuxInfo] = useState(false);
  const [contact, setContact] = useState(null);
  const [lostRegion, setRegion] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      const data = await AsyncStorage.getItem('@contact');
      setAuxInfo(data);
    };
    loadInfo();
  }, []);

  useEffect(() => {
    if (auxInfo) {
      setContact(auxInfo);
    }
  }, [auxInfo]);

  const handleSaveInformation = async () => {
    if (contact) {
      setVisible(true);
      await AsyncStorage.setItem('@contact', contact);
      return Alert.alert(
        'Print this screen',
        'After you do that, share the image with as many people as possible. This way more people can contact you if they find your pet!'
      );
    }
    return Alert.alert(
      'Your contact information is missing!',
      'Please input a contact information!'
    );
  };

  const regionRef = useRef();

  return (
    <Container>
      <LabelInput>
        {changeInfo
          ? 'Please edit your contact information'
          : 'First, we need a contact information'}
      </LabelInput>
      <LabelInput>(phone,email - whatever is the easier)</LabelInput>
      <Input
        onChangeText={setContact}
        value={contact}
        maxLength={30}
        onSubmitEditing={() => regionRef.current.focus()}
      />
      <LabelInput>
        We also need to know in which region the pet got lost (optional) (40)
      </LabelInput>
      <Input
        onChangeText={setRegion}
        maxLength={40}
        ref={regionRef}
        onSubmitEditing={handleSaveInformation}
      />
      <Button title="Save my information" onPress={handleSaveInformation} />
      <ModalHolder
        visible={modalVisible}
        onRequestClose={() => setVisible(false)}
      >
        <ModalContainer>
          <Avatar
            source={
              pet.avatar ? { uri: `data:image/*;base64,${pet.avatar}` } : null
            }
          />
          <ImportantInfo>{pet.name}</ImportantInfo>
          <CompInfo>{`Age: ${pet.date}`}</CompInfo>
          {pet.breed ? <CompInfo>{`Breed: ${pet.breed}`}</CompInfo> : null}
          {pet.sex ? <CompInfo>{`Sex: ${pet.sex}`}</CompInfo> : null}
          {pet.chip ? <CompInfo>{`Chip Number: ${pet.chip}`}</CompInfo> : null}
          {lostRegion ? (
            <CompInfo>{`Last seen: ${lostRegion}`}</CompInfo>
          ) : null}
          <ImportantInfo>{`Contact Information: ${contact}`}</ImportantInfo>
          <ImportantInfo>
            {`Please, if you have seen ${pet.name}, contact me with the above information!`}
          </ImportantInfo>
        </ModalContainer>
      </ModalHolder>
    </Container>
  );
}
