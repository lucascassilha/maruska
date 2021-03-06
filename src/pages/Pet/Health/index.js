import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { Linking, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { isPast, parseISO, isValid, addYears } from 'date-fns';
import { produce } from 'immer';
import Snackbar from 'react-native-snackbar';
import * as Animatable from 'react-native-animatable';

import { deleteDoctor } from '~/store/modules/doctors/actions';
import {
  petDeleteAppointment,
  petDeleteSurgery,
  petDeleteProblem,
} from '~/store/modules/pets/actions';
import { notificationCancel } from '~/store/modules/notifications/actions';
import translate from '~/locales';
import Notification from '~/config/NotificationService';
import PageHeader from '~/components/PageHeader';
import MenuButton from '~/components/MenuButton';
import {
  Container,
  ButtonHolder,
  Title,
  TitleBox,
  List,
  Box,
  LabelTitle,
  TextBox,
  ButtonBox,
  IconHolder,
  LabelSubtitle,
  DateBox,
  DateLabel,
  ButtonBoxSmall,
} from './styles';

export default function Health({ route, navigation }) {
  const { petID } = route.params;

  const theme = !useSelector(state => state.account.darkMode);
  const proAccont = useSelector(state => state.account.pro);

  const doctors = useSelector(state => state.doctors.data);
  const pets = useSelector(state => state.pets.data);
  const [appointments, setAppointments] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [problems, setProblems] = useState([]);
  const [docList, setDocList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const docAuxList = [];
    doctors.map(item => {
      if (item.pets.includes(petID)) {
        docAuxList.push(item);
      }
    });
    if (docAuxList[0]) {
      setDocList(docAuxList);
    }
  }, [doctors]);

  useEffect(() => {
    const petIndex = pets.findIndex(item => item.name === petID);
    if (pets[petIndex].appointments && pets[petIndex].appointments[0]) {
      const list = pets[petIndex].appointments;
      const data = produce(list, draft => {
        draft.map(item => {
          if (isValid(item.date)) {
            item.isPast = isPast(item.date);
          } else {
            const parsed = parseISO(item.date);
            item.isPast = isPast(parsed);
          }
          if (item.isPast) {
            item.date = addYears(new Date(), 100);
          }
        });
        draft.sort(function(a, b) {
          const aValid = isValid(a.date);
          const bValid = isValid(b.date);
          const parsedA = !aValid ? parseISO(a.date) : a.date;
          const parsedB = !bValid ? parseISO(b.date) : b.date;
          return parsedA - parsedB;
        });
      });

      setAppointments(data);
    }
    if (pets[petIndex].surgeries && pets[petIndex].surgeries[0]) {
      setSurgeries(pets[petIndex].surgeries);
    }
    if (pets[petIndex].problems && pets[petIndex].problems[0]) {
      setProblems(pets[petIndex].problems);
    }
  }, [pets]);

  const handleDeleteDoctors = doctor => {
    Alert.alert(translate('areYouSure'), translate('notGetInfoBack'), [
      {
        text: translate('sure'),
        onPress: () => {
          dispatch(deleteDoctor(doctor, petID));
          Snackbar.show({
            text: translate('docDeletedSnack'),
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: translate('thk'),
              textColor: 'green',
            },
          });
          if (docList.length === 1) {
            setDocList([]);
          }
        },
      },
      {
        text: translate('cancelButton'),
      },
    ]);
  };
  const handleDeleteAppointment = async (date, notificationID, calendarID) => {
    Alert.alert(translate('areYouSure'), translate('notGetInfoBack'), [
      {
        text: translate('sure'),
        onPress: async () => {
          await Notification.cancelNotification(notificationID);
          dispatch(notificationCancel(notificationID));
          dispatch(petDeleteAppointment(date, petID));
          Snackbar.show({
            text: translate('appDeletedSnack'),
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: translate('thk'),
              textColor: 'green',
            },
          });
          if (appointments.length === 1) {
            setAppointments([]);
          }
        },
      },
      {
        text: translate('cancelButton'),
      },
    ]);
  };
  const handleDeleteSurgery = surgery => {
    Alert.alert(translate('areYouSure'), translate('notGetInfoBack'), [
      {
        text: translate('sure'),
        onPress: () => {
          dispatch(petDeleteSurgery(surgery, petID));
          Snackbar.show({
            text: translate('surgeryDeletedSnack'),
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: translate('thk'),
              textColor: 'green',
            },
          });
          if (surgeries.length === 1) {
            setSurgeries([]);
          }
        },
      },
      {
        text: translate('cancelButton'),
      },
    ]);
  };
  const handleDeleteProblem = problem => {
    Alert.alert(translate('areYouSure'), translate('notGetInfoBack'), [
      {
        text: translate('sure'),
        onPress: () => {
          dispatch(petDeleteProblem(problem, petID));
          Snackbar.show({
            text: translate('problemDeletedSnack'),
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: translate('thk'),
              textColor: 'green',
            },
          });
          if (problems.length === 1) {
            setProblems([]);
          }
        },
      },
      {
        text: translate('cancelButton'),
      },
    ]);
  };

  const handleWeight = () => {
    if (proAccont) {
      navigation.navigate('Weight', { petID: petID });
    } else {
      Alert.alert(
        translate('proFeatureTitle'),
        translate('proFeatureDescription'),
        [
          { text: 'Ok', onPress: () => navigation.navigate('Pro') },
          { text: translate('cancelButton') },
        ]
      );
    }
  };

  return (
    <>
      <PageHeader
        title={translate('healthTitle')}
        navigation={navigation}
        source={require('~/assets/img/hospital.png')}
      />
      <Container>
        <Animatable.View animation="slideInUp">
          <ButtonHolder>
            <MenuButton
              title={translate('weightTitle')}
              color={theme ? '#56a3a6' : '#37383A'}
              image={require('~/assets/img/weight.png')}
              onPress={handleWeight}
            />
          </ButtonHolder>
          <TitleBox>
            <Title>{translate('healthDoc')}</Title>
            <ButtonBox>
              <IconHolder
                onPress={() => navigation.navigate('DocAdd', { petID })}
              >
                <Icon name="plus" color={theme ? '#000' : '#FFF'} size={18} />
              </IconHolder>
            </ButtonBox>
          </TitleBox>
          <List
            data={docList}
            keyExtractor={item => item.name || item.id}
            renderItem={({ item }) => (
              <Box>
                <TextBox>
                  <LabelTitle>{item.name}</LabelTitle>
                  <LabelSubtitle>{item.clinic}</LabelSubtitle>
                </TextBox>
                <ButtonBox>
                  {item.phone ? (
                    <IconHolder
                      onPress={() => {
                        Linking.openURL(`tel://${item.phone}`);
                      }}
                    >
                      <Icon name="phone" color="#fff" size={18} />
                    </IconHolder>
                  ) : null}
                  <IconHolder
                    onPress={() => {
                      handleDeleteDoctors(item.name);
                    }}
                  >
                    <Icon name="trash-alt" color="#fff" size={18} />
                  </IconHolder>
                </ButtonBox>
              </Box>
            )}
          />
          <TitleBox>
            <Title>{translate('healthApp')}</Title>
            <ButtonBox>
              <IconHolder
                onPress={() => navigation.navigate('AppointAdd', { petID })}
              >
                <Icon name="plus" color={theme ? '#000' : '#FFF'} size={18} />
              </IconHolder>
            </ButtonBox>
          </TitleBox>
          <List
            data={appointments}
            keyExtractor={item => item.date}
            renderItem={({ item }) => (
              <Box isPast={item.isPast}>
                <TextBox>
                  <LabelTitle>{item.clinic}</LabelTitle>
                  {item.doctor ? (
                    <LabelSubtitle>{item.doctor}</LabelSubtitle>
                  ) : null}
                  <DateBox>
                    <DateLabel>{`${item.day} - ${item.time}`}</DateLabel>
                  </DateBox>
                </TextBox>
                <ButtonBox>
                  <IconHolder
                    onPress={() => {
                      Linking.openURL(`tel://${item.phone}`);
                    }}
                  >
                    <Icon name="phone" color="#fff" size={18} />
                  </IconHolder>
                  <IconHolder
                    onPress={() =>
                      handleDeleteAppointment(
                        item.date,
                        item.notificationID,
                        item.calendarID ? item.calendarID : null
                      )
                    }
                  >
                    <Icon name="trash-alt" color="#fff" size={18} />
                  </IconHolder>
                </ButtonBox>
              </Box>
            )}
          />
          <TitleBox>
            <Title>{translate('healthSurg')}</Title>
            <ButtonBox>
              <IconHolder
                onPress={() => navigation.navigate('SurgeryAdd', { petID })}
              >
                <Icon name="plus" color={theme ? '#000' : '#FFF'} size={20} />
              </IconHolder>
            </ButtonBox>
          </TitleBox>
          <List
            data={surgeries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Box>
                <TextBox>
                  <LabelTitle>{item.name || ''}</LabelTitle>
                  {item.clinic ? (
                    <LabelSubtitle>{item.clinic}</LabelSubtitle>
                  ) : null}
                  <DateBox>
                    <DateLabel>{item.day}</DateLabel>
                  </DateBox>
                </TextBox>
                <ButtonBoxSmall>
                  <IconHolder onPress={() => handleDeleteSurgery(item.name)}>
                    <Icon name="trash-alt" color="#fff" size={20} />
                  </IconHolder>
                </ButtonBoxSmall>
              </Box>
            )}
          />
          <TitleBox>
            <Title>{translate('healthProblems')}</Title>
            <ButtonBox>
              <IconHolder
                onPress={() => navigation.navigate('ProblemAdd', { petID })}
              >
                <Icon name="plus" color={theme ? '#000' : '#FFF'} size={20} />
              </IconHolder>
            </ButtonBox>
          </TitleBox>
          <List
            data={problems}
            keyExtractor={item => item.description}
            renderItem={({ item }) => (
              <Box>
                <TextBox>
                  <LabelTitle>{item.title}</LabelTitle>
                  <LabelSubtitle>{`${item.day} - ${item.time}`}</LabelSubtitle>
                  <LabelSubtitle>{item.description}</LabelSubtitle>
                </TextBox>
                <ButtonBoxSmall>
                  <IconHolder onPress={() => handleDeleteProblem(item.title)}>
                    <Icon name="trash-alt" color="#fff" size={20} />
                  </IconHolder>
                </ButtonBoxSmall>
              </Box>
            )}
          />
        </Animatable.View>
      </Container>
    </>
  );
}

Health.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
