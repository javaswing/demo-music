import React from 'react';
// import cls from 'classnames';
import styles from './style.module.scss';

export default function Detail() {
  return (
    <div className={styles.content}>
      <div className={styles.mask}>
        <div className={styles.covermask}></div>
      </div>
    </div>
  );
}