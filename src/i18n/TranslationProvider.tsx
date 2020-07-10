import React from 'react';
import { IntlProvider } from 'react-intl';
import { Translations } from './translations';
import { isPlatform } from '@ionic/react';
import { Globalization } from '@ionic-native/globalization';

export const getLocale = async () => {
  if (isPlatform('cordova') || isPlatform('capacitor')) {
    await Globalization.getPreferredLanguage()
      .then((res) => res.value.split(/[-_]/)[0])
      .catch(() => 'en');
  }
  return navigator.language.split(/[-_]/)[0];
};

interface ITranslationProviderProps {
  locale: string;
  children?: React.ReactNode;
}

const TranslationProvider: React.FC<ITranslationProviderProps> = (props) => {
  return (
    <IntlProvider locale={props.locale} messages={props.locale === 'de' ? Translations.de : Translations.en}>
      {props.children}
    </IntlProvider>
  );
};

export default TranslationProvider;
