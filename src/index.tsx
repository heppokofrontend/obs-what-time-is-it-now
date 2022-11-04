import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './locales/i18n';
import {useTranslation} from 'react-i18next';
import {Header} from './component/Header';
import {Footer} from './component/Footer';
import {Time} from './component/Time';
import {Controller} from './component/Controller';
import reportWebVitals from './reportWebVitals';
import './styles/common.scss';

const saveData: any = (() => {
  try {
    return JSON.parse(localStorage.getItem('obs-time-css') || '{}');
  } catch {
    return {};
  }
})();

const Main = () => {
  const { t } = useTranslation();
  const [is24, setIs24] = useState(true);
  const [shouldShowSecound, setShouldShowSecound] = useState(saveData.shouldShowSecound ?? true);

  return (
    <main>
      <div id="timer">
        {
          (is24 && shouldShowSecound) &&
          <div className="TIMER-WRAP Show24 ShowSec">
            <Time
              is24={true}
              shouldShowSecound={true}
            />
          </div>
        }
        {
          (!is24 && !shouldShowSecound) &&
          <div className="TIMER-WRAP No24 NoSec">
            <Time
              is24={false}
              shouldShowSecound={false}
            />
          </div>
        }
        {
          (is24 && !shouldShowSecound) &&
          <div className="TIMER-WRAP Show24 NoSec">
            <Time
              is24={true}
              shouldShowSecound={false}
            />
          </div>
        }
        {
          (!is24 && shouldShowSecound) &&
          <div className="TIMER-WRAP No24 NoSec">
            <Time
              is24={false}
              shouldShowSecound={true}
            />
          </div>
        }
      </div>
      <Controller
        is24State={{is24, setIs24}}
        shouldShowSecoundState={{shouldShowSecound, setShouldShowSecound}}
      >
        <h2>{t('OBS用カスタムCSSジェネレータ')}</h2>
        <p>{t('次の手順でご利用ください。')}</p>
        <ol>
          <li>{t('OBSでブラウザソースを追加（新規作成）')}</li>
          <li>{t('URL：このページのURLを設定')}</li>
          <li>{t('幅：500～780程度')}</li>
          <li>{t('高さ：150程度')}</li>
          <li>{t('カスタムCSS：ページ下部のものを設定')}</li>
        </ol>
      </Controller>
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Header />

    <Main />

    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
