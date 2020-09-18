import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterBase.module.scss';

export type FooterBaseProps = React.PropsWithChildren<{
  /**
   * todo
   */
  copyrightHolder?: string | React.ReactNode;
  /**
   * todo
   */
  copyrightText?: string | React.ReactNode;
}>;

export const FooterBase = ({ children, copyrightHolder, copyrightText }: FooterBaseProps) => {
  const year = new Date().getFullYear();

  return (
    <section className={styles.base}>
      <hr className={styles.divider} />
      <div className={styles.copyright}>
        <span className={styles.copyrightHolder}>
          © {copyrightHolder} {year}
        </span>
        {copyrightText && (
          <>
            <span className={styles.copyrightDot}>•</span>
            <span className={styles.copyrightText}>{copyrightText}</span>
          </>
        )}
      </div>
      {children && <div className={styles.links}>{children}</div>}
    </section>
  );
};
