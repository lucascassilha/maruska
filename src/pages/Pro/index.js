/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InAppBilling from 'react-native-billing';
import Config from 'react-native-config';

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
  const productID = Config.PRODUCT_ID;

  const [price, setPrice] = useState('$0.00');

  const getDetails = async () => {
    try {
      await InAppBilling.close();
      await InAppBilling.open();

      const details = await InAppBilling.getProductDetails(productID);
      setPrice(details.priceText);
    } catch (err) {
      alert(err);
    } finally {
      await InAppBilling.close();
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const purchase = async () => {
    try {
      await InAppBilling.open();
      const details = await InAppBilling.purchase('android.test.purchased');
      alert('You purchased: ' + details);
    } catch (err) {
      alert(err);
    } finally {
      await InAppBilling.close();
    }
  };

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
          <BuyButton onPress={() => purchase()}>
            <ButtonLabel>{price}</ButtonLabel>
            <SmallLabel>{translate('maruskaOneTime')}</SmallLabel>
          </BuyButton>
        )}
      </Holder>
    </Container>
  );
};

export default Pro;
