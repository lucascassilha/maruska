import React from 'react';
import { StatusBar } from 'react-native';

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
} from './styles';

export default function Profile() {
  return (
    <Container>
      <StatusBar backgroundColor="#eb3349" barStyle="light-content" />
      <PetInfo>
        <Header>
          <Avatar />
        </Header>
        <InfoHolder>
          <TextLine>
            <InfoTextHolder>
              <Label>Weight</Label>
              <Info>1.5kg</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>Kind</Label>
              <Info>Dog</Info>
            </InfoTextHolder>
          </TextLine>
          <TextLine>
            <InfoTextHolder>
              <Label>Last vaccine</Label>
              <Info>13/05/2019</Info>
            </InfoTextHolder>
            <InfoTextHolder>
              <Label>Sex</Label>
              <Info>Female</Info>
            </InfoTextHolder>
          </TextLine>
        </InfoHolder>
      </PetInfo>
      <PetMenu>
        <MenuTitle>Pet Menu</MenuTitle>
        <MenuHolder />
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
