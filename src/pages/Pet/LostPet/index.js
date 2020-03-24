import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '~/components/Button/index';

import {
  Container,
  LabelInput,
  Input,
  SmallLabel,
  ModalHolder,
  ModalContainer,
} from './styles';

export default function LostPet({ route }) {
  const { changeInfo, pet } = route.params;

  const [modalVisible, setVisible] = useState(false);
  const [auxInfo, setAuxInfo] = useState(false);
  const [contact, setContact] = useState(null);

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
      if (!changeInfo) {
        setVisible(true);
      }
    }
  }, [auxInfo]);

  useEffect(() => {
    if (modalVisible) {
      Alert.alert(
        'Print this screen',
        'After you do that, share the image with as many people as possible. This way more people can contact you if they find your pet!'
      );
    }
  }, [modalVisible]);

  const handleSaveInformation = async () => {
    console.log(contact);
    await AsyncStorage.setItem('@contact', contact);
  };

  return (
    <Container>
      <LabelInput>
        {changeInfo
          ? 'Please edit your contact information'
          : 'First, we need a contact information'}
      </LabelInput>
      <LabelInput>(phone,email - whatever is the easier)</LabelInput>
      <Input onChangeText={setContact} defaultValue={contact} />
      <SmallLabel>This information will be changed for every pet!</SmallLabel>
      <Button title="Save my information" onPress={handleSaveInformation} />
      <ModalHolder
        visible={modalVisible}
        onRequestClose={() => setVisible(false)}
      >
        <ModalContainer />
      </ModalHolder>
    </Container>
  );
}
