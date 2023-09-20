import React, { Children, cloneElement, isValidElement } from 'react';

import { HeaderNavigationMenuContextProvider } from '../headerNavigationMenu/HeaderNavigationMenuContext';
import { useHeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import styles from './HeaderActionBarNavigationMenu.module.scss';
import parentStyles from './HeaderActionBar.module.scss';
import { HeaderNavigationMenuContent } from '../headerNavigationMenu';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';

type HeaderActionBarNavigationMenuProps = {
  /**
   * Logo to use
   */
  logo: React.ReactElement<typeof Logo>;
  /**
   * Logo properties
   */
  logoProps: LinkProps;
};

export const HeaderActionBarNavigationMenu = ({ logo, logoProps }: HeaderActionBarNavigationMenuProps) => {
  const {
    hasNavigationContent,
    isNotLargeScreen,
    mobileMenuOpen,
    hasUniversalContent,
    universalContent,
  } = useHeaderContext();
  const className = classNames(styles.headerNavigationMenu, mobileMenuOpen && styles.mobileMenuOpen);

  if (!hasNavigationContent || !isNotLargeScreen) return null;

  return (
    <div className={className}>
      <nav className={styles.navigation}>
        <ul className={styles.headerNavigationMenuList}>
          <HeaderNavigationMenuContextProvider>
            <HeaderNavigationMenuContent />
          </HeaderNavigationMenuContextProvider>
        </ul>
      </nav>
      {hasUniversalContent && (
        <ul className={styles.universalList}>
          {Children.map(universalContent, (child, index) => {
            if (!isValidElement(child)) return null;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {cloneElement(child, {
                  className: styles.universalLink,
                })}
              </li>
            );
          })}
        </ul>
      )}
      <LinkItem {...logoProps} className={styles.logoLink}>
        {logoProps?.href ? <span className={parentStyles.logoWrapper}>{logo}</span> : logo}
      </LinkItem>
    </div>
  );
};
