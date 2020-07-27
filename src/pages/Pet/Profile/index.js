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

import PageHeader from '~/components/PageHeader';

import {
  Container,
  Box,
  Title,
  PetInfo,
  PetMenu,
  Header,
  Avatar,
  InfoHolder,
  InfoTextHolder,
  TextColumn,
  Label,
  Info,
  MenuTitle,
  EmergencyHolder,
  MenuHolder,
  ButtonHolder,
  Gradient,
  ImageIcon,
} from './styles';

import vaccine from '~/assets/img/vaccine.png';
import pill from '~/assets/img/pill.png';
import weight from '~/assets/img/weight.png';
import doctor from '~/assets/img/doctor.png';
import camera from '~/assets/img/camera.png';
import pencil from '~/assets/img/pencil.png';

export default function Profile({ route, navigation }) {
  const { pet, title } = route.params;
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
    <>
      <PageHeader
        title={pet.name}
        source={pet.image ? pet.image : undefined}
        icons
        navigation={navigation}
        onDelete={handleDeletePet}
        onEdit={handleOpen}
      />
      <Container>
        <EditModal petInformation={pet} />
        <Box>
          <Title>Pet Menu</Title>
        </Box>
        <Box>
          <Title>{translate('informations')}</Title>
          <InfoHolder>
            <TextColumn>
              <InfoTextHolder>
                <Label>{translate('infoWeight')}</Label>
                <Info>{`${weightData} ${weightLabel}`}</Info>
              </InfoTextHolder>
              <InfoTextHolder>
                <Label>{translate('infoKind')}</Label>
                <Info>{pet.kind}</Info>
              </InfoTextHolder>
            </TextColumn>
            <TextColumn>
              <InfoTextHolder>
                <Label>{translate('infoBreed')}</Label>
                <Info>{pet.breed || translate('notInformed')}</Info>
              </InfoTextHolder>
              <InfoTextHolder>
                <Label>{translate('infoSex')}</Label>
                <Info>{pet.sex}</Info>
              </InfoTextHolder>
            </TextColumn>
          </InfoHolder>
        </Box>
      </Container>
    </>
  );
}

Profile.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
