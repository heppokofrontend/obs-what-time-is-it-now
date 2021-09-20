import React, {useState} from 'react';
import i18n from 'i18next';
import '../locales/i18n';
import {useTranslation} from 'react-i18next';
import Helmet from 'react-helmet';
import styles from './Header.module.scss';

const langName = {
  en: 'English here',
  ja: '日本語はこちら',
} as {
  [x: string]: string,
};

export function Header() {
  const [lang, setLang] = useState(i18n.language);
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Helmet>
        <html lang={lang} />
      </Helmet>

      <h1 className={styles.h1}>{t('現在時刻')}</h1>
      <p>
        <a href="/">@heppokofrontend</a>
        {
          i18n.languages.map(_lang => _lang === lang ? undefined : (
            <button type="button" onClick={async () => {
              await i18n.changeLanguage(_lang);
              setLang(i18n.language);
            }}>{langName[_lang]}</button>
          ))
        }
      </p>
    </header>
  );
}
