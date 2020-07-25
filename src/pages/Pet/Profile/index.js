import React, { useMemo } from 'react';
import { StatusBar, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import changeStatus from '~/store/modules/modalVisible/actions';
import EditModal from './EditModal';
import Button from '~/components/Button/index';
import { deletePet } from '~/store/modules/pets/actions';
import translate from '~/locales';

import {
  Container,
  PetInfo,
  PetMenu,
  Header,
  Avatar,
  InfoHolder,
  InfoTextHolder,
  TextLine,
  Label,
  Info,
  MenuTitle,
  EmergencyHolder,
  MenuHolder,
  ButtonHolder,
  Gradient,
  ImageIcon,
  Dot,
} from './styles';

import vaccine from '~/assets/img/vaccine.png';
import pill from '~/assets/img/pill.png';
import weight from '~/assets/img/weight.png';
import doctor from '~/assets/img/doctor.png';
import camera from '~/assets/img/camera.png';
import pencil from '~/assets/img/pencil.png';

export default function Profile({ route, navigation }) {
  const { pet } = route.params;
  const weightLabel = useSelector(state => state.weight);

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(changeStatus(2));
  };

  const weightData = useMemo(
    () => (pet.weight ? pet.weight[pet.weight.length - 1].weight : '--'),
    [pet]
  );

  const buttons = [
    {
      id: 0,
      image: vaccine,
      colors: ['#FED3D8', '#F9DEE1'],
      onPress: () => {
        navigation.navigate('Vaccines', { petID: pet.name });
      },
    },
    {
      id: 1,
      image: pill,
      colors: ['#CFFFF4', '#DAFBF3'],
      onPress: () => {
        navigation.navigate('Medications', { petID: pet.name });
      },
    },
    {
      id: 2,
      image: weight,
      colors: ['#CFDDFF', '#DAEBFB'],
      onPress: () => {
        navigation.navigate('Weight', { petID: pet.name });
      },
    },
    {
      id: 3,
      image: doctor,
      colors: ['#FFF4CF', '#FFFDE7'],
      onPress: () => {
        navigation.navigate('Health', { petID: pet.name });
      },
    },
    {
      id: 4,
      image: camera,
      colors: ['#DCFFCF', '#EBFFE7'],
      onPress: () => {
        navigation.navigate('Avatar', { petID: pet.name });
      },
    },
    {
      id: 5,
      image: pencil,
      colors: ['#F2F6FF', '#ECECEC'],
      onPress: handleOpen,
    },
  ];

  const handleDeletePet = () => {
    Alert.alert(translate('areYouSure'), translate('notGetBack'), [
      {
        text: translate('sure'),
        onPress: () => {
          dispatch(deletePet(pet.name));
          navigation.navigate('Home');
        },
      },
      { text: translate('cancelButton') },
    ]);
  };

  return (
    <Container>
      <EditModal petInformation={pet} />
      <PetInfo>
        <Header>
          <Avatar
            nullImage={pet.avatar}
            source={
              pet.avatar ? { uri: `data:image/*;base64,${pet.avatar}` } : null
            }
          />
        </Header>
        <InfoHolder>
          <TextLine>
            <InfoTextHolder>
              <Label>{translate('infoWeight')}</Label>
              <Info>{`${weightData} ${weightLabel}`}</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>{translate('infoKind')}</Label>
              <Info>{pet.kind}</Info>
            </InfoTextHolder>
          </TextLine>
          <TextLine>
            <InfoTextHolder>
              <Label>{translate('infoVac')}</Label>
              <Info>{pet.lastVaccine || '--/--/--'}</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>{translate('infoApp')}</Label>
              <Info>{pet.lastAppoint || '--/--/--'}</Info>
            </InfoTextHolder>
          </TextLine>
          <TextLine>
            <InfoTextHolder>
              <Label>{translate('infoBreed')}</Label>
              <Info>{pet.breed || translate('notInformed')}</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>{translate('infoSex')}</Label>
              <Info>{pet.sex}</Info>
            </InfoTextHolder>
          </TextLine>
        </InfoHolder>
      </PetInfo>
      <PetMenu>
        <MenuTitle>{translate('petMenu')}</MenuTitle>
        <Animatable.View animation="slideInRight">
          <MenuHolder
            showsHorizontalScrollIndicator={false}
            horizontal
            data={buttons}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ButtonHolder onPress={item.onPress}>
                <Gradient colors={item.colors}>
                  <ImageIcon source={item.image} />
                </Gradient>
              </ButtonHolder>
            )}
          />
        </Animatable.View>
        <MenuTitle>{translate('emerMenu')}</MenuTitle>
        <EmergencyHolder>
          <Button
            secondary
            title={translate('emerLabel')}
            onPress={() =>
              navigation.navigate('LostPet', { changeInfo: false, pet })
            }
          />
        </EmergencyHolder>
        <MenuTitle>{translate('optMenu')}</MenuTitle>
        <EmergencyHolder>
          <Button
            secondary
            title={translate('optLabel')}
            onPress={handleDeletePet}
          />
        </EmergencyHolder>
      </PetMenu>
    </Container>
  );
}

Profile.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
