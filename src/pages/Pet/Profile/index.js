import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

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
  EmergencyButton,
  EmergencyLabel,
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

export default function Profile({ route }) {
  const { pet } = route.params;
  const buttons = [
    {
      id: 0,
      image: vaccine,
      colors: ['#FED3D8', '#F9DEE1'],
    },
    { id: 1, image: pill, colors: ['#CFFFF4', '#DAFBF3'] },
    { id: 2, image: weight, colors: ['#CFDDFF', '#DAEBFB'] },
    { id: 3, image: doctor, colors: ['#FFF4CF', '#FFFDE7'] },
    { id: 4, image: camera, colors: ['#DCFFCF', '#EBFFE7'] },
    { id: 5, image: pencil, colors: ['#F2F6FF', '#ECECEC'] },
  ];

  return (
    <Container>
      <StatusBar backgroundColor="#eb3349" barStyle="light-content" />
      <PetInfo>
        <Header>
          <Avatar
            source={{
              uri: 'https://api.adorable.io/avatars/95/abott@adorable.png',
            }}
          />
        </Header>
        <InfoHolder>
          <TextLine>
            <InfoTextHolder>
              <Label>Weight</Label>
              <Info>{pet.weight || '--'}</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>Kind</Label>
              <Info>{pet.kind}</Info>
            </InfoTextHolder>
          </TextLine>
          <TextLine>
            <InfoTextHolder>
              <Label>Last vaccine</Label>
              <Info>{pet.lastVaccine || '--/--/--'}</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>Last apointment</Label>
              <Info>{pet.lastApoint || '--/--/--'}</Info>
            </InfoTextHolder>
          </TextLine>
          <TextLine>
            <InfoTextHolder>
              <Label>Breed</Label>
              <Info>{pet.breed || 'Not informed'}</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>Sex</Label>
              <Info>{pet.sex}</Info>
            </InfoTextHolder>
          </TextLine>
        </InfoHolder>
      </PetInfo>
      <PetMenu>
        <MenuTitle>Pet Menu</MenuTitle>
        <MenuHolder
          showsHorizontalScrollIndicator={false}
          horizontal
          data={buttons}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ButtonHolder>
              <Gradient colors={item.colors}>
                <ImageIcon source={item.image} />
              </Gradient>
            </ButtonHolder>
          )}
        />
        <MenuTitle>Emergency Menu</MenuTitle>
        <EmergencyHolder>
          <EmergencyButton>
            <EmergencyLabel>Lost my pet!</EmergencyLabel>
          </EmergencyButton>
          <EmergencyButton>
            <EmergencyLabel>Call my clinic!</EmergencyLabel>
          </EmergencyButton>
        </EmergencyHolder>
      </PetMenu>
    </Container>
  );
}

Profile.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
