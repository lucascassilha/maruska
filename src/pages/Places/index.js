import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';

import changeStatus from '~/store/modules/modalVisible/actions';
import Modal from './AddModal/index';

import {
  Container,
  PlaceList,
  Box,
  Name,
  Info,
  ButtonHolder,
  Button,
  TextHolder,
} from './styles';
import Maruska from '~/components/MaruskaLogo/index';

import FAB from '~/components/FAB/index';

export default function Places() {
  const [place, setPlace] = useState([{ id: 1 }, { id: 2 }]);

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(changeStatus(1));
  };

  return (
    <Container>
      <Maruska />
      <FAB onPress={handleOpen} />
      <Modal />
      <PlaceList
        data={place}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box>
            <TextHolder>
              <Name>Cobasi</Name>
              <Info>PetShop</Info>
              <Info>Curitiba - PR</Info>
            </TextHolder>
            <ButtonHolder>
              <Button>
                <Icon name="phone" size={30} color="#fff" />
              </Button>
              <Button>
                <Icon name="car" size={30} color="#fff" />
              </Button>
            </ButtonHolder>
          </Box>
        )}
      />
    </Container>
  );
}
