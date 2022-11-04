import React, { useState, useEffect } from 'react';
import styles from './Time.module.scss';

type Props = {
  is24: boolean,
  shouldShowSecound:boolean,
}

export function Time({
  is24,
  shouldShowSecound,
}: Props) {
  const [text, setText] = useState('00:00:00');
  const getTimeText = ({is24, shouldShowSecound}: { [key: string]: boolean; }) => {
    const date = new Date();

    return date.toLocaleTimeString('en', {
      hour12: !is24,
      hour: '2-digit',
      minute: '2-digit',
      second: shouldShowSecound ? '2-digit' : undefined,
    })
  };

  useEffect(() => {
    const set = () => setText(getTimeText({is24, shouldShowSecound}));
    const key = setInterval(set, 1000);

    set();

    return () => clearInterval(key);
  }, [is24, shouldShowSecound]);

  return (
    <div className={styles.wrap} data-id="target">
      <div className={styles.inner} data-id="target__inner">
        <p data-id="time" aria-live="polite" className={styles.time}>{text}</p>
      </div>
    </div>
  );
};
