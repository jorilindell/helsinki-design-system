import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconClockPlus = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M12 2c5.523 0 10 4.477 10 10 0 .338-.017.672-.05 1.001h-2.012a8 8 0 10-6.937 6.937v2.013c-.33.032-.663.049-1.001.049-5.523 0-10-4.477-10-10S6.477 2 12 2zm7 12v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm-6-8v6.414l-.295.292.002.001-3.535 3.536-1.415-1.415L11 11.584 11 6h2z"
        fill="currentColor"
      />
    </g>
  </svg>
);
