import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Alert, Vibration, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Button from '~/components/Button/index';
import translate from '~/locales';

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
  const [lostRegion, setRegion] = useState('');

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
      return Alert.alert(translate('print'), translate('afterYouDo'));
    }
    Vibration.vibrate();
    return Alert.alert(
      translate('missingContactTitle'),
      translate('missingContactInfo')
    );
  };

  const regionRef = useRef();

  const regionLength = useMemo(() => 40 - Number(lostRegion.length), [
    lostRegion,
  ]);

  return (
    <Container>
      <StatusBar hidden />
      <LabelInput>
        {changeInfo
          ? translate('editInformation')
          : translate('firstInformation')}
      </LabelInput>
      <LabelInput>{translate('phoneInfo')}</LabelInput>
      <Input
        onChangeText={setContact}
        value={contact}
        maxLength={30}
        onSubmitEditing={() => regionRef.current.focus()}
      />
      <LabelInput>{`${translate('regionInfo')} ${regionLength})`}</LabelInput>
      <Input
        onChangeText={setRegion}
        maxLength={40}
        ref={regionRef}
        onSubmitEditing={handleSaveInformation}
      />
      <Button title={translate('saveInfo')} onPress={handleSaveInformation} />
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
          <CompInfo>{`${translate('age')}: ${pet.date}`}</CompInfo>
          {pet.breed ? (
            <CompInfo>{`${translate('infoBreed')}: ${pet.breed}`}</CompInfo>
          ) : null}
          {pet.sex ? (
            <CompInfo>{`${translate('infoSex')}: ${pet.sex}`}</CompInfo>
          ) : null}
          {pet.chip ? (
            <CompInfo>{`${translate('chip')}: ${pet.chip}`}</CompInfo>
          ) : null}
          {lostRegion ? (
            <CompInfo>{`${translate('lastSeen')}: ${lostRegion}`}</CompInfo>
          ) : null}
          <ImportantInfo>{`${translate('contact')}: ${contact}`}</ImportantInfo>
          <ImportantInfo>
            {`${translate('ifYouHave')} ${pet.name}, ${translate('contactMe')}`}
          </ImportantInfo>
        </ModalContainer>
      </ModalHolder>
    </Container>
  );
}

LostPet.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
