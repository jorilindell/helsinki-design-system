import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconVolumePlus = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M15 2.5v19L9.273 17H6a5 5 0 01-.14-9.998L9.273 7 15 2.5zm-2 4.311l-3 2.115v6.147l3 2.115V6.811zM21 8v3h3v2h-3v3h-2v-3h-3v-2h3V8h2zM8 9H6.027L5.915 9a3 3 0 00-.027 5.997L6 15h2V9z"
        fill="currentColor"
      />
    </g>
  </svg>
);
