import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/img/logo.png';

export default function MaruskaLogo() {
  return (
    <Image
      source={logo}
      style={{ alignSelf: 'center', height: 60, width: 140 }}
    />
  );
}
