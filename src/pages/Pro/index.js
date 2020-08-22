/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { useSelector } from 'react-redux';

import translate from '~/locales';
import {
  Container,
  Holder,
  ProImage,
  Title,
  Label,
  BuyButton,
  ButtonLabel,
  SmallLabel,
} from './styles';

const Pro = () => {
  const theme = !useSelector(state => state.account.darkMode);
  const proAccount = useSelector(state => state.account.pro);

  return (
    <Container>
      <Holder>
        <ProImage
          source={
            theme
              ? require('~/assets/img/pro.png')
              : require('~/assets/img/pro_white.png')
          }
        />
        <Title>{translate('features')}</Title>
        <Label>{`🌙 ${translate('maruskaDarkTheme')}`}</Label>
        <Label>{`🐈 ${translate('maruskaPets')}`}</Label>
        <Label>{`⚖️ ${translate('maruskaWeight')}`}</Label>
        <Label>{`📵 ${translate('maruskaAds')}`}</Label>
        {!proAccount ? null : (
          <BuyButton>
            <ButtonLabel>{translate('maruskaPrice')}</ButtonLabel>
            <SmallLabel>{translate('maruskaOneTime')}</SmallLabel>
          </BuyButton>
        )}
      </Holder>
    </Container>
  );
};

export default Pro;
