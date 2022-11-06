import React, { useState, useEffect } from 'react';
import styles from './Controller.module.scss';
import {useTranslation} from 'react-i18next';
import {Fieldset} from './Fieldset';
import {Label} from './Label';
import {Checkbox} from './Checkbox';

type Props = {
  is24State: {is24:boolean, setIs24:React.Dispatch<boolean>}
  shouldShowSecoundState: {shouldShowSecound:boolean, setShouldShowSecound:React.Dispatch<boolean>}
  children?: React.ReactNode,
};

const styleElement = document.createElement('style');
const saveData: any = (() => {
  try {
    return JSON.parse(localStorage.getItem('obs-time-css') || '{}');
  } catch {
    return {};
  }
})();
const saveDataSave = () => {
  localStorage.setItem('obs-time-css', JSON.stringify(saveData));
};

export function Controller({
  is24State,
  shouldShowSecoundState,
  children
}: Props) {
  const [bgColor, setBgColor] = useState(saveData.bgColor || '#ffffff');
  const [color, setColor] = useState(saveData.color || '#000000');
  const [weight, setWeight] = useState(saveData.weight || 'normal');
  const [fontFamily, setfontFamily] = useState(saveData.fontFamily || 'sans-serif');
  const [isTransparent, setIsTransparent] = useState(saveData.isTransparent ?? true);

  const { t } = useTranslation();
  // console.log(isTransparent, 0);

  const colorChange = (e: React.SyntheticEvent) => {
    const input = e.target as HTMLInputElement;

    saveData.color = input.value;
    saveDataSave();

    return setColor(input.value);
  };
  const weightChange = (e: React.SyntheticEvent) => {
    const input = e.target as HTMLSelectElement;

    saveData.weight = input.value;
    saveDataSave();

    return setWeight(input.value);
  };
  const fontFamilyChange = (e: React.SyntheticEvent) => {
    const input = e.target as HTMLInputElement;

    saveData.fontFamily = input.value;
    saveDataSave();

    return setfontFamily(input.value);
  };
  const transparentChange = (e: React.SyntheticEvent) => {
    const input = e.target as HTMLInputElement;

    saveData.isTransparent = input.checked;
    saveDataSave();

    return setIsTransparent(input.checked);
  };
  const bgColorChange = (e: React.SyntheticEvent) => {
    const input = e.target as HTMLInputElement;

    saveData.bgColor = input.value;
    saveDataSave();

    return setBgColor(input.value);
  };
  const {is24, setIs24} = is24State;
  const {shouldShowSecound, setShouldShowSecound} = shouldShowSecoundState;
  const Css = function () {
    const onFocus = function (e: React.SyntheticEvent) {
      const textarea = e.target as HTMLTextAreaElement;

      textarea.select();
    };

    return (
      <p>
        <textarea aria-label={t('カスタムCSS')} onFocus={onFocus} className={styles.result} value={
        `[data-id="time"] {
  /* ${t('ここに時間の見た目のCSSを追記可能')} */
  color: ${color};
  font-weight: ${weight};
  font-family: ${fontFamily};
}

body {
  overflow: hidden;
  background: ${isTransparent ? 'transparent' : bgColor};
}
header, #controller, footer {
  display: none !important;
}
main {
  align-self: auto;
  width: auto;
}
[data-id="target"] {
  margin: 0;
  border: 0;
  background: transparent;
}
[data-id="target__inner"] {
  padding: 0;
}
#timer .TIMER-WRAP {
  display: none!important;
}${is24 && shouldShowSecound ? `#timer .TIMER-WRAP.Show24.ShowSec {
  display: block!important;
}` : ''}
${!is24 && shouldShowSecound ? `#timer .TIMER-WRAP.No24.ShowSec {
  display: block!important;
}` : ''}
${!is24 && !shouldShowSecound ? `#timer .TIMER-WRAP.No24.NoSec {
  display: block!important;
}` : ''}
${is24 && !shouldShowSecound ? `#timer .TIMER-WRAP.Show24.NoSec {
  display: block!important;
}` : ''}`} readOnly/>
      </p>
    );
  };

  styleElement.textContent = `[data-id="time"] {
    color: ${color};
    font-weight: ${weight};
    font-family: ${fontFamily};
  }

  [data-id="target__inner"] {
    background: ${isTransparent ? 'transparent' : bgColor};
  }

  #time {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  #timer .TIMER-WRAP {
    display: none;
  }

  ${is24 && shouldShowSecound ? `
  #timer .TIMER-WRAP.Show24.ShowSec {
    display: block;
  }
  ` : ''}
  ${!is24 && shouldShowSecound ? `
  #timer .TIMER-WRAP.No24.ShowSec {
    display: block;
  }
  ` : ''}

  ${!is24 && !shouldShowSecound ? `
  #timer .TIMER-WRAP.No24.NoSec {
    display: block;
  }
  ` : ''}

  ${is24 && !shouldShowSecound ? `
  #timer .TIMER-WRAP.Show24.NoSec {
    display: block;
  }` : ''}`;

  useEffect(() => {
    document.head.append(styleElement)
  });

  return (
    <div id="controller" className={styles.wrap}>
      {children}

      <Fieldset legend={t('表示')}>
        <Label name={t('24時間表記')}>
          <Checkbox
            checked={is24}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const input = e.target;

              saveData.is24 = input.checked;
              saveDataSave();

              return setIs24(input.checked);
            }}
          />
        </Label>
        <Label name={t('秒数')}>
          <Checkbox
            checked={shouldShowSecound}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const input = e.target;

              saveData.shouldShowSecound = input.checked;
              saveDataSave();

              return setShouldShowSecound(input.checked);
            }}
          />
        </Label>
      </Fieldset>

      <Fieldset legend={t('前景色')}>
        <Label name={t('文字色')}>
          <input
            type="color"
            value={color}
            onChange={colorChange}
            className={styles.input}
          />
        </Label>

        <Label name={t('文字の太さ')}>
          <select
            onChange={weightChange}
            value={weight}
            className={styles.input}
          >
            <option>normal</option>
            <option>bold</option>
          </select>
        </Label>

        <Label name={t('フォント')}>
          <input
            onChange={fontFamilyChange}
            value={fontFamily}
            className={styles.input}
          />
        </Label>
      </Fieldset>

      <Fieldset legend={t('背景色')}>
        <Label name={t('透過')}>
          <Checkbox
            checked={isTransparent}
            onChange={transparentChange}
          />
        </Label>

        <Label name={t('背景色')} disabled={isTransparent}>
          <input
            type="color"
            value={bgColor}
            onChange={bgColorChange}
            className={styles.input} disabled={isTransparent}
          />
        </Label>
      </Fieldset>

      <Css />
    </div>
  );
}
