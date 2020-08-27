/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InAppBilling from 'react-native-billing';
import Config from 'react-native-config';
import { proPlan, darkMode } from '~/store/modules/account/actions';

import translate from '~/locales';
import {
  Container,
  Holder,
  Scroll,
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

  const dispatch = useDispatch();

  const getDetails = async () => {
    try {
      await InAppBilling.close();
      await InAppBilling.open();

      const purchased = InAppBilling.isPurchased(productID);
      if (purchased) {
        if (!proAccount) {
          dispatch(proPlan());
        }
      } else {
        const details = await InAppBilling.getProductDetails(productID);
        setPrice(details.priceText);
      }

      console.log(`PRO USER: ${purchased}`);
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
      console.log('You purchased: ', details);
      if (details.purchaseState === 'PurchasedSuccessfully') {
        dispatch(proPlan());
      }
    } catch (err) {
      console.log(err);
    } finally {
      await InAppBilling.close();
    }
  };

  return (
    <Container>
      <Holder>
        <Scroll showsVerticalScrollIndicator={false}>
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
          {proAccount ? (
            <BuyButton>
              <SmallLabel>{translate('alreadyPRO')}</SmallLabel>
            </BuyButton>
          ) : (
            <BuyButton onPress={() => purchase()}>
              <ButtonLabel>{price}</ButtonLabel>
              <SmallLabel>{translate('maruskaOneTime')}</SmallLabel>
            </BuyButton>
          )}
        </Scroll>
      </Holder>
    </Container>
  );
};

export default Pro;
