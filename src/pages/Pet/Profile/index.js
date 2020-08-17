import React, { useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Snackbar from 'react-native-snackbar';

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

  const theme = !useSelector(state => state.account.darkMode);
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
    Alert.alert(
      translate('deletePetTitle'),
      translate('deletePetDescription'),
      [
        {
          text: translate('sure'),
          onPress: () => {
            dispatch(deletePet(pet.name));
            navigation.navigate('Home');
            Snackbar.show({
              text: translate('deletePetSnack'),
              duration: Snackbar.LENGTH_LONG,
              action: {
                text: translate('thk'),
                textColor: 'green',
              },
            });
          },
        },
        { text: translate('cancelButton') },
      ]
    );
  };

  return (
    <>
      <PageHeader
        title={pet.name}
        source={pet.avatar ? pet.avatar : undefined}
        icons
        navigation={navigation}
        onDelete={handleDeletePet}
        onEdit={handleOpen}
      />
      <EditModal petInformation={pet} />
      <Container>
        <Animatable.View animation="slideInUp">
          <Box>
            <Title>{translate('petMenu')}</Title>
            <MenuButton
              color={theme ? '#084C61' : '#37383A'}
              image={require('~/assets/img/vaccine.png')}
              title={translate('vaccines')}
              onPress={() => {
                navigation.navigate('Vaccines', { petID: pet.name });
              }}
            />
            <MenuButton
              color={theme ? '#4F6D7A' : '#37383A'}
              image={require('~/assets/img/pills.png')}
              title={translate('medTitle')}
              onPress={() => {
                navigation.navigate('Medications', { petID: pet.name });
              }}
            />
            <MenuButton
              color={theme ? '#56A3A6' : '#37383A'}
              image={require('~/assets/img/hospital.png')}
              title={translate('healthTitle')}
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
              {pet.avatar ? (
                <Picture
                  source={{ uri: `data:image/*;base64,${pet.avatar}` }}
                />
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
          <Box>
            <Title>{translate('helpMenu')}</Title>
            <MenuButton
              color="#eb3349"
              image={require('~/assets/img/lostpet.png')}
              title={translate('emerLabel')}
              onPress={() => {
                navigation.navigate('LostPet', { pet });
              }}
            />
          </Box>
        </Animatable.View>
      </Container>
    </>
  );
}

Profile.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
