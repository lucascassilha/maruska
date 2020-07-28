import React, { useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import changeStatus from '~/store/modules/modalVisible/actions';
import { deletePet } from '~/store/modules/pets/actions';
import translate from '~/locales';
import MenuButton from '~/components/MenuButton';
import PageHeader from '~/components/PageHeader';
import EditModal from './EditModal';

import {
  Container,
  Box,
  Title,
  InfoHolder,
  InfoTextHolder,
  TextColumn,
  Label,
  Info,
  Picture,
  AnimationHolder,
} from './styles';

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
          <MenuButton
            color="#084C61"
            image={require('~/assets/img/vaccine.png')}
            title="Vaccines"
            onPress={() => {
              navigation.navigate('Vaccines', { petID: pet.name });
            }}
          />
          <MenuButton
            color="#4F6D7A"
            image={require('~/assets/img/pills.png')}
            title="Medications"
            onPress={() => {
              navigation.navigate('Medications', { petID: pet.name });
            }}
          />
          <MenuButton
            color="#56A3A6"
            image={require('~/assets/img/hospital.png')}
            title="Medical Center"
            onPress={() => {
              navigation.navigate('Health', { petID: pet.name });
            }}
          />
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
        <Box>
          <Title>{translate('picture')}</Title>
          <TouchableOpacity
            onPress={() => navigation.navigate('Avatar', { petID: pet.name })}
          >
            {pet.image ? (
              <Picture source={require('~/assets/img/icon.png')} />
            ) : (
              <AnimationHolder>
                <LottieView
                  source={require('~/assets/animations/camera.json')}
                  autoPlay
                  loop
                />
              </AnimationHolder>
            )}
          </TouchableOpacity>
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
