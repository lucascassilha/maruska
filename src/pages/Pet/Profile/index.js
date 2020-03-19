import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import changeStatus from '~/store/modules/modalVisible/actions';
import EditModal from './EditModal';
import Button from '~/components/Button/index';

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
} from './styles';

import vaccine from '~/assets/img/vaccine.png';
import pill from '~/assets/img/pill.png';
import weight from '~/assets/img/weight.png';
import doctor from '~/assets/img/doctor.png';
import camera from '~/assets/img/camera.png';
import pencil from '~/assets/img/pencil.png';

export default function Profile({ route, navigation }) {
  const { pet } = route.params;

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(changeStatus(2));
  };

  const buttons = [
    {
      id: 0,
      image: vaccine,
      colors: ['#FED3D8', '#F9DEE1'],
    },
    { id: 1, image: pill, colors: ['#CFFFF4', '#DAFBF3'] },
    { id: 2, image: weight, colors: ['#CFDDFF', '#DAEBFB'] },
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

  return (
    <Container>
      <StatusBar backgroundColor="#eb3349" barStyle="light-content" />
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
              <Label>Last appointment</Label>
              <Info>{pet.lastAppoint || '--/--/--'}</Info>
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
            <ButtonHolder onPress={item.onPress}>
              <Gradient colors={item.colors}>
                <ImageIcon source={item.image} />
              </Gradient>
            </ButtonHolder>
          )}
        />
        <MenuTitle>Emergency Menu</MenuTitle>
        <EmergencyHolder>
          <Button title="Lost my pet!" />
          <Button title="Call my Clinic!" />
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
